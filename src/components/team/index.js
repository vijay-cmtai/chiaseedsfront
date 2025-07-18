import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ship1 from "../../images/ship1.png"; // Importing the ship image

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
  teamSection: {
    padding: "80px 0",
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "50px",
  },
  // === 1. STYLE KO IMAGE KE LIYE UPDATE KIYA GAYA HAI ===
  shipLogo: {
    width: "70px", // Image ki chaudai
    height: "auto", // Lambai apne aap adjust ho jayegi
    marginBottom: "15px", // Logo aur title ke beech mein jagah
  },
  // ====================================================
  sectionTitle: {
    fontSize: "38px",
    fontWeight: 900,
    color: colors.textDark,
  },
  titleSpan: {
    color: colors.primaryButton,
  },
  sectionSubtitle: {
    fontSize: "16px",
    color: colors.textDark,
    maxWidth: "600px",
    margin: "15px auto 0",
    lineHeight: "1.7",
  },
  sliderContainer: {
    maxWidth: "400px",
    margin: "0 auto",
  },
  teamCard: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    margin: "0 15px",
    textAlign: "center",
    overflow: "hidden",
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
  },
  imageHolder: {
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "auto",
    display: "block",
    transition: "transform 0.4s ease",
  },
  details: {
    padding: "25px 20px",
  },
  name: {
    fontSize: "20px",
    fontWeight: "700",
    color: colors.textDark,
    margin: "0 0 5px 0",
  },
  designation: {
    fontSize: "14px",
    color: colors.primaryButton,
    fontWeight: "bold",
    margin: "0 0 20px 0",
    textTransform: "uppercase",
  },
  socialLinks: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  socialIconLink: {
    color: colors.textDark,
    fontSize: "16px",
    transition: "color 0.3s ease",
  },
};

const TeamSection = () => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const sliderSettings = {
    dots: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 1 } },
      { breakpoint: 992, settings: { slidesToShow: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const Teams = [
    {
      tImg: "https://picsum.photos/seed/person1/400/500",
      title: "Sahil Mahendra pardake",
      des: "A founder proprietor",
      qua: "B com Ex NCC senior under officer",
    },
  ];

  return (
    <section style={styles.teamSection}>
      <div className="container">
        <div style={styles.sectionHeader}>
          {/* === 2. ICON KI JAGAH IMAGE TAG USE KIYA GAYA HAI === */}
          <img src={ship1} alt="Ship and Anchor Logo" style={styles.shipLogo} />
          {/* ==================================================== */}
          <h2 style={styles.sectionTitle}>
            Captain of the <span style={styles.titleSpan}>Ship</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            Meet the passionate individuals dedicated to bringing you the
            highest quality chia seeds and promoting a healthy lifestyle.
          </p>
        </div>
        <div className="team-slider" style={styles.sliderContainer}>
          <Slider {...sliderSettings}>
            {Teams.map((team, index) => (
              <div key={index}>
                <div
                  style={styles.teamCard}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(0, 0, 0, 0.15)";
                    const img = e.currentTarget.querySelector("img");
                    if (img) img.style.transform = "scale(1.08)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    const img = e.currentTarget.querySelector("img");
                    if (img) img.style.transform = "scale(1)";
                  }}
                >
                  <div style={styles.imageHolder}>
                    <img
                      src={team.tImg}
                      alt={team.title}
                      style={styles.image}
                    />
                  </div>
                  <div style={styles.details}>
                    <h4 style={styles.name}>{team.title}</h4>
                    <p style={styles.designation}>{team.des}</p>
                    <p style={{ color: colors.textDark }}>{team.qua}</p>
                    <ul style={styles.socialLinks}>
                      <li>
                        <Link
                          onClick={ClickHandler}
                          to="/about"
                          style={styles.socialIconLink}
                        >
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={ClickHandler}
                          to="/about"
                          style={styles.socialIconLink}
                        >
                          <i className="fab fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={ClickHandler}
                          to="/about"
                          style={styles.socialIconLink}
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={ClickHandler}
                          to="/about"
                          style={styles.socialIconLink}
                        >
                          <i className="fab fa-instagram"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
