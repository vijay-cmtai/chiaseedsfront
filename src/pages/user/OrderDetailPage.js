// src/pages/user/OrderDetailPage.js (FINAL CORRECTED CODE)

import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  CircularProgress,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip, // Chip import kiya
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  getOrderDetail,
  clearCurrentOrder,
} from "../../features/user/userSlice";

// --- Styles (Thode behtar banaye gaye) ---
const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: theme.spacing(3),
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  },
  header: { marginBottom: theme.spacing(1), fontWeight: "bold" },
  backButton: { marginBottom: theme.spacing(2), fontWeight: "bold" },
  detailSection: { margin: theme.spacing(1.5, 0) },
  sectionTitle: {
    marginTop: theme.spacing(2),
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  card: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  },
  itemAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: theme.spacing(2),
  },
  chip: {
    borderRadius: "16px",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  statusCompleted: { backgroundColor: "#e7f5ee", color: "#28a745" },
  statusShipped: { backgroundColor: "#e3f6f8", color: "#17a2b8" },
  statusDefault: { backgroundColor: "#fff8e1", color: "#f57c00" },
}));

const getStatusChipClass = (status, classes) => {
  const s = status?.toLowerCase();
  if (s === "shipped") return classes.statusShipped;
  if (s === "delivered" || s === "completed") return classes.statusCompleted;
  return classes.statusDefault;
};

const formatDate = (dateString) =>
  dateString
    ? new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentOrder, status, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetail(orderId));
    }
    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [orderId, dispatch]);

  if (status === "loading" && !currentOrder) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return <Typography color="error">Error: {message}</Typography>;
  }

  if (!currentOrder) {
    return (
      <Typography align="center" style={{ padding: "40px" }}>
        Order not found.
      </Typography>
    );
  }

  const { shippingAddress } = currentOrder;

  return (
    <div className={classes.pageContainer}>
      <Button
        component={Link}
        to="/user/orders"
        color="primary"
        startIcon={<ArrowBackIcon />}
        className={classes.backButton}
      >
        Back to Orders
      </Button>
      <Card className={classes.card}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <div>
              <Typography variant="h5" className={classes.header}>
                Order #{currentOrder._id.slice(-6).toUpperCase()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Placed on {formatDate(currentOrder.createdAt)}
              </Typography>
            </div>
            <Chip
              label={currentOrder.orderStatus}
              className={`${classes.chip} ${getStatusChipClass(currentOrder.orderStatus, classes)}`}
            />
          </Box>
          <Divider style={{ margin: "16px 0" }} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" className={classes.sectionTitle}>
                Items in this Order ({currentOrder.orderItems.length})
              </Typography>
              <List>
                {currentOrder.orderItems.map((item) => (
                  <ListItem key={item.product?._id || item.name} disableGutters>
                    <ListItemAvatar>
                      {/* === THE FIX IS HERE === */}
                      <Avatar
                        variant="rounded"
                        src={item.product?.mainImage}
                        className={classes.itemAvatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={`Quantity: ${item.quantity} x ₹${item.price.toLocaleString()}`}
                    />
                    <Typography variant="body1" style={{ fontWeight: 500 }}>
                      ₹{(item.quantity * item.price).toLocaleString()}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" className={classes.sectionTitle}>
                Shipping Address
              </Typography>
              <Box className={classes.detailSection}>
                <Typography>{shippingAddress.street}</Typography>
                <Typography>
                  {shippingAddress.city}, {shippingAddress.state} -{" "}
                  {shippingAddress.postalCode}
                </Typography>
                <Typography>{shippingAddress.country}</Typography>
              </Box>

              <Typography variant="h6" className={classes.sectionTitle}>
                Order Summary
              </Typography>
              <Box className={classes.detailSection}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Subtotal</Typography>
                  <Typography>
                    ₹{currentOrder.totalPrice.toLocaleString()}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Shipping</Typography>
                  <Typography>Free</Typography>
                </Box>
                <Divider style={{ margin: "8px 0" }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">
                    <strong>Total</strong>
                  </Typography>
                  <Typography variant="h6">
                    <strong>₹{currentOrder.totalPrice.toLocaleString()}</strong>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailPage;
