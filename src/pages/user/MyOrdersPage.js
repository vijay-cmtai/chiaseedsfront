// src/pages/user/MyOrdersPage.js (FULLY RESPONSIVE CODE)

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
} from "@material-ui/core";
import { getMyOrders } from "../../features/user/userSlice";

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

// === YAHAN PAR SABSE ZAROORI BADLAV HAIN ===
const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: theme.spacing(2), // Mobile par kam padding
    backgroundColor: "#f8f9fa",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4), // Desktop par zyada padding
    },
  },
  header: {
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(3),
  },
  ordersContainer: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    padding: theme.spacing(1, 0),
  },
  tabs: {
    borderBottom: `1px solid ${colors.borderColor}`,
    "& .MuiTabs-indicator": { backgroundColor: colors.textDark },
  },
  tab: {
    textTransform: "none",
    fontWeight: 600,
    color: colors.textMuted,
    "&.Mui-selected": { color: colors.textDark },
  },
  orderCard: {
    padding: theme.spacing(2), // Mobile par kam padding
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3), // Desktop par zyada
    },
  },
  orderHeader: {
    display: "flex",
    flexDirection: "column", // Mobile par ek ke neeche ek
    alignItems: "flex-start", // Left-align
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row", // Desktop par side-by-side
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  orderId: {
    fontWeight: "bold",
    fontSize: "1.1rem", // Thoda chhota
    color: colors.textDark,
  },
  orderDate: { color: colors.textMuted, fontSize: "0.9rem" },
  viewDetailsButton: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: "0.8rem",
    padding: theme.spacing(0.5, 0), // Padding theek ki
    alignSelf: "flex-end", // Mobile par button ko right me rakhega
    [theme.breakpoints.up("sm")]: {
      alignSelf: "center", // Desktop par wapas center me
    },
  },
  productImages: {
    display: "flex",
    gap: theme.spacing(1.5),
    padding: theme.spacing(2, 0),
    overflowX: "auto", // Agar zyada images hon to scroll ho
  },
  productAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    borderRadius: "8px",
    backgroundColor: "#e0e0e0",
    border: "1px solid #eee",
  },
  orderFooter: {
    display: "flex",
    flexDirection: "column", // Mobile par ek ke neeche ek
    alignItems: "flex-start",
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row", // Desktop par side-by-side
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  orderTotal: { fontWeight: "bold", color: colors.textDark },
  chip: {
    borderRadius: "16px",
    fontWeight: "bold",
    height: "26px",
    fontSize: "0.8rem",
    textTransform: "capitalize",
    [theme.breakpoints.down("xs")]: {
      alignSelf: "flex-end", // Mobile par status chip ko right me rakhega
    },
  },
  statusCompleted: { backgroundColor: colors.lightGreen, color: colors.green },
  statusShipped: { backgroundColor: colors.lightBlue, color: colors.blue },
  statusDefault: { backgroundColor: colors.lightAmber, color: colors.amber },
}));

const formatDate = (dateString) =>
  dateString
    ? new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

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

  const {
    orders = [],
    status = "idle",
    message = "",
  } = useSelector((state) => state.user || {});

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    const statusMap = [
      "All",
      "Pending",
      "Processing",
      "Shipped",
      "Completed",
      "Cancelled",
    ];
    const currentStatus = statusMap[tabIndex];
    if (currentStatus === "All") return orders;
    return orders.filter((order) => order.orderStatus === currentStatus);
  }, [tabIndex, orders]);

  if (status === "loading" && orders.length === 0) {
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
    return (
      <Typography color="error" align="center" style={{ padding: "40px" }}>
        Error: {message}
      </Typography>
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
          className={classes.tabs}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All" className={classes.tab} />
          <Tab label="Pending" className={classes.tab} />
          <Tab label="Processing" className={classes.tab} />
          <Tab label="Shipped" className={classes.tab} />
          <Tab label="Completed" className={classes.tab} />{" "}
          {/* 'Delivered' ko 'Completed' se match karein */}
          <Tab label="Cancelled" className={classes.tab} />
        </Tabs>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <React.Fragment key={order._id}>
              <Box className={classes.orderCard}>
                <Box className={classes.orderHeader}>
                  <Box>
                    <Typography variant="h6" className={classes.orderId}>
                      Order #{order._id.slice(-6).toUpperCase()}
                    </Typography>
                    <Typography variant="body2" className={classes.orderDate}>
                      Ordered on: {formatDate(order.createdAt)}
                    </Typography>
                  </Box>
                  <Button
                    component={Link}
                    to={`/user/orders/${order._id}`}
                    className={classes.viewDetailsButton}
                  >
                    VIEW DETAILS
                  </Button>
                </Box>
                <Divider style={{ margin: "8px 0" }} />
                <Box className={classes.productImages}>
                  {order.orderItems?.map((item, idx) => (
                    <Avatar
                      key={idx}
                      src={item.product?.mainImage}
                      variant="rounded"
                      className={classes.productAvatar}
                    >
                      {item.name?.charAt(0)}
                    </Avatar>
                  ))}
                </Box>
                <Divider style={{ margin: "8px 0" }} />
                <Box className={classes.orderFooter}>
                  <Typography variant="body1" className={classes.orderTotal}>
                    Total: ₹{order.totalPrice.toLocaleString()}
                  </Typography>
                  <Chip
                    label={order.orderStatus}
                    className={`${classes.chip} ${getStatusChipClass(order.orderStatus, classes)}`}
                  />
                </Box>
              </Box>
              {index < filteredOrders.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          <Typography
            align="center"
            color="textSecondary"
            style={{ padding: "40px" }}
          >
            You have no orders in this category.
          </Typography>
        )}
      </Card>
    </div>
  );
};

export default MyOrdersPage;
