import React, { useState } from "react";

// ===================== FIX 1: पहला आइकॉन बदला गया =====================
// "Brain Health" ke liye ek naya, aasan aur kaam karne wala icon
const benefitsList = [
  {
    icon: "https://api.iconify.design/ph/brain.svg?color=%23878fba", // NEW WORKING ICON
    title: "Supports Brain Health",
    text: "Rich in natural compounds that aid cognitive function and mental clarity.",
  },
  {
    icon: "https://api.iconify.design/ph/leaf.svg?color=%23878fba",
    title: "High in Fiber",
    text: "A natural source of dietary fiber that supports a healthy digestive system.",
  },
  {
    icon: "https://api.iconify.design/material-symbols/shield-outline.svg?color=%23878fba",
    title: "Packed with Antioxidants",
    text: "Helps protect your body from cell damage caused by free radicals.",
  },
  {
    icon: "https://api.iconify.design/mdi/bone.svg?color=%23878fba",
    title: "Source of Calcium",
    text: "Contains essential minerals that are crucial for maintaining strong bones.",
  },
];
// =========================================================================

const colors = {
  primary: "#878fba",
  textDark: "#3d2b56",
  textMuted: "#6c757d",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

const sectionStyle = {
  background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
  padding: "80px 0",
};

const sectionTitleStyle = {
  textAlign: "center",
  marginBottom: "20px",
};

const h2Style = {
  fontSize: "40px",
  fontWeight: "700",
  marginBottom: "15px",
  color: colors.textDark,
};

const spanStyle = {
  color: colors.primary,
};

const sectionParagraphStyle = {
  color: colors.textMuted,
  fontSize: "18px",
  lineHeight: 1.7,
};

const benefitItemBaseStyle = {
  textAlign: "center",
  padding: "30px 20px",
  marginBottom: "30px",
  borderRadius: "15px",
  transition: "all 0.3s ease-in-out",
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
};

const benefitItemHoverStyle = {
  transform: "translateY(-10px)",
  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)",
};

const benefitIconStyle = {
  width: "48px",
  height: "48px",
  marginBottom: "25px",
  display: "inline-block",
};

// ===================== FIX 2: आइकॉन का साइज़ ठीक किया गया =====================
// img tag ke liye ek naya style object banaya gaya hai
const imgStyle = {
  width: "100%",
  height: "100%",
};
// =========================================================================

const benefitTitleStyle = {
  fontSize: "22px",
  fontWeight: "600",
  marginBottom: "12px",
  color: colors.textDark,
};

const benefitTextStyle = {
  fontSize: "16px",
  lineHeight: 1.6,
  color: colors.textMuted,
};

const HealthBenefits = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="health-benefits-area" style={sectionStyle}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div style={sectionTitleStyle}>
              <h2 style={h2Style}>
                Full Body <span style={spanStyle}>Health Benefits</span>
              </h2>
              <p style={sectionParagraphStyle}>
                Our 100% fresh chia seeds are more than a healthy choice. They
                are a powerhouse of natural goodness designed to nourish your
                body from the inside out.
              </p>
            </div>
          </div>
        </div>

        <div className="benefits-wrap pt-4">
          <div className="row">
            {benefitsList.map((benefit, index) => {
              const currentItemStyle =
                hoveredIndex === index
                  ? { ...benefitItemBaseStyle, ...benefitItemHoverStyle }
                  : benefitItemBaseStyle;

              return (
                <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={index}>
                  <div
                    style={currentItemStyle}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div style={benefitIconStyle}>
                      {/* img tag par naya style (imgStyle) lagaya gaya hai */}
                      <img
                        src={benefit.icon}
                        alt={benefit.title}
                        style={imgStyle}
                      />
                    </div>
                    <div>
                      <h3 style={benefitTitleStyle}>{benefit.title}</h3>
                      <p style={benefitTextStyle}>{benefit.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthBenefits;
