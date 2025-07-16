import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Card,
  Chip,
  Box,
  Tabs,
  Tab,
  Divider,
  Avatar,
  CircularProgress,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { getMyOrders } from "../../features/user/userSlice";
import { cancelOrder } from "../../features/payment/paymentSlice";
import OrderTracker from "../../components/OrderTracker";

const colors = {
  primary: "#6B5B95",
  textDark: "#3d2b56",
  textMuted: "#888888",
  borderColor: "#e9ecef",
  cardBg: "#ffffff",
  green: "#28a745",
  lightGreen: "#e7f5ee",
  blue: "#17a2b8",
  lightBlue: "#e3f6f8",
  amber: "#f57c00",
  lightAmber: "#fff8e1",
  red: "#dc3545",
  lightRed: "#f8d7da",
};

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: theme.spacing(2),
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4),
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
      backgroundColor: "#fff",
    },
  },
  header: {
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      marginBottom: theme.spacing(1.5),
      textAlign: "center",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.3rem",
      marginBottom: theme.spacing(1),
    },
  },
  ordersContainer: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    padding: theme.spacing(1, 0),
    [theme.breakpoints.down("xs")]: {
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      padding: 0,
    },
  },
  tabsContainer: {
    [theme.breakpoints.down("xs")]: {
      "& .MuiTabs-flexContainer": {
        justifyContent: "space-between",
      },
      "& .MuiTab-root": {
        minWidth: "auto",
        padding: theme.spacing(1, 0.5),
        fontSize: "0.75rem",
      },
    },
  },
  tab: {
    textTransform: "none",
    fontWeight: 600,
    color: colors.textMuted,
    "&.Mui-selected": { color: colors.textDark },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem",
      minWidth: "auto",
      padding: theme.spacing(1, 0.5),
    },
  },
  orderCard: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    background: colors.cardBg,
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1.5),
      margin: theme.spacing(1, 0),
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    },
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      gap: theme.spacing(1),
    },
  },
  orderHeaderLeft: {
    flex: 1,
  },
  orderHeaderRight: {
    [theme.breakpoints.down("xs")]: {
      alignSelf: "flex-end",
    },
  },
  orderId: {
    fontWeight: "bold",
    color: colors.textDark,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
    },
  },
  orderDate: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  viewDetailsButton: {
    fontWeight: "bold",
    color: colors.primary,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
      padding: theme.spacing(0.5, 1),
    },
  },
  avatarContainer: {
    display: "flex",
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
    flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
      gap: theme.spacing(0.5),
      marginTop: theme.spacing(1.5),
    },
  },
  avatar: {
    width: 56,
    height: 56,
    [theme.breakpoints.down("xs")]: {
      width: 48,
      height: 48,
    },
  },
  trackingButton: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
      padding: theme.spacing(0.5, 1),
    },
  },
  orderFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "stretch",
      gap: theme.spacing(1),
    },
  },
  orderFooterLeft: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "stretch",
      gap: theme.spacing(1),
    },
  },
  orderFooterActions: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      justifyContent: "space-between",
    },
  },
  orderTotal: {
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
    },
  },
  chip: {
    borderRadius: "16px",
    fontWeight: "bold",
    fontSize: "0.8rem",
    height: "24px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7rem",
      height: "20px",
      alignSelf: "center",
    },
  },
  statusCompleted: { backgroundColor: colors.lightGreen, color: colors.green },
  statusShipped: { backgroundColor: colors.lightBlue, color: colors.blue },
  statusDefault: { backgroundColor: colors.lightAmber, color: colors.amber },
  statusCancelled: { backgroundColor: colors.lightRed, color: colors.red },
  cancelButton: {
    color: colors.red,
    borderColor: colors.red,
    "&:hover": {
      backgroundColor: colors.lightRed,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
      padding: theme.spacing(0.5, 1),
    },
  },
  emptyState: {
    padding: theme.spacing(5),
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(3),
    },
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40vh",
    [theme.breakpoints.down("xs")]: {
      height: "30vh",
    },
  },
}));

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const getStatusChipClass = (status, classes) => {
  const s = status?.toLowerCase();
  if (s === "shipped") return classes.statusShipped;
  if (s === "delivered" || s === "completed") return classes.statusCompleted;
  if (s === "cancelled") return classes.statusCancelled;
  return classes.statusDefault;
};

const MyOrdersPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const [trackingVisible, setTrackingVisible] = useState({});

  const { orders = [], status: userStatus } = useSelector(
    (state) => state.user || {}
  );
  const { status: paymentStatus } = useSelector((state) => state.payment || {});
  const isAuthenticated = useSelector((state) => state.auth?.user);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMyOrders());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (paymentStatus === "succeeded") {
      dispatch(getMyOrders());
    }
  }, [paymentStatus, dispatch]);

  const handleTabChange = (e, newValue) => setTabIndex(newValue);

  const handleCancelOrder = (orderId) => {
    if (
      window.confirm(
        "Are you sure you want to cancel this order? This action is irreversible."
      )
    ) {
      dispatch(cancelOrder({ orderId }));
    }
  };

  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    const statusMap = ["All", "Paid", "Shipped", "Delivered", "Cancelled"];
    const currentStatus = statusMap[tabIndex];
    if (currentStatus === "All") return orders;
    return orders.filter(
      (order) => order.orderStatus.toLowerCase() === currentStatus.toLowerCase()
    );
  }, [orders, tabIndex]);

  const toggleTracking = (orderId) => {
    setTrackingVisible((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  if (isAuthenticated && userStatus === "loading") {
    return (
      <Box className={classes.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Box className={classes.loadingContainer}>
        <Typography>Please login to view your orders.</Typography>
      </Box>
    );
  }

  return (
    <div className={classes.pageContainer}>
      <Typography variant="h4" className={classes.header}>
        My Orders
      </Typography>

      <Card className={classes.ordersContainer}>
        <Box className={classes.tabsContainer}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant={isMobile ? "fullWidth" : "scrollable"}
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="All" className={classes.tab} />
            <Tab label="Paid" className={classes.tab} />
            <Tab label="Shipped" className={classes.tab} />
            <Tab label="Delivered" className={classes.tab} />
            <Tab label="Cancelled" className={classes.tab} />
          </Tabs>
        </Box>

        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Box key={order._id} className={classes.orderCard}>
              <Box className={classes.orderHeader}>
                <Box className={classes.orderHeaderLeft}>
                  <Typography className={classes.orderId}>
                    Order #{order._id.slice(-6).toUpperCase()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.orderDate}
                  >
                    Ordered on: {formatDate(order.createdAt)}
                  </Typography>
                </Box>
                <Box className={classes.orderHeaderRight}>
                  <Button
                    component={Link}
                    to={`/user/orders/${order._id}`}
                    size="small"
                    className={classes.viewDetailsButton}
                  >
                    View Details
                  </Button>
                </Box>
              </Box>

              <Box className={classes.avatarContainer}>
                {order.orderItems?.map((item, idx) => (
                  <Avatar
                    key={idx}
                    src={item.product?.mainImage}
                    alt={item.name}
                    variant="rounded"
                    className={classes.avatar}
                  />
                ))}
              </Box>

              <Box mt={2}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => toggleTracking(order._id)}
                  className={classes.trackingButton}
                >
                  {trackingVisible[order._id]
                    ? "Hide Tracking"
                    : "Show Tracking"}
                </Button>
              </Box>

              <Collapse in={trackingVisible[order._id]}>
                <OrderTracker order={order} />
              </Collapse>

              <Divider style={{ marginTop: 12, marginBottom: 12 }} />

              <Box className={classes.orderFooter}>
                <Box className={classes.orderFooterLeft}>
                  <Box className={classes.orderFooterActions}>
                    {!["Shipped", "Delivered", "Cancelled"].includes(
                      order.orderStatus
                    ) && (
                      <Button
                        variant="outlined"
                        size="small"
                        className={classes.cancelButton}
                        onClick={() => handleCancelOrder(order._id)}
                        disabled={paymentStatus === "loading"}
                      >
                        {paymentStatus === "loading"
                          ? "Cancelling..."
                          : "Cancel Order"}
                      </Button>
                    )}
                    <Typography variant="body1" className={classes.orderTotal}>
                      Total: ₹{order.totalPrice.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={order.orderStatus}
                  className={`${classes.chip} ${getStatusChipClass(
                    order.orderStatus,
                    classes
                  )}`}
                />
              </Box>
            </Box>
          ))
        ) : (
          <Box className={classes.emptyState}>
            <Typography>You have no orders in this category.</Typography>
          </Box>
        )}
      </Card>
    </div>
  );
};

export default MyOrdersPage;
