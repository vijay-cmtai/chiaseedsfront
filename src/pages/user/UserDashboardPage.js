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

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import {
  getDashboardStats,
  getRecentUserOrders,
} from "../../features/user/userSlice";

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
  amber: "#ffc107",
};
const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: { padding: theme.spacing(3) },
  },
  welcomeHeader: {
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  welcomeSubheader: {
    color: colors.textMuted,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: { fontSize: "0.9rem" },
  },
  statCard: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
  iconContainer: {
    padding: theme.spacing(2),
    borderRadius: "50%",
    marginRight: theme.spacing(2),
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  },
  statValue: {
    fontWeight: "bold",
    color: colors.textDark,
    [theme.breakpoints.down("sm")]: { fontSize: "1.2rem" },
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: "0.9rem",
    [theme.breakpoints.down("sm")]: { fontSize: "0.8rem" },
  },
  contentCard: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
  sectionTitle: {
    fontWeight: 600,
    color: colors.textDark,
    padding: theme.spacing(1, 2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
      padding: theme.spacing(1, 1),
    },
  },
  quickLinkButton: {
    justifyContent: "space-between",
    padding: theme.spacing(1, 2),
    textTransform: "none",
    color: colors.textDark,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 1),
      fontSize: "0.9rem",
    },
  },
  chip: {
    borderRadius: "16px",
    fontWeight: "bold",
    height: "26px",
    [theme.breakpoints.down("sm")]: { fontSize: "0.75rem" },
  },
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

  const liveStats = [
    {
      label: "Items in Cart",
      value: stats?.cartItems || 0,
      icon: <ShoppingCartIcon />,
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
      label: "Pending Orders",
      value: stats?.pendingOrders || 0,
      icon: <HourglassEmptyIcon />,
      color: colors.amber,
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

      <Grid container spacing={2}>
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

      <Grid container spacing={2}>
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
