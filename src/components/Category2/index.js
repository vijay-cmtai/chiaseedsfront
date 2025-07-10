import React from "react";
import { Link } from "react-router-dom";

// --- Color Palette (Matching other components) ---
const colors = {
  primaryButton: "#878fba",
  textDark: "#3d2b56",
  textLight: "#ffffff",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

// --- Styles ---
const styles = {
  // Section background ko gradient mein badal diya gaya hai
  categorySection: {
    padding: "100px 0",
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
  },
  // Section ke liye ek title add kiya gaya hai
  sectionHeader: {
    textAlign: "center",
    marginBottom: "60px",
  },
  sectionTitle: {
    fontSize: "42px",
    fontWeight: 900,
    color: colors.textDark,
    marginBottom: "10px",
  },
  sectionSubtitle: {
    fontSize: "16px",
    color: colors.primaryButton,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  // Cards ko "glassmorphism" effect diya gaya hai
  categoryItem: {
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Semi-transparent white
    backdropFilter: "blur(12px)", // Sheeshe jaisa blur effect
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "40px 30px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    height: "100%",
  },
  // Icon ka background wahi rakha hai, jo is theme par accha lagega
  categoryIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    margin: "0 auto 25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
  },
  iconImage: {
    width: "55px",
    height: "55px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "15px",
    color: colors.textDark, // Title ka color dark set kiya gaya hai
  },
  link: {
    color: "inherit", // Parent (h2) ka color use karega
    textDecoration: "none",
  },
  description: {
    fontSize: "16px",
    color: "#493766", // Thoda dark color readability ke liye
    lineHeight: "1.6",
    margin: 0,
  },
};

const Category2 = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const categories = [
    {
      icon: "https://img.icons8.com/pastel-glyph/64/3d2b56/hearts--v1.png",
      title: "Nutrient Powerhouse",
      description:
        "Packed with Omega-3, fiber, and protein to support your heart, digestion, and energy levels.",
      link: "/shop",
    },
    {
      icon: "https://api.iconify.design/mdi/seed-outline.svg?color=%233d2b56",
      title: "Versatile Ingredient",
      description:
        "Easily add to smoothies, yogurts, salads, or create delicious puddings. The perfect boost for any meal.",
      link: "/shop",
    },
    {
      icon: "https://api.iconify.design/ph/leaf.svg?color=%233d2b56",
      title: "Pure & Organic",
      description:
        "Sourced from the best organic farms, our chia seeds are non-GMO, gluten-free, and purely processed.",
      link: "/shop",
    },
  ];

  return (
    <section style={styles.categorySection}>
      <div className="container">
        {/* Section ke liye ek title aur subtitle add kiya gaya hai */}
        <div style={styles.sectionHeader}>
          <p style={styles.sectionSubtitle}>Core Features</p>
          <h2 style={styles.sectionTitle}>Why Choose Our Chia Seeds?</h2>
        </div>

        <div className="row">
          {categories.map((cat, index) => (
            <div className="col-xl-4 col-lg-6 col-12 mb-4" key={index}>
              <div
                style={styles.categoryItem}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0, 0, 0, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0, 0, 0, 0.1)";
                }}
              >
                <div style={styles.categoryIcon}>
                  <img
                    src={cat.icon}
                    alt={`${cat.title} icon`}
                    style={styles.iconImage}
                  />
                </div>
                <div>
                  <h2 style={styles.title}>
                    <Link
                      onClick={ClickHandler}
                      to={cat.link}
                      style={styles.link}
                    >
                      {cat.title}
                    </Link>
                  </h2>
                  <p style={styles.description}>{cat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category2;
