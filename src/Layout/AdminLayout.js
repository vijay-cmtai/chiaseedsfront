import React from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom"; // Import Link
import { useDispatch } from "react-redux";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  makeStyles,
  CssBaseline,
  Divider,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home"; // Import Home icon
import { logout, reset } from "../features/auth/authSlice";

// --- Theme Colors ---
const colors = {
  primary: "#878fba",
  primaryHover: "#6c749d",
  sidebarBg: "#9788b9",
  sidebarText: "rgba(255, 255, 255, 0.75)",
  sidebarTextActive: "#ffffff",
  sidebarActiveBg: "rgba(0, 0, 0, 0.2)",
  contentBg: "#f4f6f8",
};

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontFamily: "'Poppins', sans-serif",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: colors.sidebarBg,
    borderRight: "none",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
    backgroundColor: colors.contentBg,
    minHeight: "100vh",
  },
  sidebarHeader: {
    padding: theme.spacing(3),
    textAlign: "center",
    borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
  },
  sidebarHeaderText: {
    fontSize: "22px",
    fontWeight: "700",
    color: colors.sidebarTextActive,
    letterSpacing: "1px",
  },
  navList: {
    flexGrow: 1,
    padding: theme.spacing(1, 0),
  },
  listItem: {
    padding: theme.spacing(1.2, 3),
    color: colors.sidebarText,
    transition: "all 0.2s ease-in-out",
    "& .MuiListItemIcon-root": {
      color: "inherit",
      minWidth: "45px",
    },
    "&:hover": {
      backgroundColor: colors.sidebarActiveBg,
      color: colors.sidebarTextActive,
    },
  },
  activeLink: {
    backgroundColor: colors.primary,
    color: colors.sidebarTextActive,
    fontWeight: 500,
    "&:hover": {
      backgroundColor: colors.primaryHover,
    },
  },
  sidebarFooter: {
    padding: theme.spacing(1, 0),
    borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
  },
}));

const AdminLayout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const adminNavItems = [
    { text: "Dashboard", to: "/admin/dashboard", icon: <DashboardIcon /> },
    { text: "Products", to: "/admin/products", icon: <ShoppingCartIcon /> },
    { text: "Orders", to: "/admin/orders", icon: <ListAltIcon /> },
    { text: "Users", to: "/admin/users", icon: <PeopleIcon /> },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.sidebarHeader}>
          <Typography variant="h5" className={classes.sidebarHeaderText}>
            ADMIN PANEL
          </Typography>
        </div>
        <List className={classes.navList}>
          {adminNavItems.map((item) => (
            <ListItem
              button
              component={NavLink}
              to={item.to}
              key={item.text}
              className={({ isActive }) =>
                isActive
                  ? `${classes.listItem} ${classes.activeLink}`
                  : classes.listItem
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <div className={classes.sidebarFooter}>
          {/* === "BACK TO HOME" BUTTON ADDED HERE === */}
          <ListItem button component={Link} to="/" className={classes.listItem}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Back to Home" />
          </ListItem>
          <Divider style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
          <ListItem button onClick={handleLogout} className={classes.listItem}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
