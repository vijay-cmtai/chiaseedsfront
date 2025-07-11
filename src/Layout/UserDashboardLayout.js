// src/Layout/UserDashboardLayout.js (FINAL CORRECTED CODE)

import React from "react";
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
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";

import { logout, reset } from "../features/auth/authSlice";

const colors = {
  primary: "#878fba",
  primaryHover: "#6c749d",
  sidebarBg: "#9788b9",
  sidebarText: "rgba(255, 255, 255, 0.8)",
  sidebarTextActive: "#ffffff",
  sidebarHoverBg: "rgba(255, 255, 255, 0.08)",
  contentBg: "#fdfaf6",
};

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  // Is root div me ab sirf ek hi element hai - flex container
  wrapper: {
    display: "flex",
  },
  // AppBar (Header) ke liye styles
  appBar: {
    backgroundColor: colors.sidebarBg,
    // Desktop par, AppBar ko Drawer ke upar lane ke liye zIndex zaroori hai
    zIndex: theme.zIndex.drawer + 1,
    // Desktop par AppBar ki position aur width set karna
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: colors.sidebarBg,
    borderRight: "none",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: colors.contentBg,
    minHeight: "100vh",
  },
  toolbar: theme.mixins.toolbar,
  sidebarHeader: {
    // Toolbar ke barabar height de rahe hain taaki "USER PANEL" header ke neeche na chhipe
    ...theme.mixins.toolbar, 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  sidebarHeaderText: {
    fontSize: "22px",
    fontWeight: "700",
    color: colors.sidebarTextActive,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  },
  navList: {
    padding: theme.spacing(1, 1),
  },
  listItem: {
    margin: theme.spacing(0.5, 1),
    padding: theme.spacing(1.2, 2),
    borderRadius: "8px",
    color: colors.sidebarText,
    transition: "all 0.2s ease-in-out",
    "& .MuiListItemIcon-root": {
      color: "inherit",
      minWidth: "45px",
    },
    "&:hover": {
      backgroundColor: colors.sidebarHoverBg,
      color: colors.sidebarTextActive,
    },
  },
  activeLink: {
    backgroundColor: colors.primary,
    color: colors.sidebarTextActive,
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    "& .MuiListItemText-primary": {
      fontWeight: 500,
    },
    "&:hover": {
      backgroundColor: colors.primaryHover,
    },
  },
  sidebarFooter: {
    marginTop: "auto",
    padding: theme.spacing(1, 0),
    borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
  },
}));

const UserDashboardLayout = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const userNavItems = [
    { text: "Dashboard", to: "/user/dashboard", icon: <DashboardIcon /> },
    { text: "My Orders", to: "/user/orders", icon: <ShoppingBasketIcon /> },
    { text: "My Cart", to: "/user/cart", icon: <ShoppingCartIcon /> },
    { text: "Wishlist", to: "/user/wishlist", icon: <FavoriteIcon /> },
    { text: "Profile", to: "/user/profile", icon: <AccountCircleIcon /> },
    { text: "Address", to: "/user/address", icon: <LocationOnIcon /> },
  ];

  const drawerContent = (
    <div>
       {/* Desktop par, sidebar header ko Appbar se align karne ke liye space chahiye */}
      {!isMobile && <div className={classes.toolbar} />}
      <div className={classes.sidebarHeader}>
        <Typography variant="h5" className={classes.sidebarHeaderText}>
          User Panel
        </Typography>
      </div>
      <List className={classes.navList}>
        {userNavItems.map((item) => (
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
            onClick={isMobile ? handleDrawerToggle : null}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <div className={classes.sidebarFooter}>
        <ListItem button component={Link} to="/" className={classes.listItem}>
          <ListItemIcon> <HomeIcon /> </ListItemIcon>
          <ListItemText primary="Back to Home" />
        </ListItem>
        <ListItem button onClick={handleLogout} className={classes.listItem}>
          <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </div>
    </div>
  );

  return (
    // YEH FINAL STRUCTURE HAI
    <div className={classes.wrapper}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            My Account
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }}
          >
            {drawerContent}
          </Drawer>
        ) : (
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
            open
          >
            {drawerContent}
          </Drawer>
        )}
      </nav>
      <main className={classes.content}>
        {/* Yeh toolbar content ko AppBar ke neeche rakhega */}
        <div className={classes.toolbar} />
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboardLayout;
