// src/pages/admin/ManageUsersPage.js (Final Corrected Code)

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../../features/admin/adminSlice";

// --- Material-UI Imports ---
import {
  makeStyles,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Card,
  Box,
  TextField,
  InputAdornment,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import BlockIcon from "@material-ui/icons/Block"; // Delete ke liye
import SearchIcon from "@material-ui/icons/Search";

// --- Theme colors and Styles ---
const colors = {
  primary: "#878fba",
  textDark: "#3d2b56",
  textMuted: "#6c749d",
  borderColor: "#e9ecef",
  lightBg: "#f8f9fa",
  cardBg: "#ffffff",
  green: "#28a745",
  lightGreen: "#e7f5ee",
  red: "#dc3545",
  lightRed: "#fdeeee",
  lightGray: "#e9ecef",
};

const useStyles = makeStyles((theme) => ({
  pageContainer: { padding: theme.spacing(3) },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  pageTitle: { fontWeight: "bold", color: colors.textDark },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    padding: "6px 16px",
    textTransform: "none",
    "&:hover": { backgroundColor: "#6c749d" },
  },
  contentCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    "& .MuiCardContent-root:last-child": { paddingBottom: 0 },
  },
  toolbar: {
    padding: theme.spacing(2, 3),
    borderBottom: `1px solid ${colors.borderColor}`,
  },
  tableHead: {
    backgroundColor: colors.lightBg,
    "& .MuiTableCell-head": {
      fontWeight: "bold",
      color: colors.textDark,
      borderBottom: "none",
    },
  },
  tableRow: {
    "& .MuiTableCell-root": { borderBottom: `1px solid ${colors.borderColor}` },
    "&:last-child .MuiTableCell-root": { borderBottom: "none" },
    "&:hover": { backgroundColor: "#f5f5f5" },
  },
  userCell: { display: "flex", alignItems: "center" },
  avatar: { marginRight: theme.spacing(2) },
  userName: { fontWeight: 500, color: colors.textDark },
  userEmail: { color: colors.textMuted, fontSize: "0.8rem" },
  chip: { borderRadius: "16px", fontWeight: "bold", height: "26px" },
  roleAdmin: { backgroundColor: colors.primary, color: "white" },
  roleUser: { backgroundColor: colors.lightGray, color: colors.textMuted },
  statusActive: { backgroundColor: colors.lightGreen, color: colors.green }, // 'isVerified' true ke liye
  statusNotVerified: { backgroundColor: colors.lightRed, color: colors.red }, // 'isVerified' false ke liye
}));

const ManageUsersPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { users = [], status } = useSelector((state) => state.admin || {});
  // Debug: log users from Redux
  console.log("ManageUsersPage users:", users);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Use useMemo to filter users instead of useEffect + state
  const filteredUsers = React.useMemo(
    () =>
      users.filter(
        (user) =>
          user.name &&
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, users]
  );

  const handleOpenEditDialog = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingUser(null);
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;
    const resultAction = await dispatch(
      updateUser({ ...formData, _id: editingUser._id })
    );
    if (updateUser.fulfilled.match(resultAction)) {
      handleCloseDialog();
    }
  };

  const handleDeleteUser = (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div className={classes.pageContainer}>
      <Box className={classes.headerContainer}>
        <Typography variant="h4" className={classes.pageTitle}>
          Manage Users
        </Typography>
        {/* Add User button hata diya gaya hai */}
      </Box>
      <Card className={classes.contentCard}>
        <Box className={classes.toolbar}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Search users by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {status === "loading" && users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user._id} className={classes.tableRow}>
                    <TableCell>
                      <Box className={classes.userCell}>
                        <Avatar src={user.avatar} className={classes.avatar}>
                          {user.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="body1"
                            className={classes.userName}
                          >
                            {user.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            className={classes.userEmail}
                          >
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        className={`${classes.chip} ${user.role === "admin" ? classes.roleAdmin : classes.roleUser}`}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.isVerified ? "Verified" : "Not Verified"}
                        className={`${classes.chip} ${user.isVerified ? classes.statusActive : classes.statusNotVerified}`}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenEditDialog(user)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        style={{ color: colors.red }}
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <BlockIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography>No users found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Edit User Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Full Name"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={editingUser?.email || ""}
                disabled
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveUser}
            className={classes.buttonPrimary}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageUsersPage;
