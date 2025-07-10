import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    padding: "100px 0",
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "60px",
  },
  sectionTitle: {
    fontSize: "42px",
    fontWeight: 900,
    color: colors.textDark,
  },
  titleSpan: {
    color: colors.primaryButton,
  },
  sectionSubtitle: {
    fontSize: "18px",
    color: colors.textDark,
    maxWidth: "600px",
    margin: "15px auto 0",
    lineHeight: "1.7",
  },
  teamCard: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    margin: "0 15px", // Adds spacing between slider items
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
    fontSize: "22px",
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
    dots: true, // Dots are better for touch devices
    arrows: false, // Hiding arrows for a cleaner look, dots are sufficient
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  // Using placeholder images from picsum.photos for demonstration
  const Teams = [
    {
      tImg: "https://picsum.photos/seed/person1/400/500",
      title: "Chris Fletcher",
      des: "Founder & CEO",
    },
    {
      tImg: "https://picsum.photos/seed/person2/400/500",
      title: "Ema Aliana",
      des: "Nutrition Specialist",
    },
    {
      tImg: "https://picsum.photos/seed/person3/400/500",
      title: "John Clyne",
      des: "Marketing Director",
    },
    {
      tImg: "https://picsum.photos/seed/person4/400/500",
      title: "Lily Jameson",
      des: "Quality Assurance",
    },
    {
      tImg: "https://picsum.photos/seed/person5/400/500",
      title: "Mark Davis",
      des: "Lead Developer",
    },
  ];

  return (
    <section style={styles.teamSection}>
      <div className="container">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            Our Expert <span style={styles.titleSpan}>Team</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            Meet the passionate individuals dedicated to bringing you the
            highest quality chia seeds and promoting a healthy lifestyle.
          </p>
        </div>
        <div className="team-slider">
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
                    <ul style={styles.socialLinks}>
                      {/* IMPORTANT: Make sure you have Font Awesome linked in your index.html */}
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
