import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Modal,
  Snackbar,
  Tooltip,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { makeStyles } from "@material-ui/core/styles";

import {
  getCart,
  getAddresses,
  removeFromCart,
  updateCartQuantity,
  resetUserStatus,
  clearCart,
} from "../../features/user/userSlice";
import {
  createRazorpayOrder,
  verifyPayment,
  resetPaymentStatus,
} from "../../features/payment/paymentSlice";

const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: theme.spacing(4),
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  },
  cartItemRow: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 0),
    flexWrap: "wrap",
  },
  itemImage: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(3),
  },
  quantitySelector: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  sidebarCard: {
    position: "sticky",
    top: theme.spacing(10),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    borderRadius: "8px",
    width: "100%",
    maxWidth: "500px",
    outline: "none",
  },
  addressCardSelectable: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
    cursor: "pointer",
    border: "1px solid #ddd",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: theme.palette.primary.main,
      backgroundColor: "#f9f9ff",
    },
  },
  selectedAddress: {
    borderColor: theme.palette.primary.main,
    borderWidth: "2px",
    backgroundColor: "#f0f2ff",
  },
  notification: {
    padding: theme.spacing(1.5, 3),
    color: "white",
    borderRadius: theme.shape.borderRadius,
    fontWeight: 500,
  },
  invalidItemRow: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    backgroundColor: "#fffbe6",
    border: `1px solid #ffe58f`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
  invalidItemText: {
    color: "#8a6d3b",
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    fontWeight: 500,
  },
}));

// --- Naye charges ke liye constants define karein ---
const DELIVERY_CHARGE = 99;
const GST_RATE = 0.05; // 5%

const CartPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const {
    cart,
    addresses,
    status: userStatus,
    message: userMessage,
  } = useSelector((state) => state.user || { cart: [], addresses: [] });
  const {
    status: paymentStatus,
    message: paymentMessage,
    razorpayOrder,
    finalOrder,
  } = useSelector((state) => state.payment || {});

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    msg: "",
    severity: "info",
  });
  const isPaymentProcessing = paymentStatus === "loading";

  useEffect(() => {
    dispatch(getCart());
    dispatch(getAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId) {
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      setSelectedAddressId(defaultAddress?._id || addresses[0]._id);
    }
  }, [addresses, selectedAddressId]);

  useEffect(() => {
    const errorMsg =
      userStatus === "failed"
        ? userMessage
        : paymentStatus === "failed"
          ? paymentMessage
          : null;
    if (errorMsg) {
      setNotification({ open: true, msg: errorMsg, severity: "error" });
      dispatch(resetUserStatus());
      dispatch(resetPaymentStatus());
    }
  }, [userStatus, userMessage, paymentStatus, paymentMessage, dispatch]);

  const { validCartItems, invalidCartItems } = useMemo(() => {
    const valid = [];
    const invalid = [];
    (cart || []).forEach((item) => {
      if (item?.product) valid.push(item);
      else if (item) invalid.push(item);
    });
    return { validCartItems: valid, invalidCartItems: invalid };
  }, [cart]);

  // --- Naye charges ko calculate karein ---
  const subtotal = useMemo(
    () =>
      validCartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ),
    [validCartItems]
  );

  const gstAmount = useMemo(() => subtotal * GST_RATE, [subtotal]);

  const totalAmount = useMemo(
    () => subtotal + gstAmount + DELIVERY_CHARGE,
    [subtotal, gstAmount]
  );

  const selectedAddress = addresses?.find(
    (addr) => addr._id === selectedAddressId
  );

  const handleCloseNotification = () =>
    setNotification({ ...notification, open: false });
  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
    setIsAddressModalOpen(false);
  };
  const handleRemoveFromCart = (cartItemId) =>
    dispatch(removeFromCart(cartItemId));
  const handleQuantityChange = (id, qty) => {
    if (qty > 0) dispatch(updateCartQuantity({ productId: id, quantity: qty }));
  };

  const handleProceedToPayment = () => {
    if (!selectedAddressId) {
      setNotification({
        open: true,
        msg: "Please select a shipping address first.",
        severity: "warning",
      });
      return;
    }
    if (invalidCartItems.length > 0) {
      setNotification({
        open: true,
        msg: "Please remove unavailable items to proceed.",
        severity: "warning",
      });
      return;
    }
    // Pass totalAmount in the payload
    dispatch(
      createRazorpayOrder({ addressId: selectedAddressId, amount: totalAmount })
    );
  };

  useEffect(() => {
    if (razorpayOrder) {
      const displayPaymentModal = async () => {
        const res = await loadRazorpayScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
          setNotification({
            open: true,
            msg: "Razorpay SDK failed to load. Are you online?",
            severity: "error",
          });
          return;
        }

        const currentSelectedAddress = addresses?.find(
          (addr) => addr._id === razorpayOrder.addressId
        );

        const options = {
          key: razorpayOrder.key,
          amount: razorpayOrder.amount, // Amount from backend
          currency: razorpayOrder.currency,
          name: "Naraaglobal store",
          description: "Payment for your order",
          order_id: razorpayOrder.orderId,
          handler: function (response) {
            dispatch(
              verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                addressId: razorpayOrder.addressId,
              })
            );
          },
          prefill: {
            name: user?.fullName || "Guest User",
            email: user?.email || "",
            contact: currentSelectedAddress?.phone || "",
          },
          theme: { color: "#3399cc" },
        };

        try {
          const paymentObject = new window.Razorpay(options);
          paymentObject.on("payment.failed", (response) => {
            setNotification({
              open: true,
              msg: `Payment failed: ${response.error.description}`,
              severity: "error",
            });
            dispatch(resetPaymentStatus());
          });
          paymentObject.open();
        } catch (error) {
          setNotification({
            open: true,
            msg: `Razorpay initialization failed: ${error.message}`,
            severity: "error",
          });
        }
      };

      displayPaymentModal();
    }
  }, [razorpayOrder, dispatch, user, addresses]);

  useEffect(() => {
    if (finalOrder) {
      dispatch(clearCart());
      let notificationMsg = "Payment successful! Order confirmed.";
      let notificationSeverity = "success";

      if (finalOrder.shipmentDetails?.error) {
        notificationMsg = `Payment successful, but shipment creation failed: ${finalOrder.shipmentDetails.error}. We'll process it soon.`;
        notificationSeverity = "warning";
      } else if (finalOrder.order.orderStatus === "Shipped") {
        notificationMsg = "Payment successful! Order confirmed and shipped.";
      }

      setNotification({
        open: true,
        msg: notificationMsg,
        severity: notificationSeverity,
      });
      navigate(`/order-confirmation/${finalOrder.order._id}`);
    }
  }, [finalOrder, navigate, dispatch]);

  useEffect(() => {
    return () => dispatch(resetPaymentStatus());
  }, [dispatch]);

  const getNotificationColor = (severity) => {
    const colors = {
      error: "#f44336",
      warning: "#ff9800",
      success: "#4caf50",
      info: "#2196f3",
    };
    return colors[severity] || colors.info;
  };

  return (
    <div className={classes.pageContainer}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
        Your Shopping Cart
      </Typography>

      {invalidCartItems.length > 0 && (
        <Paper className={classes.invalidItemRow}>
          <ErrorOutlineIcon style={{ color: "#f57c00" }} />
          <Typography className={classes.invalidItemText}>
            Some items in your cart are no longer available. Please remove them
            to proceed.
          </Typography>
        </Paper>
      )}

      {!cart || cart.length === 0 ? (
        <Paper style={{ textAlign: "center", padding: "4rem" }}>
          <Typography variant="h6">Your cart is empty.</Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} style={{ padding: "1rem 2rem" }}>
              {validCartItems.map(({ _id, product, quantity }, index) => (
                <React.Fragment key={_id}>
                  <div className={classes.cartItemRow}>
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className={classes.itemImage}
                    />
                    <Box flexGrow={1}>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Price: ₹{product.price.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box className={classes.quantitySelector}>
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(product._id, quantity - 1)
                        }
                        disabled={quantity <= 1}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography style={{ margin: "0 1rem" }}>
                        {quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(product._id, quantity + 1)
                        }
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box textAlign="right" width={120} ml={3}>
                      <Typography variant="h6">
                        ₹{(product.price * quantity).toLocaleString()}
                      </Typography>
                    </Box>
                    <IconButton onClick={() => handleRemoveFromCart(_id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  {index < validCartItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
              {invalidCartItems.map((item, index) => (
                <React.Fragment key={item._id || index}>
                  <div className={classes.cartItemRow} style={{ opacity: 0.6 }}>
                    <Box
                      className={classes.itemImage}
                      style={{
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography color="textSecondary">N/A</Typography>
                    </Box>
                    <Box flexGrow={1}>
                      <Typography variant="h6" color="textSecondary">
                        Unavailable Product
                      </Typography>
                      <Typography variant="body2" color="error">
                        This item has been removed.
                      </Typography>
                    </Box>
                    <Tooltip title="Remove from cart">
                      <IconButton
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </div>
                  {index < invalidCartItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.sidebarCard}>
              <Card style={{ marginBottom: "2rem" }}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6" gutterBottom>
                      Shipping To
                    </Typography>
                    <Button
                      color="primary"
                      onClick={() => setIsAddressModalOpen(true)}
                    >
                      Change
                    </Button>
                  </Box>
                  <Divider style={{ margin: "0.5rem 0" }} />
                  {selectedAddress ? (
                    <Box mt={1.5}>
                      <Typography variant="body1" style={{ fontWeight: 500 }}>
                        {selectedAddress.fullName || "No Name Provided"}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >{`${selectedAddress.street || ""}, ${selectedAddress.city || ""}, ${
                        selectedAddress.state || ""
                      } - ${selectedAddress.postalCode || ""}`}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Phone: {selectedAddress.phone || "No Phone Provided"}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ marginTop: "1rem" }}
                    >
                      Please select a shipping address.
                    </Typography>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Order Summary
                  </Typography>
                  <Divider style={{ margin: "1rem 0" }} />

                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography color="textSecondary">Subtotal</Typography>
                    <Typography>₹{subtotal.toLocaleString()}</Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography color="textSecondary">GST (5%)</Typography>
                    <Typography>
                      ₹
                      {gstAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography color="textSecondary">
                      Delivery Charge
                    </Typography>
                    <Typography>₹{DELIVERY_CHARGE.toLocaleString()}</Typography>
                  </Box>

                  <Divider style={{ margin: "1rem 0" }} />

                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="h6">Total Amount</Typography>
                    <Typography variant="h6">
                      ₹
                      {totalAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={
                      !selectedAddressId ||
                      isPaymentProcessing ||
                      invalidCartItems.length > 0
                    }
                    style={{ padding: "0.75rem 0" }}
                    onClick={handleProceedToPayment}
                  >
                    {isPaymentProcessing ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      `Proceed to Pay ₹${totalAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    )}
                  </Button>
                  {invalidCartItems.length > 0 && (
                    <Typography
                      variant="caption"
                      color="error"
                      align="center"
                      display="block"
                      style={{ marginTop: "8px" }}
                    >
                      Please remove unavailable items to continue.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </div>
          </Grid>
        </Grid>
      )}

      <Modal
        open={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        className={classes.modal}
      >
        <div className={classes.modalPaper}>
          <Typography variant="h5" gutterBottom>
            Select a Shipping Address
          </Typography>
          <Divider style={{ marginBottom: "1rem" }} />
          {addresses && addresses.length > 0 ? (
            addresses.map((address) => (
              <Card
                key={address._id}
                onClick={() => handleSelectAddress(address._id)}
                className={`${classes.addressCardSelectable} ${
                  selectedAddressId === address._id
                    ? classes.selectedAddress
                    : ""
                }`}
              >
                <Typography variant="body1" style={{ fontWeight: 500 }}>
                  {address.fullName || "No Name Provided"}
                </Typography>
                <Typography variant="body2">{`${address.street || ""}, ${
                  address.city || ""
                }, ${address.postalCode || ""}`}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Phone: {address.phone || "No Phone Provided"}
                </Typography>
              </Card>
            ))
          ) : (
            <Typography>No addresses found.</Typography>
          )}
          <Button
            component={Link}
            to="/user/address"
            variant="outlined"
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            Add New Address
          </Button>
        </div>
      </Modal>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Paper
          elevation={6}
          className={classes.notification}
          style={{
            backgroundColor: getNotificationColor(notification.severity),
          }}
        >
          <Typography variant="subtitle1">{notification.msg}</Typography>
        </Paper>
      </Snackbar>
    </div>
  );
};
export default CartPage;
