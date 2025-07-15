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
  return classes.statusDefault;
};

const MyOrdersPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const [trackingVisible, setTrackingVisible] = useState({});

  const {
    orders = [],
    status = "idle",
    message = "",
  } = useSelector((state) => state.user || {});

  // Check if user is authenticated
  const isAuthenticated = useSelector(
    (state) => state.auth?.isAuthenticated || state.user?.isAuthenticated
  );

  useEffect(() => {
    // Always fetch orders when component mounts, regardless of status
    // This ensures fresh data after login
    if (isAuthenticated) {
      dispatch(getMyOrders());
    }
  }, [dispatch, isAuthenticated]);

  // Additional useEffect to handle the case where orders are empty but user is authenticated
  useEffect(() => {
    if (isAuthenticated && orders.length === 0 && status === "idle") {
      dispatch(getMyOrders());
    }
  }, [dispatch, isAuthenticated, orders.length, status]);

  const handleTabChange = (e, newValue) => setTabIndex(newValue);

  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    const statusMap = ["All", "Paid", "Shipped", "Delivered", "Cancelled"];
    const currentStatus = statusMap[tabIndex];
    if (currentStatus === "All") return orders;
    return orders.filter((order) => order.orderStatus === currentStatus);
  }, [orders, tabIndex]);

  const toggleTracking = (orderId) => {
    setTrackingVisible((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // Show loading if we're authenticated but still loading orders
  if (
    isAuthenticated &&
    (status === "loading" || (status === "idle" && orders.length === 0))
  ) {
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

  if (status === "failed")
    return (
      <Typography color="error" align="center">
        Error: {message}
      </Typography>
    );

  // If not authenticated, show appropriate message
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
          filteredOrders.map((order, index) => (
            <Box key={order._id} className={classes.orderCard}>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography className={classes.orderId}>
                    Order #{order._id.slice(-6).toUpperCase()}
                  </Typography>
                  <Typography variant="body2">
                    Ordered on: {formatDate(order.createdAt)}
                  </Typography>
                </Box>
                <Button
                  component={Link}
                  to={`/user/orders/${order._id}`}
                  size="small"
                  style={{ fontWeight: "bold", color: colors.primary }}
                >
                  View Details
                </Button>
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

                <Collapse in={trackingVisible[order._id]}>
                  <OrderTracker order={order} />
                </Collapse>
              </Box>

              <Divider style={{ marginTop: 12, marginBottom: 12 }} />

              <Box className={classes.orderFooter}>
                <Typography className={classes.orderTotal}>
                  Total: ₹{order.totalPrice.toLocaleString()}
                </Typography>
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
