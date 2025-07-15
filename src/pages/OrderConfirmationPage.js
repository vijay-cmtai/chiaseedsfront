// src/pages/OrderConfirmationPage.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import { getSingleOrder, clearCurrentOrder } from "../features/user/userSlice";
import { retryShipment } from "../features/payment/paymentSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
  },
  successIcon: {
    fontSize: "4rem",
    color: theme.palette.success.main,
    marginBottom: theme.spacing(2),
  },
  buttonGroup: {
    marginTop: theme.spacing(4),
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  loadingBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
  },
  detailBox: {
    textAlign: "left",
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
}));

const OrderConfirmationPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { orderId } = useParams();

  const { currentOrder, status, message } = useSelector((state) => state.user);
  const { paymentStatus } = useSelector((state) => state.payment);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (orderId) {
      dispatch(getSingleOrder(orderId));
    }
    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [orderId, dispatch]);

  const handleRetryShipment = async () => {
    setIsRetrying(true);
    await dispatch(retryShipment({ orderId }));
    setIsRetrying(false);
    dispatch(getSingleOrder(orderId)); // Refresh order details
  };

  if (status === "loading" && !currentOrder) {
    return (
      <Box className={classes.loadingBox}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: "1rem" }}>
          Fetching your order details...
        </Typography>
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

  if (!currentOrder) {
    return (
      <Typography align="center" style={{ padding: "40px" }}>
        Order details not found. It might still be processing.
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Paper className={classes.paper}>
        <CheckCircleOutlineIcon className={classes.successIcon} />
        <Typography component="h1" variant="h4" gutterBottom>
          Thank You for Your Order!
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Your order has been placed successfully.
        </Typography>
        <Typography variant="body1" style={{ marginTop: "8px" }}>
          Order ID: <strong>#{currentOrder._id.slice(-6).toUpperCase()}</strong>
        </Typography>

        <Box className={classes.detailBox}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Divider />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography color="textSecondary">Total Items:</Typography>
            <Typography>
              {currentOrder.orderItems?.reduce(
                (acc, item) => acc + item.quantity,
                0
              ) || 0}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography color="textSecondary">Payment Method:</Typography>
            <Typography>{currentOrder.paymentMethod || "N/A"}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography color="textSecondary">Order Status:</Typography>
            <Typography>{currentOrder.orderStatus}</Typography>
          </Box>
          {currentOrder.orderStatus === "Shipped" &&
            currentOrder.shipmentDetails && (
              <>
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography color="textSecondary">
                    Tracking Number:
                  </Typography>
                  <Typography>
                    {currentOrder.shipmentDetails.trackingNumber}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography color="textSecondary">Courier:</Typography>
                  <Typography>
                    {currentOrder.shipmentDetails.courier}
                  </Typography>
                </Box>
              </>
            )}
          {currentOrder.orderStatus === "Paid" &&
            currentOrder.shipmentDetails?.error && (
              <Box mt={2}>
                <Typography variant="body2" color="error">
                  Shipment creation failed: {currentOrder.shipmentDetails.error}
                  . Our team is working on it, or you can try again.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRetryShipment}
                  disabled={isRetrying || paymentStatus === "loading"}
                  style={{ marginTop: "1rem" }}
                >
                  {isRetrying ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Retry Shipment"
                  )}
                </Button>
              </Box>
            )}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="h6">Total Amount:</Typography>
            <Typography variant="h6" color="primary">
              <strong>₹{currentOrder.totalPrice?.toLocaleString() || 0}</strong>
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="h6">Shipping Address</Typography>
            <Typography variant="body2">
              {currentOrder.shippingAddress?.fullName},{" "}
              {currentOrder.shippingAddress?.addressLine1},{" "}
              {currentOrder.shippingAddress?.city},{" "}
              {currentOrder.shippingAddress?.state} -{" "}
              {currentOrder.shippingAddress?.pincode}
            </Typography>
          </Box>
        </Box>

        <Box className={classes.buttonGroup}>
          <Button
            component={Link}
            to="/user/orders"
            variant="contained"
            color="primary"
          >
            View My Orders
          </Button>
          <Button component={Link} to="/" variant="outlined">
            Continue Shopping
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderConfirmationPage;
