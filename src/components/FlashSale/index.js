import React, { useState } from "react";
import microgreensImg from "../../images/slider/img-11.jpg";
// --- YAHAN APNI IMAGE IMPORT KAREIN ---

// --- Consistent Color Palette ---
const colors = {
  primary: "#878fba",
  primaryHover: "#6c749d",
  textDark: "#3d2b56",
  textLight: "#ffffff",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

// --- Styles ---
const styles = {
  section: {
    width: "100%",
    minHeight: "60vh",
    background: `linear-gradient(to right, rgba(253, 231, 201, 0.9), rgba(224, 195, 252, 0.85)), url(${microgreensImg}) center/cover no-repeat`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: "80px 0",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 20px",
  },
  // --- YAHAN BADLAAV KIYA GAYA HAI ---
  leftImage: {
    width: "100%", // Width ko 100% set kiya gaya
    height: "450px", // Ek fixed height di gayi, aap ise badal sakte hain
    objectFit: "cover", // Yeh image ko stretch hone se rokega aur container ko fill karega
    borderRadius: "25px",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)",
    border: "6px solid rgba(255, 255, 255, 0.7)",
  },
  contentWrapper: {
    textAlign: "center",
    maxWidth: 700,
  },
  title: {
    fontSize: 48,
    fontWeight: 800,
    marginBottom: 24,
    color: colors.textDark,
  },
  paragraph: {
    fontSize: 20,
    marginBottom: 36,
    color: colors.textDark,
    textShadow: "0 1px 2px rgba(255,255,255,0.3)",
  },
  button: (isActive) => ({
    background: isActive ? colors.primary : colors.textLight,
    color: isActive ? colors.textLight : colors.primary,
    border: `2px solid ${colors.primary}`,
    borderRadius: 30,
    padding: "14px 38px",
    fontWeight: 700,
    fontSize: 18,
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: isActive ? `0 4px 24px rgba(135,143,186,0.3)` : "none",
  }),
  guideBox: {
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(8px)",
    borderRadius: 16,
    marginTop: 36,
    padding: 32,
    color: colors.textDark,
    textAlign: "left",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  },
  guideTitle: {
    color: colors.primary,
    marginBottom: 18,
  },
  guideList: {
    fontSize: 18,
    lineHeight: 1.7,
    paddingLeft: 24,
  },
  guideListItem: {
    marginBottom: 12,
  },
};

const ChiaMicrogreens = () => {
  const [showGuide, setShowGuide] = useState(false);

  const steps = [
    "Soak chia seeds in water for a few hours.",
    "Spread seeds evenly on moist soil or a terracotta tray.",
    "Mist gently and cover with a lid or plastic wrap for 1-2 days.",
    "Remove cover, place in indirect sunlight, and keep soil moist.",
    "Harvest microgreens in 7-10 days when 2-3 inches tall.",
  ];

  return (
    <section style={styles.section}>
      <div className="container">
        <div className="row align-items-center">
          {/* Left Column for Image */}
          <div className="col-lg-5 col-md-12 mb-4 mb-lg-0">
            <div style={styles.imageWrapper}>
              <img
                src="https://www.feastingathome.com/wp-content/uploads/2021/01/How-to-grow-sprouts-2-1.jpg" // Yahan imported image variable use karein
                alt="Chia Seeds Sprouting"
                style={styles.leftImage}
              />
            </div>
          </div>

          {/* Right Column for Original Content */}
          <div className="col-lg-7 col-md-12">
            <div style={styles.contentWrapper}>
              <h2 style={styles.title}>Grow Your Own Chia Microgreens</h2>
              <p style={styles.paragraph}>
                Experience the joy of growing fresh, nutritious chia microgreens
                right at home. All you need is a tray, some seeds, and a little
                patience!
              </p>
              <button
                onClick={() => setShowGuide((v) => !v)}
                style={styles.button(showGuide)}
              >
                {showGuide ? "Close Guide" : "How to Grow Microgreens"}
              </button>
              {showGuide && (
                <div style={styles.guideBox}>
                  <h3 style={styles.guideTitle}>Step-by-Step Guide</h3>
                  <ol style={styles.guideList}>
                    {steps.map((step, idx) => (
                      <li key={idx} style={styles.guideListItem}>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChiaMicrogreens;
