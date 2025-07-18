// src/pages/admin/ManageUsersPage.js (Corrected and Final Version)

import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, updateUser, deleteUser } from "../../features/admin/adminSlice";

// --- Material-UI Imports ---
// (Saare Material-UI imports waise hi rahenge)
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
  useMediaQuery,
  useTheme,
  CardContent,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import BlockIcon from "@material-ui/icons/Block";
import SearchIcon from "@material-ui/icons/Search";


// --- Theme colors and Styles ---
// (Styles poore waise hi rahenge, koi badlav nahi)
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
  // ... (Aapka poora useStyles object yahan aa jayega, usmein koi badlav nahi hai)
  pageContainer: { 
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 1),
    },
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: theme.spacing(2),
    },
  },
  pageTitle: { 
    fontWeight: "bold", 
    color: colors.textDark,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    padding: "6px 16px",
    textTransform: "none",
    "&:hover": { backgroundColor: "#6c749d" },
    [theme.breakpoints.down('sm')]: {
      padding: "8px 12px",
      fontSize: '0.85rem',
    },
  },
  contentCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    "& .MuiCardContent-root:last-child": { paddingBottom: 0 },
    [theme.breakpoints.down('sm')]: {
      borderRadius: "8px",
      margin: theme.spacing(0, 0.5),
    },
  },
  toolbar: {
    padding: theme.spacing(2, 3),
    borderBottom: `1px solid ${colors.borderColor}`,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5, 2),
    },
  },
  tableHead: {
    backgroundColor: colors.lightBg,
    "& .MuiTableCell-head": {
      fontWeight: "bold",
      color: colors.textDark,
      borderBottom: "none",
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.75rem',
        padding: theme.spacing(1),
      },
    },
  },
  tableRow: {
    "& .MuiTableCell-root": { 
      borderBottom: `1px solid ${colors.borderColor}`,
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
      },
    },
    "&:last-child .MuiTableCell-root": { borderBottom: "none" },
    "&:hover": { backgroundColor: "#f5f5f5" },
  },
  userCell: { 
    display: "flex", 
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: theme.spacing(0.5),
    },
  },
  avatar: { 
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
  userName: { 
    fontWeight: 500, 
    color: colors.textDark,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.85rem',
    },
  },
  userEmail: { 
    color: colors.textMuted, 
    fontSize: "0.8rem",
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
    },
  },
  chip: { 
    borderRadius: "16px", 
    fontWeight: "bold", 
    height: "26px",
    [theme.breakpoints.down('sm')]: {
      height: "22px",
      fontSize: '0.7rem',
    },
  },
  roleAdmin: { backgroundColor: colors.primary, color: "white" },
  roleUser: { backgroundColor: colors.lightGray, color: colors.textMuted },
  statusActive: { backgroundColor: colors.lightGreen, color: colors.green }, // 'isVerified' true ke liye
  statusNotVerified: { backgroundColor: colors.lightRed, color: colors.red }, // 'isVerified' false ke liye
  
  // Mobile Card View
  mobileUserCard: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: colors.cardBg,
  },
  mobileUserHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  mobileUserInfo: {
    flex: 1,
    marginLeft: theme.spacing(1),
  },
  mobileUserActions: {
    display: "flex",
    gap: theme.spacing(1),
  },
  mobileUserMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  mobileChips: {
    display: "flex",
    gap: theme.spacing(1),
    flexWrap: "wrap",
  },
  
  // Hidden classes for responsive design
  hideOnMobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  showOnMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  
  // Dialog responsive styles
  dialogPaper: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2),
      maxHeight: 'calc(100vh - 32px)',
    },
  },
}));


const ManageUsersPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { users = [], status } = useSelector((state) => state.admin || {});
  console.log("ManageUsersPage users from Redux:", users); // Debugging

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  // <-- BADLAV YAHAN
  const [formData, setFormData] = useState({ fullName: "" }); 
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    // Sirf users na hone par hi fetch karein, taaki baar baar na ho
    if (users.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch, users.length]);

  // <-- BADLAV YAHAN: user.name ko user.fullName kiya gaya
  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.fullName && // Check for fullName
          user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, users]
  );

  const handleOpenEditDialog = (user) => {
    setEditingUser(user);
    // <-- BADLAV YAHAN
    setFormData({ fullName: user.fullName });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingUser(null);
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;
    // <-- BADLAV YAHAN: Ab humara formData { fullName: "..." } bhejega
    const resultAction = await dispatch(
      updateUser({ ...formData, _id: editingUser._id })
    );
    if (updateUser.fulfilled.match(resultAction)) {
      handleCloseDialog();
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  // Mobile Card Component
  const MobileUserCard = ({ user }) => (
    <Card className={classes.mobileUserCard}>
      <div className={classes.mobileUserHeader}>
        {/* <-- BADLAV YAHAN */}
        <Avatar src={user.avatar} className={classes.avatar}>
          {user.fullName ? user.fullName.charAt(0) : 'U'}
        </Avatar>
        <div className={classes.mobileUserInfo}>
          {/* <-- BADLAV YAHAN */}
          <Typography variant="body1" className={classes.userName}>
            {user.fullName}
          </Typography>
          <Typography variant="body2" className={classes.userEmail}>
            {user.email}
          </Typography>
        </div>
        <div className={classes.mobileUserActions}>
          <IconButton size="small" onClick={() => handleOpenEditDialog(user)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" style={{ color: colors.red }} onClick={() => handleDeleteUser(user._id)}>
            <BlockIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <div className={classes.mobileUserMeta}>
        <div className={classes.mobileChips}>
          <Chip label={user.role} className={`${classes.chip} ${user.role === "admin" ? classes.roleAdmin : classes.roleUser}`} />
          <Chip label={user.isVerified ? "Verified" : "Not Verified"} className={`${classes.chip} ${user.isVerified ? classes.statusActive : classes.statusNotVerified}`} />
        </div>
      </div>
    </Card>
  );

  return (
    <div className={classes.pageContainer}>
      <Box className={classes.headerContainer}>
        <Typography variant="h4" className={classes.pageTitle}>Manage Users</Typography>
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
              startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
              disableUnderline: true,
            }}
          />
        </Box>
        
        {/* Desktop Table View */}
        <div className={classes.hideOnMobile}>
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
                {status === "loading" && filteredUsers.length === 0 ? (
                  <TableRow><TableCell colSpan={4} align="center"><CircularProgress /></TableCell></TableRow>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user._id} className={classes.tableRow}>
                      <TableCell>
                        <Box className={classes.userCell}>
                          {/* <-- BADLAV YAHAN */}
                          <Avatar src={user.avatar} className={classes.avatar}>
                            {user.fullName ? user.fullName.charAt(0) : 'U'}
                          </Avatar>
                          <Box>
                            {/* <-- BADLAV YAHAN */}
                            <Typography variant="body1" className={classes.userName}>
                              {user.fullName}
                            </Typography>
                            <Typography variant="body2" className={classes.userEmail}>
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={user.role} className={`${classes.chip} ${user.role === "admin" ? classes.roleAdmin : classes.roleUser}`} />
                      </TableCell>
                      <TableCell>
                        <Chip label={user.isVerified ? "Verified" : "Not Verified"} className={`${classes.chip} ${user.isVerified ? classes.statusActive : classes.statusNotVerified}`} />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" onClick={() => handleOpenEditDialog(user)}><EditIcon fontSize="small" /></IconButton>
                        <IconButton size="small" style={{ color: colors.red }} onClick={() => handleDeleteUser(user._id)}><BlockIcon fontSize="small" /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={4} align="center"><Typography>No users found.</Typography></TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        
        {/* Mobile Card View */}
        <div className={classes.showOnMobile}>
          <CardContent>
            {status === "loading" && filteredUsers.length === 0 ? (
              <Box display="flex" justifyContent="center" p={3}><CircularProgress /></Box>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (<MobileUserCard key={user._id} user={user} />))
            ) : (
              <Box textAlign="center" p={3}><Typography>No users found.</Typography></Box>
            )}
          </CardContent>
        </div>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="xs" classes={{ paper: classes.dialogPaper }} fullScreen={isMobile}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* <-- BADLAV YAHAN */}
              <TextField
                autoFocus
                margin="dense"
                label="Full Name"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.fullName} // <-- Yahan bhi
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} // <-- Yahan bhi
              />
            </Grid>
            <Grid item xs={12}>
              <TextField margin="dense" label="Email Address" type="email" fullWidth variant="outlined" value={editingUser?.email || ""} disabled />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleSaveUser} className={classes.buttonPrimary} disabled={status === "loading"}>
            {status === "loading" ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageUsersPage;
