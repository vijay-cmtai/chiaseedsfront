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
} from "@material-ui/core";
import { getMyOrders } from "../../features/user/userSlice";
import { cancelOrder } from "../../features/payment/paymentSlice"; // <-- NEW: Import cancelOrder action
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
  red: "#dc3545", // <-- NEW: Color for cancellation
  lightRed: "#f8d7da", // <-- NEW: BG for cancelled chip
};

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: theme.spacing(1),
    backgroundColor: "#f8f9fa",
    [theme.breakpoints.up("sm")]: { padding: theme.spacing(4) },
    [theme.breakpoints.down("xs")]: { padding: "2vw 1vw" },
  },
  header: {
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem",
      marginBottom: theme.spacing(1.5),
      textAlign: "center",
    },
  },
  ordersContainer: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    padding: theme.spacing(1, 0),
    [theme.breakpoints.down("xs")]: {
      boxShadow: "none",
      borderRadius: 0,
      padding: 0,
    },
  },
  tab: {
    textTransform: "none",
    fontWeight: 600,
    color: colors.textMuted,
    "&.Mui-selected": { color: colors.textDark },
  },
  orderCard: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    background: colors.cardBg,
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  orderId: { fontWeight: "bold", color: colors.textDark },
  orderFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // <-- NEW: Better alignment
    marginTop: theme.spacing(2),
  },
  chip: {
    borderRadius: "16px",
    fontWeight: "bold",
    fontSize: "0.8rem",
    height: "24px",
  },
  statusCompleted: { backgroundColor: colors.lightGreen, color: colors.green },
  statusShipped: { backgroundColor: colors.lightBlue, color: colors.blue },
  statusDefault: { backgroundColor: colors.lightAmber, color: colors.amber },
  statusCancelled: { backgroundColor: colors.lightRed, color: colors.red }, // <-- NEW
  cancelButton: {
    // <-- NEW
    color: colors.red,
    borderColor: colors.red,
    "&:hover": {
      backgroundColor: colors.lightRed,
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
  if (s === "cancelled") return classes.statusCancelled; // <-- NEW
  return classes.statusDefault;
};

const MyOrdersPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const [trackingVisible, setTrackingVisible] = useState({});

  const { orders = [], status: userStatus } = useSelector(
    (state) => state.user || {}
  );
  const { status: paymentStatus } = useSelector((state) => state.payment || {}); // <-- NEW: Get status from payment slice
  const isAuthenticated = useSelector((state) => state.auth?.user);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMyOrders());
    }
  }, [dispatch, isAuthenticated]);

  // <-- NEW: This useEffect will re-fetch orders after a successful cancellation
  useEffect(() => {
    if (paymentStatus === "succeeded") {
      // Check if the last action was cancellation
      // For simplicity, we just refetch. This is robust.
      dispatch(getMyOrders());
    }
  }, [paymentStatus, dispatch]);

  const handleTabChange = (e, newValue) => setTabIndex(newValue);

  // <-- NEW: Handler for cancelling an order
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="40vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="40vh"
      >
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
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All" className={classes.tab} />
          <Tab label="Paid" className={classes.tab} />
          <Tab label="Shipped" className={classes.tab} />
          <Tab label="Delivered" className={classes.tab} />
          <Tab label="Cancelled" className={classes.tab} />
        </Tabs>

        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Box key={order._id} className={classes.orderCard}>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography className={classes.orderId}>
                    Order #{order._id.slice(-6).toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ordered on: {formatDate(order.createdAt)}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    component={Link}
                    to={`/user/orders/${order._id}`}
                    size="small"
                    style={{ fontWeight: "bold", color: colors.primary }}
                  >
                    View Details
                  </Button>
                </Box>
              </Box>

              <Box mt={2} display="flex" gap={1}>
                {order.orderItems?.map((item, idx) => (
                  <Avatar
                    key={idx}
                    src={item.product?.mainImage}
                    alt={item.name}
                    variant="rounded"
                    style={{ width: 56, height: 56 }}
                  />
                ))}
              </Box>

              <Box mt={2}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => toggleTracking(order._id)}
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
                <Box display="flex" alignItems="center" gap={1}>
                  {/* -- NEW: Cancel Button Logic -- */}
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
          <Typography align="center" style={{ padding: "40px" }}>
            You have no orders in this category.
          </Typography>
        )}
      </Card>
    </div>
  );
};

export default MyOrdersPage;
