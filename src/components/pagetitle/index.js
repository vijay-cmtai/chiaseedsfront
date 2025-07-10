import React from "react";
// Default background image
import defaultBg from "../../images/blog/contact.jpg";

// --- Color Palette ---
const colors = {
  primaryButton: "#878fba",
  textDark: "#3d2b56",
  textLight: "#ffffff",
  // === OVERLAY HALKA KIYA GAYA HAI ===
  // Gradient colors ki opacity 85% se 60% kar di gayi hai
  gradientStart: "rgba(253, 231, 201, 0.60)", // 60% opacity
  gradientEnd: "rgba(224, 195, 252, 0.60)", // 60% opacity
};

// --- Styles ---
const styles = {
  pageTitleArea: {
    padding: "120px 0 100px",
    textAlign: "center",
    position: "relative",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
  },
  title: {
    fontSize: "52px",
    fontWeight: 900,
    color: colors.textLight,
    margin: "0 0 15px 0",
    textTransform: "capitalize",
    textShadow: "1px 1px 4px rgba(0, 0, 0, 0.5)", // Shadow thodi gehri kar di hai for better contrast
  },
  breadcrumbList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    fontSize: "16px",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",
  },
  breadcrumbLink: {
    color: colors.textLight,
    textDecoration: "none",
    fontWeight: "500",
    transition: "opacity 0.3s ease",
  },
  breadcrumbSeparator: {
    color: colors.textLight,
    opacity: 0.8,
  },
  breadcrumbActive: {
    color: colors.textLight,
    fontWeight: "bold",
  },
};

const PageTitle = (props) => {
  const backgroundImage = props.PageImage || defaultBg;

  const dynamicBackgroundStyle = {
    ...styles.pageTitleArea,
    backgroundImage: `linear-gradient(to right, ${colors.gradientStart}, ${colors.gradientEnd}), url(${backgroundImage})`,
  };

  return (
    <div style={dynamicBackgroundStyle}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div>
              <h2 style={styles.title}>{props.pageTitle}</h2>
              <ul style={styles.breadcrumbList}></ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
