// src/pages/user/ProfilePage.js (Fixed Text Alignment)

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
import {
  getMyProfile,
  updateMyProfile,
  updateUserAvatar,
} from "../../features/user/userSlice";

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
    minHeight: "100vh",
  },
  pageTitle: {
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(4),
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
    },
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
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      textAlign: "left",
    },
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
    width: "100%",
    maxWidth: "200px",
    "&:hover": {
      backgroundColor: colors.primaryHover,
    },
    "&:disabled": {
      backgroundColor: colors.textMuted,
      color: "#fff",
    },
  },
  inputField: {
    "& .MuiInputLabel-root": {
      color: colors.textMuted,
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.4375,
      letterSpacing: "0.00938em",
      backgroundColor: colors.cardBg,
      padding: "0 4px",
      zIndex: 1,
    },
    "& label.Mui-focused": {
      color: colors.primary,
      backgroundColor: colors.cardBg,
    },
    "& .MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-input": {
        color: colors.textDark,
        fontSize: "1rem",
        padding: "16.5px 14px",
        textAlign: "left",
        fontFamily: "'Roboto', sans-serif",
        lineHeight: 1.4375,
        letterSpacing: "0.00938em",
      },
      "& fieldset": {
        borderColor: colors.borderColor,
        borderWidth: "1px",
      },
      "&:hover fieldset": {
        borderColor: colors.primary,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.primary,
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-outlined": {
      transform: "translate(14px, 17px) scale(1)",
      transformOrigin: "top left",
      backgroundColor: "transparent",
      "&.MuiInputLabel-shrink": {
        transform: "translate(14px, -9px) scale(0.75)",
        transformOrigin: "top left",
        backgroundColor: colors.cardBg,
        padding: "0 4px",
      },
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -9px) scale(0.75) !important",
      backgroundColor: colors.cardBg,
      padding: "0 4px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      "& legend": {
        maxWidth: "0px !important",
        opacity: 0,
        width: "0px",
        "& span": {
          paddingLeft: "0px",
          paddingRight: "0px",
          display: "none",
        },
      },
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(3),
  },
  formContainer: {
    width: "100%",
  },
  gridContainer: {
    width: "100%",
    margin: 0,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
  },
  errorContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
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
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
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

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size should be less than 5MB.");
      return;
    }

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

    if (!formData.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    dispatch(updateMyProfile({ name: formData.name.trim() }))
      .unwrap()
      .then(() => toast.success("Profile saved successfully!"))
      .catch((err) =>
        toast.error(`Save Failed: ${err || "Please try again."}`)
      );
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    toast.info("Password update functionality is not yet implemented.");
  };

  // Improved loading/error check
  if (!userState || (status === "loading" && !profile)) {
    return (
      <Box className={classes.loadingContainer}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Box className={classes.errorContainer}>
        <Typography color="error" variant="h6">
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
      <Grid container spacing={4} className={classes.gridContainer}>
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
              <form
                onSubmit={handleProfileSave}
                className={classes.formContainer}
              >
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
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Box className={classes.buttonContainer}>
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
              <form
                onSubmit={handlePasswordUpdate}
                className={classes.formContainer}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      name="currentPassword"
                      type="password"
                      variant="outlined"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className={classes.inputField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="New Password"
                      name="newPassword"
                      type="password"
                      variant="outlined"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className={classes.inputField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      name="confirmPassword"
                      type="password"
                      variant="outlined"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className={classes.inputField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Box className={classes.buttonContainer}>
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
