// src/pages/paymentpage.js (FINAL CORRECTED CODE)

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux Slices से imports
import {
  createRazorpayOrder,
  verifyPayment,
  resetPaymentStatus,
} from "../features/payment/paymentSlice";
import { clearCart } from "../features/user/userSlice";

const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Inline CSS Objects for styling without Material-UI
const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "0 20px",
    fontFamily: "Arial, sans-serif",
  },
  paper: {
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    borderRadius: "8px",
  },
  loadingBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    textAlign: "center",
  },
  alert: {
    width: "calc(100% - 32px)",
    padding: "16px",
    margin: "16px 0",
    border: "1px solid #f44336",
    backgroundColor: "#fef2f2",
    color: "#b91c1c",
    borderRadius: "4px",
  },
  list: {
    width: "100%",
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
  },
  divider: {
    border: 0,
    height: "1px",
    backgroundColor: "#e0e0e0",
    margin: "8px 0",
  },
};

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderCreationStarted, setOrderCreationStarted] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { cart, addresses } = useSelector((state) => state.user);
  const { status, message, razorpayOrder, finalOrder } = useSelector(
    (state) => state.payment
  );

  const shippingAddress =
    addresses?.find((addr) => addr.isDefault) || addresses?.[0];

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
    0
  );

  useEffect(() => {
    if (orderCreationStarted) return;

    if (cart.length === 0) {
      navigate("/cart");
      return;
    }
    if (!shippingAddress) {
      alert("Please select a shipping address first.");
      navigate("/cart");
      return;
    }

    if (subtotal > 0) {
      setOrderCreationStarted(true);
      const orderDataForBackend = {
        cartItems: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress: shippingAddress._id, // <<<--- THIS IS THE FIX
        totalPrice: subtotal,
        paymentMethod: "RAZORPAY",
      };
      // ======================================================================

      console.log(
        "SENDING THIS DATA TO BACKEND (Corrected):",
        orderDataForBackend
      );
      dispatch(createRazorpayOrder(orderDataForBackend));
    }
  }, [
    dispatch,
    navigate,
    cart,
    subtotal,
    shippingAddress,
    orderCreationStarted,
  ]);

  useEffect(() => {
    if (razorpayOrder) {
      const displayPaymentModal = async () => {
        const res = await loadRazorpayScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "Chia Seeds Store",
          description: "Test Transaction",
          order_id: razorpayOrder.id,
          handler: function (response) {
            dispatch(
              verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            );
          },
          prefill: {
            name: user?.name || "Guest User",
            email: user?.email || "",
            contact: shippingAddress?.phone || "",
          },
          notes: {
            address: `${shippingAddress?.street}, ${shippingAddress?.city}`,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on("payment.failed", function (response) {
          alert(`Payment failed: ${response.error.description}`);
          setOrderCreationStarted(false); // User को दोबारा try करने का मौका दें
          navigate("/cart");
        });
        paymentObject.open();
      };

      displayPaymentModal();
    }
  }, [razorpayOrder, dispatch, user, shippingAddress, navigate]);

  useEffect(() => {
    if (finalOrder) {
      dispatch(clearCart());
      navigate(`/order-confirmation/${finalOrder._id}`);
    }
  }, [finalOrder, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetPaymentStatus());
    };
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div style={styles.loadingBox}>
        <p style={{ fontSize: "1.2rem" }}>Loading...</p>
        <h6 style={{ marginTop: "1rem", fontWeight: "normal" }}>
          Creating your secure payment session...
        </h6>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.paper}>
        <h1 style={{ marginBottom: "16px" }}>Finalizing Your Order</h1>

        {status === "failed" && (
          <div style={styles.alert}>
            <p>
              <strong>Payment Error:</strong> {message}
            </p>
            <p>Please check your details and try again from the cart.</p>
          </div>
        )}

        <h6 style={{ margin: "16px 0" }}>Order Summary</h6>
        <ul style={styles.list}>
          {cart.map((item) => (
            <li key={item.product?._id} style={styles.listItem}>
              <div>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  {item.product?.name}
                </p>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "grey" }}>
                  Quantity: {item.quantity}
                </p>
              </div>
              <p style={{ margin: 0 }}>
                ₹
                {(
                  (item.product?.price || 0) * (item.quantity || 0)
                ).toLocaleString()}
              </p>
            </li>
          ))}
          <hr style={styles.divider} />
          <li style={styles.listItem}>
            <p style={{ margin: 0 }}>Subtotal</p>
            <p style={{ margin: 0, fontWeight: "bold" }}>
              ₹{subtotal.toLocaleString()}
            </p>
          </li>
        </ul>

        {shippingAddress && (
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <h6 style={{ marginBottom: "8px" }}>Shipping To</h6>
            <p style={{ margin: 0, fontWeight: "bold" }}>
              {shippingAddress.name}
            </p>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "grey" }}>
              {`${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.postalCode}`}
            </p>
          </div>
        )}

        <p style={{ marginTop: "32px", fontSize: "0.9rem", color: "grey" }}>
          If the payment window does not open automatically, please check your
          internet connection and refresh the page.
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;
