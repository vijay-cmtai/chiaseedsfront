// src/components/Service.js (Updated Code)

import React, { useState } from "react";

// --- Colors and Styles (Koi badlav nahi) ---
const colors = {
  primary: "#878fba",
  textDark: "#3d2b56",
  textMuted: "#5a506b",
  textLight: "#ffffff",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

const styles = {
  serviceArea: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    padding: "80px 0",
  },
  serviceItemBase: {
    display: "flex",
    alignItems: "center",
    padding: "25px",
    background: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    cursor: "pointer",
    height: "100%", // Sabhi items ki height barabar rakhne ke liye
  },
  serviceItemHover: {
    transform: "translateY(-8px)",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)",
    background: "rgba(255, 255, 255, 0.7)",
  },
  iconWrapper: {
    width: "70px",
    height: "70px",
    minWidth: "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.textLight,
    borderRadius: "50%",
    marginRight: "20px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
  },
  iconFont: {
    fontSize: "30px",
    color: colors.primary,
  },
  textTitle: {
    color: colors.textDark,
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 4px 0",
  },
  textSubtitle: {
    color: colors.textMuted,
    fontSize: "15px",
  },
};

const Service = () => {
  // ===================== FIX IS HERE =====================
  const services = [
    {
      icon: "fas fa-shield-alt", // "fa fa-shield" ke bajaye "fas fa-shield-alt"
      title: "Easy Payment",
      subtitle: "100% Secure Payment",
    },
    {
      icon: "fas fa-headset", // "fa fa-headphones" ke bajaye "fas fa-headset"
      title: "24/7 Support",
      subtitle: "Any time Support",
    },
  ];
  // =======================================================

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={styles.serviceArea}>
      <div className="container">
        {/* Row me items ko center align karne ke liye justify-content-center class add ki */}
        <div className="row justify-content-center">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const itemStyle = isHovered
              ? { ...styles.serviceItemBase, ...styles.serviceItemHover }
              : styles.serviceItemBase;

            return (
              // col-lg-4 3 items ke liye bilkul sahi hai
              <div
                className="col-lg-4 col-md-6 col-sm-12 col-12 mb-4"
                key={index}
              >
                <div
                  style={itemStyle}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div style={styles.iconWrapper}>
                    <i className={service.icon} style={styles.iconFont}></i>
                  </div>
                  <div className="service-icon-text">
                    <h2 style={styles.textTitle}>{service.title}</h2>
                    <span style={styles.textSubtitle}>{service.subtitle}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Service;
