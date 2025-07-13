import React, { useCallback, useMemo } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Box,
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
import { makeStyles } from "@material-ui/core/styles";

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
  root: {
    display: "flex",
    fontFamily: "'Poppins', sans-serif",
    minHeight: "100vh",
  },
  appBarMobile: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    backgroundColor: colors.sidebarBg,
  },
  title: {
    flexGrow: 1,
    fontSize: "1.2rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
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
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
      maxWidth: 300,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: colors.contentBg,
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
  },
  toolbar: theme.mixins.toolbar,
  sidebarHeader: {
    padding: theme.spacing(3),
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  sidebarHeaderText: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: colors.sidebarTextActive,
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.1rem",
    },
  },
  navList: {
    padding: theme.spacing(1),
  },
  listItem: {
    margin: theme.spacing(0.5, 1),
    padding: theme.spacing(1.2, 2),
    borderRadius: "8px",
    color: colors.sidebarText,
    "& .MuiListItemIcon-root": {
      minWidth: 40,
      color: colors.sidebarText,
    },
    "&:hover": {
      backgroundColor: colors.sidebarHoverBg,
      color: colors.sidebarTextActive,
      "& .MuiListItemIcon-root": {
        color: colors.sidebarTextActive,
      },
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1, 1.5),
    },
  },
  activeLink: {
    backgroundColor: colors.primary,
    color: colors.sidebarTextActive,
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    "& .MuiListItemText-primary": {
      fontWeight: 500,
    },
    "& .MuiListItemIcon-root": {
      color: colors.sidebarTextActive,
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

const UserDashboardLayout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  }, [dispatch, navigate]);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const userNavItems = useMemo(
    () => [
      { text: "Dashboard", to: "/user/dashboard", icon: <DashboardIcon /> },
      { text: "My Orders", to: "/user/orders", icon: <ShoppingBasketIcon /> },
      { text: "My Cart", to: "/user/cart", icon: <ShoppingCartIcon /> },
      { text: "Wishlist", to: "/user/wishlist", icon: <FavoriteIcon /> },
      { text: "Profile", to: "/user/profile", icon: <AccountCircleIcon /> },
      { text: "Address", to: "/user/address", icon: <LocationOnIcon /> },
    ],
    []
  );

  const drawerContent = (
    <Box display="flex" flexDirection="column" height="100%">
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
            onClick={isMobile ? handleDrawerToggle : undefined}
            aria-label={item.text}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <div className={classes.sidebarFooter}>
        <ListItem
          button
          component={Link}
          to="/"
          className={classes.listItem}
          aria-label="Back to Home"
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Back to Home" />
        </ListItem>
        <ListItem
          button
          onClick={handleLogout}
          className={classes.listItem}
          aria-label="Sign Out"
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </div>
    </Box>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBarMobile}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Hello, {user?.name?.split(" ")[0] ?? "Guest"}!
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="user navigation">
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
        {isMobile && <div className={classes.toolbar} />}
        <Outlet />
      </main>
    </div>
  );
};

export default React.memo(UserDashboardLayout);
