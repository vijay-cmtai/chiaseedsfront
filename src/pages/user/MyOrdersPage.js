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

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: theme.spacing(1),
    backgroundColor: "#f8f9fa",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4),
    },
    [theme.breakpoints.down("xs")]: {
      padding: "2vw 1vw",
    },
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
  tabs: {
    borderBottom: `1px solid ${colors.borderColor}`,
    "& .MuiTabs-indicator": { backgroundColor: colors.textDark },
    [theme.breakpoints.down("sm")]: {
      minHeight: "40px",
      fontSize: "0.85rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
      minHeight: "36px",
    },
  },
  tab: {
    textTransform: "none",
    fontWeight: 600,
    color: colors.textMuted,
    "&.Mui-selected": { color: colors.textDark },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
      padding: theme.spacing(0.5),
      minWidth: 60,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem",
      padding: theme.spacing(0.3),
      minWidth: 48,
    },
  },
  orderCard: {
    padding: theme.spacing(1.5),
    margin: theme.spacing(1, 0),
    background: colors.cardBg,
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
      margin: theme.spacing(2, 0),
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
      margin: theme.spacing(1, 0),
      borderRadius: "10px",
      boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
      background: "#fff",
    },
  },
  orderHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "stretch",
      gap: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  orderId: {
    fontWeight: "bold",
    fontSize: "1.05rem",
    color: colors.textDark,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.95rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
    },
  },
  orderDate: { color: colors.textMuted, fontSize: "0.85rem" },
  viewDetailsButton: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: "0.8rem",
    padding: theme.spacing(0.5, 0),
    alignSelf: "flex-end",
    [theme.breakpoints.up("sm")]: {
      alignSelf: "center",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7rem",
      padding: theme.spacing(0.2, 0),
    },
  },
  productImages: {
    display: "flex",
    gap: theme.spacing(1),
    padding: theme.spacing(1.5, 0),
    overflowX: "auto",
    [theme.breakpoints.down("xs")]: {
      gap: theme.spacing(0.5),
      padding: theme.spacing(1, 0),
    },
  },
  productAvatar: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
    borderRadius: "8px",
    backgroundColor: "#e0e0e0",
    border: "1px solid #eee",
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(5.5),
      height: theme.spacing(5.5),
    },
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(4.5),
      height: theme.spacing(4.5),
    },
  },
  orderFooter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing(1),
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "stretch",
      gap: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  orderTotal: { fontWeight: "bold", color: colors.textDark, fontSize: "1rem" },
  chip: {
    borderRadius: "16px",
    fontWeight: "bold",
    height: "24px",
    fontSize: "0.8rem",
    textTransform: "capitalize",
    [theme.breakpoints.down("xs")]: {
      alignSelf: "flex-end",
      fontSize: "0.7rem",
      height: "20px",
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
          <Tab label="Completed" className={classes.tab} />
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
                <Divider style={{ margin: "8px 0", borderRadius: "8px" }} />
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
