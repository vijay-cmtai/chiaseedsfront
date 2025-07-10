import React from "react";
import videoFile from "../../images/model.mp4";

// --- ORIGINAL Color Palette ---
const colors = {
  primary: "#878fba",
  primaryHover: "#6c749d",
  primaryLight: "rgba(135, 143, 186, 0.1)", // Icon background ke liye halka primary color
  textDark: "#3d2b56",
  textMuted: "#5a6275",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
  white: "#ffffff",
  borderColor: "rgba(61, 43, 86, 0.1)",
};

// --- STYLES (UI/UX ko behtar banane ke liye update kiye gaye hain) ---
const styles = {
  aboutSection: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    padding: "100px 0",
    overflow: "hidden",
  },
  videoContainer: {
    position: "relative",
    borderRadius: "30px", // Thoda aur rounded
    overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
    // === VIDEO KI HEIGHT BADHA DI GAYI HAI ===
    aspectRatio: "4 / 5", // Video ab lamba dikhega
    width: "100%",
  },
  videoElement: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  aboutArea: {
    paddingLeft: "50px", // Content aur video ke beech spacing badhai
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontWeight: 900,
    fontSize: "48px", // Thoda bada title
    lineHeight: "1.2",
    color: colors.textDark,
    marginBottom: "10px",
  },
  tagline: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: "22px",
    marginBottom: "30px",
  },
  sectionHeading: {
    fontWeight: 700,
    fontSize: "26px",
    color: colors.textDark,
    marginTop: "45px", // Sections ke beech zyada gap
    marginBottom: "20px",
  },
  description: {
    fontSize: "18px",
    color: colors.textMuted,
    lineHeight: "1.8",
    marginBottom: "20px",
  },
  // === "WHAT WE STAND FOR" KE LIYE NAYA STYLED LIST ===
  featureList: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px", // Items ke beech zyada gap
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    backgroundColor: colors.white,
    padding: "20px",
    borderRadius: "12px",
    boxShadow: `0 4px 15px ${colors.borderColor}`,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  featureItemHover: {
    // Yeh style abhi use nahi ho raha, par future ke liye hai
    transform: "translateY(-5px)",
    boxShadow: `0 8px 25px ${colors.borderColor}`,
  },
  featureIconWrapper: {
    flexShrink: 0,
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: colors.primaryLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  featureIcon: {
    fontSize: "24px",
    color: colors.primary,
  },
  featureText: {
    margin: 0,
    fontSize: "17px",
    color: colors.textMuted,
    lineHeight: "1.7",
  },
  finalTagline: {
    marginTop: "45px",
    fontSize: "20px",
    fontWeight: "500",
    color: colors.textDark,
    lineHeight: "1.7",
  },
};

const About = (props) => {
  return (
    <section style={styles.aboutSection}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 col-12">
            <div style={styles.videoContainer}>
              <video
                style={styles.videoElement}
                src={videoFile}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
          <div className="col-lg-7 col-12">
            <div style={styles.aboutArea}>
              <p style={styles.tagline}>Nourishing the Nation, Naturally.</p>

              <p style={styles.description}>
                Welcome to Naraa Global Enterprises, a young and passionate
                Indian brand committed to delivering high-quality, lab-tested,
                and natural superfoods — starting with our flagship product,
                Premium Chia Seeds.
              </p>

              <h3 style={styles.sectionHeading}>🔍 What We Stand For</h3>
              <div style={styles.featureList}>
                <div style={styles.featureItem}>
                  <div style={styles.featureIconWrapper}>
                    <span style={styles.featureIcon}>✓</span>
                  </div>
                  <p style={styles.featureText}>
                    <strong>Purity You Can Trust</strong> – Each batch is
                    lab-tested for quality and safety.
                  </p>
                </div>
                <div style={styles.featureItem}>
                  <div style={styles.featureIconWrapper}>
                    <span style={styles.featureIcon}>✓</span>
                  </div>
                  <p style={styles.featureText}>
                    <strong>Transparency</strong> – Clear labeling. No false
                    claims. No shortcuts.
                  </p>
                </div>
                <div style={styles.featureItem}>
                  <div style={styles.featureIconWrapper}>
                    <span style={styles.featureIcon}>✓</span>
                  </div>
                  <p style={styles.featureText}>
                    <strong>Customer Happiness</strong> – We value every
                    feedback, every smile.
                  </p>
                </div>
              </div>

              <p style={styles.finalTagline}>
                Eat clean. Live well. Grow with us.
                <br />
                <strong>🌱 Naraa Global – Naturally Yours.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
