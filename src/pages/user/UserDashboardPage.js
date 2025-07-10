// src/pages/user/UserDashboardPage.js (FINAL CORRECTED CODE)

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";

// === NEW ICONS IMPORTED ===
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"; // Cart ke liye behtar icon
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty"; // Pending Orders ke liye icon
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import {
  getDashboardStats,
  getRecentUserOrders,
} from "../../features/user/userSlice";

// --- Styles (No Change) ---
const colors = {
  primary: "#878fba",
  secondary: "#3d2b56",
  textDark: "#3d2b56",
  textMuted: "#6c749d",
  cardBg: "#ffffff",
  green: "#28a745",
  lightGreen: "#e7f5ee",
  orange: "#fd7e14",
  lightOrange: "#fef2e7",
  amber: "#ffc107", // Naya rang pending orders ke liye
};
const useStyles = makeStyles((theme) => ({
  pageContainer: { padding: theme.spacing(3) },
  welcomeHeader: {
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(1),
  },
  welcomeSubheader: { color: colors.textMuted, marginBottom: theme.spacing(4) },
  statCard: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3),
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    height: "100%",
  },
  iconContainer: {
    padding: theme.spacing(2),
    borderRadius: "50%",
    marginRight: theme.spacing(3),
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: { fontWeight: "bold", color: colors.textDark },
  statLabel: { color: colors.textMuted, fontSize: "0.9rem" },
  contentCard: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1),
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
  },
  sectionTitle: {
    fontWeight: 600,
    color: colors.textDark,
    padding: theme.spacing(2, 2, 1, 2),
  },
  quickLinkButton: {
    justifyContent: "space-between",
    padding: theme.spacing(1.5, 2),
    textTransform: "none",
    color: colors.textDark,
  },
  chip: { borderRadius: "16px", fontWeight: "bold", height: "26px" },
  statusDelivered: { backgroundColor: colors.lightGreen, color: colors.green },
  statusPending: { backgroundColor: colors.lightOrange, color: colors.orange },
}));

const getStatusChipClass = (status, classes) => {
  return status === "Delivered" || status === "Completed"
    ? classes.statusDelivered
    : classes.statusPending;
};

const UserDashboardPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { stats, recentOrders, status, message } =
    useSelector((state) => state.user) || {};

  useEffect(() => {
    // Component ke load hote hi data fetch karein
    dispatch(getDashboardStats());
    dispatch(getRecentUserOrders());
  }, [dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (status === "loading" && !stats) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return <Typography color="error">Error: {message}</Typography>;
  }

  // === FIX IS HERE: Updated the liveStats array ===
  const liveStats = [
    {
      label: "Items in Cart", // Label theek kiya
      value: stats?.cartItems || 0, // Sahi value (cartItems) use ki
      icon: <ShoppingCartIcon />, // Behtar icon
      color: "#fd7e14",
    },
    {
      label: "Wishlist Items",
      value: stats?.wishlistItems || 0,
      icon: <FavoriteIcon />,
      color: "#dc3545",
    },
    {
      label: "Saved Addresses",
      value: stats?.savedAddresses || 0,
      icon: <LocationOnIcon />,
      color: "#17a2b8",
    },
    {
      label: "Pending Orders", // Asli pending orders ke liye naya card
      value: stats?.pendingOrders || 0,
      icon: <HourglassEmptyIcon />, // Naya icon
      color: colors.amber, // Naya rang
    },
  ];

  return (
    <div className={classes.pageContainer}>
      <Typography variant="h4" className={classes.welcomeHeader}>
        Hello, {user?.user?.name || "User"}!
      </Typography>
      <Typography variant="body1" className={classes.welcomeSubheader}>
        Here's a quick overview of your account.
      </Typography>

      {/* === Grid layout 4 cards ke liye adjust kiya === */}
      <Grid container spacing={3}>
        {liveStats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card className={classes.statCard}>
              <Box
                className={classes.iconContainer}
                style={{ backgroundColor: stat.color }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h4" className={classes.statValue}>
                  {stat.value}
                </Typography>
                <Typography variant="body1" className={classes.statLabel}>
                  {stat.label}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card className={classes.contentCard}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Recent Orders
            </Typography>
            <List>
              {recentOrders && recentOrders.length > 0 ? (
                recentOrders.map((order, index) => (
                  <React.Fragment key={order.orderId}>
                    <ListItem>
                      <ListItemText
                        primary={`Order ${order.orderId}`}
                        secondary={`Date: ${formatDate(order.date)} | Total: ₹${order.total}`}
                      />
                      <Chip
                        label={order.status}
                        className={`${classes.chip} ${getStatusChipClass(order.status, classes)}`}
                      />
                    </ListItem>
                    {index < recentOrders.length - 1 && (
                      <Divider variant="middle" component="li" />
                    )}
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="You have no recent orders." />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.contentCard}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Quick Links
            </Typography>
            <List>
              <ListItem
                button
                component={Link}
                to="/user/orders"
                className={classes.quickLinkButton}
              >
                <ListItemText primary="View All My Orders" />
                <ArrowForwardIcon fontSize="small" />
              </ListItem>
              <Divider variant="middle" />
              <ListItem
                button
                component={Link}
                to="/user/profile"
                className={classes.quickLinkButton}
              >
                <ListItemText primary="Edit Your Profile" />
                <ArrowForwardIcon fontSize="small" />
              </ListItem>
              <Divider variant="middle" />
              <ListItem
                button
                component={Link}
                to="/user/address"
                className={classes.quickLinkButton}
              >
                <ListItemText primary="Manage Addresses" />
                <ArrowForwardIcon fontSize="small" />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserDashboardPage;
