import React, { useState, useEffect, useRef } from "react";

// Images ko import karein
import popupImage from "../images/slider/img-15.jpg";

// --- Color Palette ---
const colors = {
  primaryButton: "#878fba",
  primaryButtonHover: "#6c749d",
  textDark: "#3d2b56",
  textLight: "#ffffff",
  backgroundOverlay: "rgba(0, 0, 0, 0.6)",
  popupBackground: "#ffffff",
  inputBackground: "#f4f4f8",
  inputBorder: "#e0c3fc",
};

// --- Styles ---
const styles = {
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: colors.backgroundOverlay,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.4s ease, visibility 0.4s ease",
  },
  popupOverlayVisible: {
    opacity: 1,
    visibility: "visible",
  },
  popupContainer: {
    background: colors.popupBackground,
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
    display: "flex",
    maxWidth: "800px",
    width: "90%",
    position: "relative",
    overflow: "hidden",
    transform: "scale(0.9)",
    transition: "transform 0.4s ease",
  },
  popupContainerVisible: {
    transform: "scale(1)",
  },
  popupImageSection: {
    flex: 1,
    background: `url(${popupImage}) no-repeat center center/cover`,
    minWidth: "300px",
  },
  popupContentSection: {
    flex: 1.2,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "transparent",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: colors.textDark,
    lineHeight: 1,
  },
  title: {
    fontWeight: 900,
    fontSize: "36px",
    color: colors.textDark,
    lineHeight: 1.2,
    textTransform: "uppercase",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: colors.primaryButton,
    marginBottom: "20px",
  },
  description: {
    fontSize: "16px",
    color: colors.textDark,
    marginBottom: "25px",
  },
  emailInput: {
    width: "100%",
    padding: "15px",
    border: `2px solid ${colors.inputBorder}`,
    borderRadius: "10px",
    fontSize: "16px",
    marginBottom: "15px",
    backgroundColor: colors.inputBackground,
    outline: "none",
    textAlign: "center",
  },
  claimButton: {
    backgroundColor: colors.primaryButton,
    color: colors.textLight,
    padding: "15px 40px",
    border: "none",
    borderRadius: "10px",
    textDecoration: "none",
    transition: "all 0.3s ease",
    fontSize: "18px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  noThanks: {
    marginTop: "15px",
    background: "none",
    border: "none",
    color: colors.textDark,
    cursor: "pointer",
    textDecoration: "underline",
  },
};

const DiscountPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Agar offer claim ho chuka hai, to kuch na karein
    const offerClaimed = sessionStorage.getItem("offerClaimed");
    if (offerClaimed) {
      return;
    }

    // Shuru me 3 second baad popup dikhayein
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Har 1 minute (60000 ms) me popup dikhane ke liye interval set karein
    intervalRef.current = setInterval(() => {
      setIsVisible(true);
    }, 60000);

    // Cleanup function: Jab component unmount ho to timers ko clear karein
    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalRef.current);
    };
  }, []); // Khali dependency array, taaki ye sirf ek baar chale

  // **FIX: Popup ko sirf chhipane ke liye function**
  const handleCloseTemporarily = () => {
    setIsVisible(false);
    // Yahan interval ko clear nahi karenge, taaki wo chalta rahe
  };

  // **FIX: Offer claim karne par hamesha ke liye band karne ka function**
  const handleClaimOffer = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing! Your discount code has been sent.");

    // Ab popup ko hamesha ke liye band karein
    setIsVisible(false);
    sessionStorage.setItem("offerClaimed", "true");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const overlayStyle = isVisible
    ? { ...styles.popupOverlay, ...styles.popupOverlayVisible }
    : styles.popupOverlay;

  const containerStyle = isVisible
    ? { ...styles.popupContainer, ...styles.popupContainerVisible }
    : styles.popupContainer;

  return (
    <div style={overlayStyle}>
      <div style={containerStyle}>
        <div style={styles.popupImageSection}></div>
        <div style={styles.popupContentSection}>
          {/* FIX: Ye button ab temporary close karega */}
          <button onClick={handleCloseTemporarily} style={styles.closeButton}>
            ×
          </button>

          <h2 style={styles.title}>Wait! Don't Go!</h2>
          <p style={styles.subtitle}>Get 33% Off Your First Order</p>
          <p style={styles.description}>
            Join our family and get exclusive access to new products, special
            offers, and health tips.
          </p>

          <form onSubmit={handleClaimOffer}>
            <input
              type="email"
              placeholder="Enter your email address"
              required
              style={styles.emailInput}
            />
            <button type="submit" style={styles.claimButton}>
              Claim My 15% Off
            </button>
          </form>

          {/* FIX: Ye button bhi ab temporary close karega */}
          <button onClick={handleCloseTemporarily} style={styles.noThanks}>
            No, I'll pay full price
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountPopup;
