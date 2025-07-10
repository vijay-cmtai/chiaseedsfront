import React, { useState } from "react";
import qualityImg from "../../images/product/p1.jpg";
import nutritionImg from "../../images/product/p2.jpg";
import omegaImg from "../../images/product/p3.jpg";
import purityImg from "../../images/product/p5.jpg";
import ecoImg from "../../images/product/5.jpg";

// --- Consistent Color Palette ---
const colors = {
  primary: "#878fba",
  textDark: "#3d2b56",
  textMuted: "#5a506b",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
  textLight: "#ffffff",
};

// --- Styles ---
const styles = {
  section: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    padding: "80px 0",
  },
  titleWrapper: {
    textAlign: "center",
    marginBottom: "48px",
  },
  title: {
    color: colors.textDark,
    fontWeight: 800,
    fontSize: "40px",
    marginBottom: "16px",
  },
  paragraph: {
    color: colors.textMuted,
    fontSize: "20px",
    maxWidth: "700px",
    margin: "0 auto",
  },
  cardBase: {
    background: "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    transition: "all 0.3s ease-in-out",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  cardHover: {
    transform: "translateY(-10px)",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)",
  },
  // --- YAHAN BADLAV KIYE GAYE HAIN ---
  iconContainer: {
    background: colors.textLight,
    borderRadius: "16px",
    // 1. Padding hata di gayi hai
    padding: "0",
    marginBottom: "24px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
    width: "90px",
    height: "90px",
    flexShrink: 0,
    overflow: "hidden", // Ensure image corners are clipped
  },
  iconImage: {
    // 2. Image ko container ki poori width aur height di gayi hai
    width: "100%",
    height: "100%",
    // 3. 'cover' objectFit ka istemal kiya gaya hai taaki image stretch na ho
    objectFit: "cover",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  cardTitle: {
    color: colors.textDark,
    fontWeight: 700,
    fontSize: "22px",
    marginBottom: "12px",
    textAlign: "center",
  },
  cardDesc: {
    color: colors.textMuted,
    fontSize: "16px",
    textAlign: "center",
    lineHeight: "1.6",
  },
};

const WhyChooseChia = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const reasons = [
    {
      img: qualityImg,
      title: "Premium Quality",
      desc: "Our chia seeds are carefully sourced, ensuring you get only the freshest and highest quality seeds.",
    },
    {
      img: nutritionImg,
      title: "Nutrient Dense",
      desc: "Packed with protein, fiber, calcium, and antioxidants for a true superfood boost.",
    },
    {
      img: omegaImg,
      title: "Rich in Omega-3",
      desc: "A fantastic plant-based source of omega-3 fatty acids to support heart and brain health.",
    },
    {
      img: purityImg,
      title: "100% Pure & Natural",
      desc: "No additives, no preservatives, and always non-GMO. Just pure, natural chia seeds.",
    },
    {
      img: ecoImg,
      title: "Eco-Friendly & Sustainable",
      desc: "Our partners use sustainable practices to protect the environment and ensure long-term quality.",
    },
  ];

  return (
    <section
      className="why-chia-section section-padding"
      style={styles.section}
    >
      <div className="container">
        <div style={styles.titleWrapper}>
          <h2 style={styles.title}>Why Choose Our Chia Seeds?</h2>
          <p style={styles.paragraph}>
            Discover the difference with our premium chia seeds—carefully
            selected for purity, nutrition, and sustainability. Here’s why
            you’ll love them:
          </p>
        </div>
        <div className="row justify-content-center">
          {reasons.map((reason, idx) => {
            const currentItemStyle =
              hoveredIndex === idx
                ? { ...styles.cardBase, ...styles.cardHover }
                : styles.cardBase;

            return (
              <div className="col-lg-4 col-md-6 col-12 d-flex mb-4" key={idx}>
                <div
                  style={currentItemStyle}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div style={styles.iconContainer}>
                    <img
                      src={reason.img}
                      alt={reason.title}
                      style={styles.iconImage}
                    />
                  </div>
                  <div style={styles.cardContent}>
                    <h3 style={styles.cardTitle}>{reason.title}</h3>
                    <p style={styles.cardDesc}>{reason.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseChia;
