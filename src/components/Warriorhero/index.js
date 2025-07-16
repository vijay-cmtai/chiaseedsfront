// src/components/WarriorHero.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// Slider ki CSS ko import karein
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- Color Palette (Aapke diye gaye theme ke anusaar) ---
const colors = {
  primaryButton: "#878fba",
  primaryButtonHover: "#6c749d",
  textDark: "#3d2b56",
  textLight: "#ffffff",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

// --- Styles (No changes) ---
const styles = {
  heroSection: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    paddingTop: "120px",
    paddingBottom: "80px",
    overflow: "hidden",
  },
  title: {
    fontWeight: 900,
    fontSize: "50px",
    lineHeight: "1.1",
    textTransform: "uppercase",
    margin: 0,
  },
  span1: {
    color: colors.textLight,
    letterSpacing: "6px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  span2: {
    color: colors.textDark,
    letterSpacing: "2px",
    display: "block",
    marginTop: "10px",
  },
  description: {
    fontSize: "18px",
    color: colors.textDark,
    marginTop: "25px",
    marginBottom: "35px",
    maxWidth: "500px",
    lineHeight: "1.6",
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
    height: "500px",
    objectFit: "cover",
  },
};

class WarriorHero extends Component {
  state = {
    isButtonHovered: false,
  };

  render() {
    const buttonStyle = this.state.isButtonHovered
      ? { ...styles.button, ...styles.buttonHover }
      : styles.button;

    // === SLIDER TIMER YAHAN FAST KIYA GAYA HAI ===
    const sliderSettings = {
      dots: false,
      arrows: false,
      infinite: true,
      fade: true,
      speed: 300, // <-- Transition speed tez kar di (0.8s se 0.3s)
      autoplay: true,
      autoplaySpeed: 2000, // <-- Har slide ab 2 second ke liye rukegi (3s se 2s)
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const heroImages = [
      {
        id: 1,
        src: "https://img.freepik.com/premium-photo/mayan-warrior-with-feather-his-head_860566-13.jpg",
        alt: "Detailed Aztec warrior in ornate headdress",
      },
      {
        id: 2,
        src: "https://i.pinimg.com/736x/9d/c0/87/9dc087efbdb4757b425671450a57460b.jpg",
        alt: "Mayan warrior emerging from the jungle mist",
      },
      {
        id: 3,
        src: "https://img.freepik.com/free-photo/view-warrior-leader-from-ancient-maya-inca-empire_23-2151683564.jpg?semt=ais_hybrid&w=740",
        alt: "Aztec warrior in profile with a jaguar helmet",
      },
      {
        id: 4,
        src: "https://img.freepik.com/free-photo/warrior-leader-from-ancient-maya-inca-lost-empire_23-2151683556.jpg",
        alt: "A focused Mayan warrior ready for battle",
      },
      {
        id: 5,
        src: "https://static.vecteezy.com/system/resources/thumbnails/027/206/131/small_2x/ancient-greek-warrior-with-a-spear-in-his-hands-against-the-background-of-the-ancient-ruins-mayan-deity-mayan-depicted-with-a-powerful-ceremonial-axe-ai-generated-free-photo.jpg",
        alt: "Ancient warrior holding a small pouch, hinting at chia seeds",
      },
    ];

    return (
      <section className="hero-section-wrapper" style={styles.heroSection}>
        <div className="container">
          <div className="row align-items-center">
            {/* Column 1: Text and Button (Left Side) */}
            <div className="col-lg-5 slide-caption">
              <div className="slide-title">
                <h2 style={styles.title}>
                  <span style={styles.span1}>Ancient</span>
                  <span style={styles.span2}>Warrior Fuel</span>
                </h2>
              </div>
              <p style={styles.description}>
                The Untold Story of Chia: From Sacred Seed to Superfood Long
                before chia became a modern superfood, it fueled ancient
                warriors. The Aztecs and Mayans saw chia as sacred — a source of
                energy, medicine, and even currency. Just one spoonful could
                power a warrior for a day. But after the Spanish invasion, chia
                was banned — nearly lost to history. Now, Naraa Global
                Enterprises is bringing it back. Naraa Chia Seeds — Reviving
                Ancient Nutrition Naturally grown Lab-tested for purity Packed
                with care Delivered farm to spoon Each pouch from Naraa carries
                the strength of tradition and the power of plant-based health.
              </p>
              <div className="btns">
                <Link
                  to="/shop"
                  style={buttonStyle}
                  onMouseEnter={() => this.setState({ isButtonHovered: true })}
                  onMouseLeave={() => this.setState({ isButtonHovered: false })}
                >
                  Discover The Power »
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

export default WarriorHero;
