import React, { useState, useEffect, useRef } from "react";

// Images ko import karein
// !! Yakeen kar lein ki ye image path aapke project structure ke hisaab se sahi hai !!
import popupImage from "../images/slider/img-15.jpg";

// --- Color Palette ---
const colors = {
  // ... (colors object waisa hi rahega)
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
  // ... (styles object waisa hi rahega)
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
  // ==================== YAHAN BADLAV KIYA GAYA HAI ====================
  // Testing ke liye, state ko shuru me 'true' set karein taaki popup turant dikhe.
  const [isVisible, setIsVisible] = useState(true);
  // ===================================================================

  const intervalRef = useRef(null);

  // Ye useEffect popup ko dikhane ke liye hai
  useEffect(() => {
    // Agar testing ke liye state pehle se hi true hai, to ye logic abhi nahi chalega
    if (isVisible) return;

    const offerClaimed = sessionStorage.getItem("offerClaimed");
    if (offerClaimed) {
      return;
    }

    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    intervalRef.current = setInterval(() => {
      setIsVisible(true);
    }, 60000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalRef.current);
    };
  }, []);

  // Ye naya useEffect popup ko 5 second baad apne aap hatane ke liye hai
  useEffect(() => {
    if (isVisible) {
      const autoCloseTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => {
        clearTimeout(autoCloseTimer);
      };
    }
  }, [isVisible]);

  const handleCloseTemporarily = () => {
    setIsVisible(false);
  };

  const handleClaimOffer = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing! Your discount code has been sent.");
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

  // Agar popup visible nahi hai to kuch bhi render na karein
  if (!isVisible && !overlayStyle.visibility) {
    return null;
  }

  return (
    <div style={overlayStyle}>
      <div style={containerStyle}>
        <div style={styles.popupImageSection}></div>
        <div style={styles.popupContentSection}>
          <button onClick={handleCloseTemporarily} style={styles.closeButton}>
            ×
          </button>
          <h2 style={styles.title}>Wait! Don't Go!</h2>
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
            {/* Submit button ko form ke andar rakhna behtar practice hai */}
            <button
              type="submit"
              style={{
                ...styles.claimButton,
                backgroundColor: colors.primaryButton,
                color: colors.textLight,
              }}
            >
              Claim My Discount
            </button>
          </form>
          <button onClick={handleCloseTemporarily} style={styles.noThanks}>
            No, I'll pay full price
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountPopup;
