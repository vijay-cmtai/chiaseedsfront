import React from "react";
import { Link } from "react-router-dom";
import abimg from "../../images/ChiaSeeds.jpg";

// --- Color Palette (to match Hero and HealthBenefits sections) ---
const colors = {
  primaryButton: "#878fba",
  primaryButtonHover: "#6c749d",
  textDark: "#3d2b56", // Dark purple for text
  textMuted: "#5a506b",
  gradientStart: "#fde7c9", // Creamy Yellow/Peach
  gradientEnd: "#e0c3fc", // Lavender
  textLight: "#ffffff",
};

// --- Styles ---
const styles = {
  // 1. Section Background (same as Hero)
  section: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    padding: "80px 0",
  },
  // 2. Title Style
  title: {
    color: colors.textDark,
    fontWeight: 700,
    marginBottom: "24px",
    letterSpacing: "1px",
    fontSize: "40px",
  },
  // 3. Nutrition Table Styles (Frosted Glass Effect)
  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white
    backdropFilter: "blur(10px)",
  },
  tableRow: (isEven) => ({
    backgroundColor: isEven ? "rgba(255, 255, 255, 0.2)" : "transparent", // Alternating transparent rows
  }),
  tableCellLabel: {
    padding: "16px 22px",
    color: colors.textDark, // Dark text for better contrast
    fontWeight: 600,
    fontSize: "18px",
    border: "none",
  },
  tableCellValue: {
    padding: "16px 22px",
    color: colors.textMuted, // Muted dark text
    fontWeight: 500,
    fontSize: "18px",
    border: "none",
    textAlign: "right",
  },
  // 4. Right Side Content Alignment
  rightColumn: {
    marginBottom: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  // 5. Image Style
  mainImage: {
    width: "100%",
    maxWidth: "450px",
    height: "auto",
    objectFit: "cover",
    borderRadius: "24px",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)",
    border: `6px solid ${colors.textLight}`, // White border looks great on gradients
  },
  // 6. Button Style
  button: {
    background: colors.primaryButton,
    color: colors.textLight,
    border: "none",
    borderRadius: "30px",
    padding: "16px 44px",
    fontWeight: 700,
    fontSize: "19px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: `0 5px 20px rgba(135, 143, 186, 0.4)`,
    marginTop: "40px",
    textDecoration: "none",
    display: "inline-block",
  },
  buttonHover: {
    backgroundColor: colors.primaryButtonHover,
    transform: "translateY(-3px)",
  },
};

const OfferSection = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const finalButtonStyle = isHovered
    ? { ...styles.button, ...styles.buttonHover }
    : styles.button;

  return (
    <section className="offer-area section-padding" style={styles.section}>
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side: Nutrition Table */}
          <div className="col-lg-6 col-md-12" style={{ marginBottom: "32px" }}>
            <h2 style={styles.title}>Nutritional Information</h2>
            <table style={styles.table}>
              <tbody>
                {nutritionData.map((row, idx) => (
                  <tr key={row.label} style={styles.tableRow(idx % 2 === 0)}>
                    <td style={styles.tableCellLabel}>{row.label}</td>
                    <td style={styles.tableCellValue}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Side: Main Image + Button */}
          <div className="col-lg-6 col-md-12" style={styles.rightColumn}>
            <img src={abimg} alt="Chia Seeds" style={styles.mainImage} />
            <Link
              to="/shop"
              style={finalButtonStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={ClickHandler}
            >
              View Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Data has been moved inside the component file for completeness
const nutritionData = [
  { label: "Serving Size", value: "28g (2 tbsp)" },
  { label: "Calories", value: "138" },
  { label: "Protein", value: "4.7g" },
  { label: "Fat", value: "8.7g" },
  { label: "Carbohydrates", value: "12g" },
  { label: "Fiber", value: "9.8g" },
  { label: "Calcium", value: "179mg (13% DV)" },
  { label: "Magnesium", value: "95mg (23% DV)" },
  { label: "Omega-3", value: "4915mg" },
];

export default OfferSection;
