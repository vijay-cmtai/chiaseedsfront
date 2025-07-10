// src/pages/user/ProfilePage.js (Corrected)

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Box,
  Avatar,
  Badge,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { toast } from "react-toastify";
// ======================================================================
// === THIS IS THE FIX: Correct the path from 'users' to 'user' ===
import {
  getMyProfile,
  updateMyProfile,
  updateUserAvatar,
} from "../../features/user/userSlice";
// ======================================================================

const colors = {
  primary: "#a96e4f",
  primaryHover: "#8e5a3e",
  textDark: "#2c3e50",
  textMuted: "#8a8a8a",
  background: "#f9f7f3",
  cardBg: "#ffffff",
  borderColor: "#d1d1d1",
};

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: theme.spacing(3),
    backgroundColor: colors.background,
    minHeight: "100%",
  },
  pageTitle: {
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(4),
  },
  profileCard: {
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.07)",
    backgroundColor: colors.cardBg,
    padding: theme.spacing(3),
    height: "100%",
  },
  sectionTitle: {
    fontWeight: 600,
    color: colors.textDark,
    marginBottom: theme.spacing(3),
    paddingBottom: theme.spacing(1.5),
    borderBottom: `1px solid ${colors.borderColor}`,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  largeAvatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    border: `3px solid ${colors.borderColor}`,
  },
  editBadge: {
    backgroundColor: colors.primary,
    color: "white",
    width: 32,
    height: 32,
    border: `2px solid ${colors.cardBg}`,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: theme.spacing(1.5, 4),
    marginTop: theme.spacing(3),
    "&:hover": {
      backgroundColor: colors.primaryHover,
    },
  },
  inputField: {
    "& .MuiInputLabel-root": { color: colors.textMuted },
    "& label.Mui-focused": { color: colors.primary },
    "& .MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-input": { color: colors.textDark },
      "& fieldset": { borderColor: colors.borderColor },
      "&:hover fieldset": { borderColor: colors.primary },
      "&.Mui-focused fieldset": { borderColor: colors.primary },
    },
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // A safer way to select state to prevent crashes
  const userState = useSelector((state) => state.user);

  // Destructure only after confirming userState exists
  const { profile, status } = userState || {};

  const [formData, setFormData] = useState({ name: "" });
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  useEffect(() => {
    // Only fetch if profile is not present and we're not already loading
    if (!profile && status !== "loading") {
      dispatch(getMyProfile());
    }
  }, [profile, status, dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({ name: profile.name || "" });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedAvatar(file);
    const avatarFormData = new FormData();
    avatarFormData.append("avatar", file);

    dispatch(updateUserAvatar(avatarFormData))
      .unwrap()
      .then(() => toast.success("Avatar updated successfully!"))
      .catch((err) =>
        toast.error(`Avatar Update Failed: ${err || "Please try again."}`)
      );
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    dispatch(updateMyProfile({ name: formData.name }))
      .unwrap()
      .then(() => toast.success("Profile saved successfully!"))
      .catch((err) =>
        toast.error(`Save Failed: ${err || "Please try again."}`)
      );
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    toast.info("Password update functionality is not yet implemented.");
  };

  // Improved loading/error check
  if (!userState || (status === "loading" && !profile)) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography color="error">
          Failed to load profile. Please try again.
        </Typography>
      </Box>
    );
  }

  return (
    <div className={classes.pageContainer}>
      <Typography variant="h4" className={classes.pageTitle}>
        My Profile
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Card className={classes.profileCard}>
            <CardContent>
              <Box className={classes.avatarContainer}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="icon-button-file"
                  type="file"
                  onChange={handleAvatarChange}
                />
                <label htmlFor="icon-button-file">
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <IconButton
                        component="span"
                        className={classes.editBadge}
                      >
                        <PhotoCamera fontSize="small" />
                      </IconButton>
                    }
                  >
                    <Avatar
                      src={
                        selectedAvatar
                          ? URL.createObjectURL(selectedAvatar)
                          : profile?.avatar
                      }
                      className={classes.largeAvatar}
                    />
                  </Badge>
                </label>
              </Box>

              <Typography variant="h6" className={classes.sectionTitle}>
                Personal Information
              </Typography>
              <form onSubmit={handleProfileSave}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      variant="outlined"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={classes.inputField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      value={profile?.email || ""}
                      disabled
                      className={classes.inputField}
                    />
                  </Grid>
                </Grid>
                <Box textAlign="center" mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.buttonPrimary}
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Saving..." : "SAVE PROFILE"}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card className={classes.profileCard}>
            <CardContent>
              <Typography variant="h6" className={classes.sectionTitle}>
                Change Password
              </Typography>
              <form onSubmit={handlePasswordUpdate}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      type="password"
                      variant="outlined"
                      className={classes.inputField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="New Password"
                      type="password"
                      variant="outlined"
                      className={classes.inputField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      type="password"
                      variant="outlined"
                      className={classes.inputField}
                    />
                  </Grid>
                </Grid>
                <Box textAlign="center" mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.buttonPrimary}
                  >
                    UPDATE PASSWORD
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
