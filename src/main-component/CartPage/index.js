import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Modal,
  Snackbar, // Snackbar rahega
  makeStyles,
} from "@material-ui/core";
// --- REMOVED: MuiAlert import hata diya gaya hai ---
// import MuiAlert from '@material-ui/lab/Alert';
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { unwrapResult } from "@reduxjs/toolkit";

import {
  getCart,
  getAddresses,
  removeFromCart,
  updateCartQuantity,
  createOrder,
  resetUserStatus,
} from "../../features/user/userSlice";

// --- REMOVED: Alert helper function hata diya gaya hai ---

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
  // --- ADDED: Notification ke liye style ---
  notification: {
    padding: theme.spacing(1.5, 3),
    color: "white",
    borderRadius: theme.shape.borderRadius,
  },
}));

const CartPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, addresses, status, message } = useSelector(
    (state) => state.user
  );
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    msg: "",
    severity: "info",
  });

  const isPlacingOrder = status === "loading" && !message;

  useEffect(() => {
    dispatch(resetUserStatus());
    dispatch(getCart());
    dispatch(getAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      setSelectedAddressId(
        defaultAddress ? defaultAddress._id : addresses[0]._id
      );
    }
  }, [addresses]);

  useEffect(() => {
    if (status === "failed" && message) {
      setNotification({ open: true, msg: message, severity: "error" });
    }
  }, [status, message]);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      setNotification({
        open: true,
        msg: "Please select a shipping address.",
        severity: "warning",
      });
      return;
    }

    try {
      const resultAction = await dispatch(
        createOrder({ addressId: selectedAddressId })
      );
      const newOrder = unwrapResult(resultAction);

      navigate(`/order-success/${newOrder._id}`);
    } catch (err) {
      console.error("Failed to place order:", err);
    }
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setNotification({ ...notification, open: false });
    dispatch(resetUserStatus());
  };

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
    setIsAddressModalOpen(false);
  };
  const handleRemoveFromCart = (productId) =>
    dispatch(removeFromCart(productId));
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0)
      dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
  };

  const subtotal = (cart || []).reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const selectedAddress = addresses?.find(
    (addr) => addr._id === selectedAddressId
  );

  if (status === "loading" && !cart.length && !message) {
    return (
      <Box textAlign="center" my={10}>
        <CircularProgress />
      </Box>
    );
  }

  // --- ADDED: Notification ka color set karne ke liye helper function ---
  const getNotificationColor = (severity) => {
    if (severity === "error") return "#f44336"; // Red
    if (severity === "warning") return "#ff9800"; // Orange
    return "#2196f3"; // Blue for info
  };

  return (
    <div className={classes.pageContainer}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
        Your Shopping Cart
      </Typography>

      {!cart || cart.length === 0 ? (
        <Paper style={{ textAlign: "center", padding: "4rem" }}>
          <Typography variant="h6">Your cart is empty.</Typography>
          <Button
            component={Link}
            to="/shop"
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
              {cart.map(({ product, quantity }, index) => (
                <React.Fragment key={product._id}>
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
                    <IconButton
                      onClick={() => handleRemoveFromCart(product._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  {index < cart.length - 1 && <Divider />}
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
                        {selectedAddress.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {`${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.postalCode}`}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Phone: {selectedAddress.phone}
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
                    <Typography>Subtotal</Typography>
                    <Typography>₹{subtotal.toLocaleString()}</Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ textAlign: "right", marginBottom: "1rem" }}
                  >
                    Shipping and taxes calculated at checkout.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!selectedAddressId || isPlacingOrder}
                    style={{ padding: "0.75rem 0" }}
                    onClick={handlePlaceOrder}
                  >
                    {isPlacingOrder ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Place Order Now"
                    )}
                  </Button>
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
          <Divider />
          <Box mt={2} style={{ maxHeight: "60vh", overflowY: "auto" }}>
            {(addresses || []).map((addr) => (
              <Paper
                key={addr._id}
                variant="outlined"
                onClick={() => handleSelectAddress(addr._id)}
                className={`${classes.addressCardSelectable} ${selectedAddressId === addr._id ? classes.selectedAddress : ""}`}
              >
                <Typography variant="body1" style={{ fontWeight: 500 }}>
                  {addr.name} ({addr.type})
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >{`${addr.street}, ${addr.city}, ${addr.state} - ${addr.postalCode}`}</Typography>
              </Paper>
            ))}
          </Box>
          <Button
            component={Link}
            to="/user/address"
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            style={{ marginTop: "1rem" }}
          >
            Add a New Address
          </Button>
        </div>
      </Modal>

      {/* --- MODIFIED: Snackbar ab Paper component ka use kar raha hai --- */}
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
