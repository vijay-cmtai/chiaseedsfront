import React, { useState, useEffect, useRef } from "react";

// Images ko import karein
// !! Yakeen kar lein ki ye image path aapke project structure ke hisaab se sahi hai !!
import popupImage from "../images/slider/img-15.jpg";

// --- Color Palette --- (Koi badlav nahi)
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

// --- Styles (Desktop-first approach) ---
// Ye humare base styles hain, jo badi screens par kaam karenge.
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
    transition: "transform 0.4s ease, flex-direction 0s", // flex-direction transition ko roka
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
    zIndex: 10, // Ensure button is on top
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
    boxSizing: "border-box", // padding ko width me include karne ke liye
  },
  claimButton: {
    // Ye style object missing tha, isko add kiya gaya
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
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
  const [isVisible, setIsVisible] = useState(true); // Testing ke liye true

  // ==================== RESPONSIVE BANANE KE LIYE NAYA BADLAV ====================
  // Ek state banayi jo screen ki width track karegi. 768px ko breakpoint maana hai.
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Ye useEffect screen resize hone par 'isMobile' state ko update karega.
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // Component unmount hone par event listener ko hatana zaroori hai (memory leak se bachne ke liye)
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // [] ka matlab ye sirf component ke mount aur unmount hone par chalega.
  // =================================================================================

  const intervalRef = useRef(null);

  // Popup ko dikhane aur hatane wala logic (koi badlav nahi)
  useEffect(() => {
    if (isVisible) {
      const autoCloseTimer = setTimeout(() => {
        //setIsVisible(false); // Testing ke liye isse comment kar diya taaki popup na hate
      }, 5000);

      return () => clearTimeout(autoCloseTimer);
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

  // ==================== CONDITIONAL STYLES ====================
  // Yahan hum 'isMobile' state ke आधार par styles ko merge kar rahe hain.

  const overlayStyle = isVisible
    ? { ...styles.popupOverlay, ...styles.popupOverlayVisible }
    : styles.popupOverlay;

  // Mobile ke liye alag styles
  const mobileContainerStyle = {
    flexDirection: "column", // Sabse zaroori badlav: layout ko vertical kiya
    width: "95%",
    maxHeight: "90vh", // Taaki choti screens par poori height na le
    overflowY: "auto", // Agar content zyada ho to scroll ho sake
  };

  const mobileImageStyle = {
    minHeight: "200px", // Image ke liye ek fixed height
    minWidth: "100%", // Width ko 100% kiya
    flex: "none", // Flex property ko reset kiya
  };

  const mobileContentStyle = {
    padding: "30px 25px", // Padding kam ki
  };

  const mobileTitleStyle = {
    fontSize: "28px", // Title ka font size chota kiya
  };

  const mobileCloseButtonStyle = {
    color: colors.textLight, // Image ke upar dikhne ke liye button ka rang safed kiya
    textShadow: "0 1px 3px rgba(0,0,0,0.5)", // Thodi shadow taaki saaf dikhe
  };

  // Final styles ko merge karna
  const containerStyle = {
    ...styles.popupContainer,
    ...(isMobile && mobileContainerStyle), // Agar mobile hai to mobile styles apply karo
    ...(isVisible && styles.popupContainerVisible),
  };

  const imageSectionStyle = {
    ...styles.popupImageSection,
    ...(isMobile && mobileImageStyle),
  };

  const contentSectionStyle = {
    ...styles.popupContentSection,
    ...(isMobile && mobileContentStyle),
  };

  const titleStyle = {
    ...styles.title,
    ...(isMobile && mobileTitleStyle),
  };

  const closeButtonStyle = {
    ...styles.closeButton,
    ...(isMobile && mobileCloseButtonStyle),
  };

  // =================================================================

  if (!isVisible && !overlayStyle.visibility) {
    return null;
  }

  return (
    <div style={overlayStyle}>
      <div style={containerStyle}>
        {/* Agar mobile nahi hai tabhi image dikhao (optional, par performance ke liye accha) */}
        {!isMobile && <div style={imageSectionStyle}></div>}

        {/* Mobile par image ko content ke andar le aaye taaki order sahi rahe */}
        {isMobile && (
          <div style={imageSectionStyle}>
            <button onClick={handleCloseTemporarily} style={closeButtonStyle}>
              ×
            </button>
          </div>
        )}

        <div style={contentSectionStyle}>
          {/* Desktop par close button yahan rahega */}
          {!isMobile && (
            <button onClick={handleCloseTemporarily} style={closeButtonStyle}>
              ×
            </button>
          )}

          <h2 style={titleStyle}>Wait! Don't Go!</h2>
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
