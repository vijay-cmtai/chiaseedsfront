import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// Slider ki CSS ko import karein
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Images ko import karein
import hero1 from "../../images/slider/img-12.jpg";
import hero2 from "../../images/slider/img-11.jpg";
import hero3 from "../../images/slider/img-13.jpg";
import hero4 from "../../images/slider/img-14.jpg";
import hero5 from "../../images/slider/img-15.jpg";
import hero6 from "../../images/slider/img-16.jpg";

// --- Color Palette ---
const colors = {
  primaryButton: "#878fba",
  primaryButtonHover: "#6c749d",
  textDark: "#3d2b56",
  textLight: "#ffffff",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

// --- Styles ---
const styles = {
  heroSection: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    paddingTop: "120px",
    paddingBottom: "0",
    overflow: "hidden",
  },
  title: {
    fontWeight: 900,
    fontSize: "64px",
    lineHeight: "1.1",
    textTransform: "uppercase",
    margin: 0,
  },
  span1: {
    color: colors.textLight,
    letterSpacing: "8px",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
  },
  span2: {
    color: colors.textDark,
    letterSpacing: "4px",
    display: "block",
    marginTop: "10px",
  },
  description: {
    fontSize: "18px",
    color: colors.textDark,
    marginTop: "25px",
    marginBottom: "35px",
    maxWidth: "450px",
  },
  button: {
    backgroundColor: colors.primaryButton,
    color: colors.textLight,
    padding: "15px 40px",
    border: "none",
    borderRadius: "10px",
    display: "inline-block",
    textDecoration: "none",
    transition: "all 0.3s ease",
    fontSize: "18px",
    cursor: "pointer",
    boxShadow: "0 5px 20px rgba(135, 143, 186, 0.4)",
  },
  buttonHover: {
    backgroundColor: colors.primaryButtonHover,
    transform: "translateY(-3px)",
    boxShadow: "0 8px 25px rgba(135, 143, 186, 0.6)",
  },
  sliderContainer: {
    position: "relative",
    borderRadius: "25px",
    overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  imageStyle: {
    display: "block",
    width: "100%",
    height: "450px",
    objectFit: "cover",
  },
};

class Hero extends Component {
  state = {
    isButtonHovered: false,
  };

  render() {
    const buttonStyle = this.state.isButtonHovered
      ? { ...styles.button, ...styles.buttonHover }
      : styles.button;

    // === SLIDER SPEED YAHAN BADAL DI GAYI HAI ===
    const sliderSettings = {
      dots: false,
      arrows: false,
      infinite: true,
      fade: true,
      speed: 500, // Transition speed 1s se 0.5s kar di gayi (tez fade)
      autoplay: true,
      autoplaySpeed: 2000, // Har slide 3s ke bajaye 2s ke liye rukegi
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const heroImages = [
      { id: 1, src: hero2, alt: "Chia Pudding" },
      { id: 2, src: hero1, alt: "Chia Seeds" },
      { id: 3, src: hero3, alt: "Healthy Breakfast" },
      { id: 4, src: hero4, alt: "Organic Ingredients" },
      { id: 5, src: hero5, alt: "Chia Smoothie" },
      { id: 6, src: hero6, alt: "Chia Seeds in Bowl" },
    ];

    return (
      <section className="hero-section-wrapper" style={styles.heroSection}>
        <div className="container">
          <div className="row align-items-center">
            {/* Column 1: Text and Button (Left Side) */}
            <div className="col-lg-5 slide-caption">
              <div className="slide-title">
                <h2 style={styles.title}>
                  <span style={styles.span1}>Fresh</span>
                  <span style={styles.span2}>Chia Seeds</span>
                </h2>
              </div>
              <p style={styles.description}>
                Discover the amazing benefits of pure, organic chia seeds for a
                healthier lifestyle.
              </p>
              <div className="btns">
                <Link
                  to="/shop"
                  style={buttonStyle}
                  onMouseEnter={() => this.setState({ isButtonHovered: true })}
                  onMouseLeave={() => this.setState({ isButtonHovered: false })}
                >
                  Shop Now »
                </Link>
              </div>
            </div>

            {/* Column 2: Image Slider (Right Side) */}
            <div className="col-lg-7">
              <div style={styles.sliderContainer}>
                <Slider {...sliderSettings}>
                  {heroImages.map((image) => (
                    <div key={image.id}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        style={styles.imageStyle}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Hero;
