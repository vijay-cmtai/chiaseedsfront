// src/components/Service.js (Corrected Code)

import React, { useState } from "react";

// --- Consistent Color Palette ---
const colors = {
  primary: "#878fba",
  textDark: "#3d2b56",
  textMuted: "#5a506b",
  textLight: "#ffffff",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

// --- Style Objects ---
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
  // Font Awesome 4 aur 5, dono ke liye compatible icon class names
  const services = [
    {
      icon: "fa fa-truck", // Yeh dono versions me kaam karta hai
      title: "Free Shipping",
      subtitle: "Order Over ₹560", // Dollar ko Rupee se badal diya gaya hai
    },
    {
      icon: "fa fa-shield", // 'fa-shield-alt' ke bajaye 'fa-shield' use karein
      title: "Easy Payment",
      subtitle: "100% Secure Payment",
    },
    {
      icon: "fa fa-headphones", // 'fa-headset' ke bajaye 'fa-headphones' use karein
      title: "24/7 Support",
      subtitle: "Any time Support",
    },
  ];
  // =======================================================

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={styles.serviceArea}>
      <div className="container">
        <div className="row">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const itemStyle = isHovered
              ? { ...styles.serviceItemBase, ...styles.serviceItemHover }
              : styles.serviceItemBase;

            return (
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
