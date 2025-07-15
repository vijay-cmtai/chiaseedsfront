// src/Layout/AdminLayout.js (REFINED & WELL-COMMENTED)

import React, { useState } from "react"; // useState is better than React.useState
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
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
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";

import { logout, reset } from "../features/auth/authSlice";

// --- Styles ---
const colors = {
  primary: "#878fba",
  primaryHover: "#6c749d",
  sidebarBg: "#9788b9",
  sidebarText: "rgba(255, 255, 255, 0.85)", // Slightly more visible text
  sidebarTextActive: "#ffffff",
  sidebarActiveBg: "rgba(0, 0, 0, 0.2)",
  contentBg: "#f4f6f8",
};

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: colors.contentBg,
  },
  // NOTE: AppBar for mobile view only
  appBar: {
    [theme.breakpoints.up("md")]: {
      // 'md' is the breakpoint for medium screens (desktops)
      display: "none",
    },
    backgroundColor: colors.sidebarBg,
    boxShadow: "0 2px 4px -1px rgba(0,0,0,.2)", // A subtle shadow
  },
  // NOTE: This class is for the navigation sidebar itself
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // NOTE: Styles for the paper inside the Drawer component
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: colors.sidebarBg,
    borderRight: "none",
    color: colors.sidebarText,
  },
  // NOTE: Main content area where the <Outlet /> renders pages
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    // Add top padding to account for the mobile app bar's height
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      paddingTop: `calc(56px + ${theme.spacing(2)}px)`, // 56px is typical mobile Toolbar height
    },
  },
  sidebarHeader: {
    padding: theme.spacing(2, 2),
    textAlign: "center",
    borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
  },
  sidebarHeaderText: {
    fontWeight: 700,
    color: colors.sidebarTextActive,
    letterSpacing: "1px",
  },
  navList: {
    padding: theme.spacing(1, 2), // Add horizontal padding
  },
  listItem: {
    borderRadius: "8px",
    marginBottom: theme.spacing(1),
    color: colors.sidebarText,
    "& .MuiListItemIcon-root": {
      color: "inherit",
      minWidth: 40,
    },
    "&:hover": {
      backgroundColor: colors.sidebarActiveBg,
      color: colors.sidebarTextActive,
    },
  },
  // NOTE: This is the active style for NavLink
  activeLink: {
    backgroundColor: colors.primary,
    color: colors.sidebarTextActive,
    fontWeight: 600,
    "&:hover": {
      backgroundColor: colors.primaryHover,
    },
  },
  sidebarFooter: {
    marginTop: "auto", // Pushes this block to the bottom
    padding: theme.spacing(1, 0),
    borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
  },
}));

const AdminLayout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  // useMediaQuery is the key to responsive logic in JS
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const adminNavItems = [
    { text: "Dashboard", to: "/admin/dashboard", icon: <DashboardIcon /> },
    { text: "Products", to: "/admin/products", icon: <ShoppingCartIcon /> },
    { text: "Orders", to: "/admin/orders", icon: <ListAltIcon /> },
    { text: "Users", to: "/admin/users", icon: <PeopleIcon /> },
  ];

  const drawerContent = (
    <div>
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
            // react-router-dom v6 uses a function for className/style to check active state
            className={({ isActive }) =>
              `${classes.listItem} ${isActive ? classes.activeLink : ""}`
            }
            onClick={isDesktop ? undefined : handleDrawerToggle} // Close drawer on mobile click
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <div className={classes.sidebarFooter}>
        <List>
          <ListItem button component={Link} to="/" className={classes.listItem}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Back to Home" />
          </ListItem>
          <ListItem button onClick={handleLogout} className={classes.listItem}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* AppBar is only for mobile screens */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Menu
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="admin navigation">
        {isDesktop ? (
          // Permanent drawer for desktop
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
            open
          >
            {drawerContent}
          </Drawer>
        ) : (
          // Temporary, collapsible drawer for mobile
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }} // Better for SEO and mobile performance
          >
            {drawerContent}
          </Drawer>
        )}
      </nav>

      {/* This is where your pages will be rendered */}
      <main className={classes.content}>
        {/* Your original spacer div is no longer needed because
            we added padding-top to the content class for mobile */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
