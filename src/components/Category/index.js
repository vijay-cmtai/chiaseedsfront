import React, { useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- Color Palette (Hero Section se match karne ke liye) ---
const colors = {
  primaryButton: "#878fba",
  primaryButtonHover: "#6c749d",
  textDark: "#3d2b56",
  textLight: "#ffffff",
  // Hero section ka gradient
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

// --- Styles ---
const styles = {
  // 1. Section ka background
  section: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    padding: "80px 0",
  },
  // 2. Title aur Paragraph ka style
  title: {
    color: colors.textDark,
    fontWeight: 700,
    fontSize: "42px",
  },
  paragraph: {
    color: colors.textDark,
    fontSize: "18px",
    lineHeight: "1.6",
  },
  // 3. Button ka style
  button: {
    backgroundColor: colors.primaryButton,
    color: colors.textLight,
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    marginTop: "20px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(135, 143, 186, 0.4)",
  },
  buttonHover: {
    backgroundColor: colors.primaryButtonHover,
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(135, 143, 186, 0.5)",
  },
  // 4. Instructions Box ka naya style
  instructionBox: (show) => ({
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white
    backdropFilter: "blur(5px)", // Frosted glass effect
    borderRadius: "10px",
    padding: show ? "20px" : "0 20px",
    marginTop: "25px",
    maxHeight: show ? "500px" : "0",
    overflow: "hidden",
    transition:
      "max-height 0.6s ease, padding 0.4s ease, background-color 0.3s ease",
    color: colors.textDark,
  }),
  instructionTitle: {
    color: colors.textDark, // Darker text for better contrast
    opacity: 0.8,
  },
  // 5. Image slider ke liye styles
  sliderImage: {
    width: "100%",
    height: "450px",
    objectFit: "cover",
    borderRadius: "20px", // Rounded corners
  },
};

const SkincareSection = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const skincareImages = [
    {
      id: 1,
      src: "https://www.ultimateyou.co.in/cdn/shop/articles/Chia_Seeds_for_Skin_1_39f822f2-2f51-4ae2-bd91-d55b6fa52f97.webp?v=1738222216&width=1100",
      alt: "Chia Face Mask Application",
    },
    {
      id: 2,
      src: "https://images.ctfassets.net/eexbcii1ci83/3Eicbtds6hFBs2A0IMZujp/0e21a1a4e37410f582befb0c4899e27f/Chia_seeds_Benefits_for_Skin.jpg",
      alt: "Chia Gel Bowl",
    },
  ];

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
    if (!showInstructions) {
      setTimeout(() => {
        document
          .getElementById("chia-instructions")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const sliderCustomStyles = `
    .skincare-slider .slick-dots li button:before {
        font-size: 12px;
        color: #9886AA;
    }
    .skincare-slider .slick-dots li.slick-active button:before {
        color: #878fba; /* Updated to match button color */
    }
  `;

  const finalButtonStyle = isButtonHovered
    ? { ...styles.button, ...styles.buttonHover }
    : styles.button;

  return (
    <>
      <style>{sliderCustomStyles}</style>
      <section className="category-area section-padding" style={styles.section}>
        <div className="container">
          <div className="row align-items-center">
            {/* Left Column: Text and Instructions */}
            <div className="col-lg-6">
              <div className="category-wrap">
                <div className="category-title">
                  <h2 style={styles.title}>Skincare with Chia Seeds</h2>
                  <p style={styles.paragraph}>
                    Chia seeds are rich in antioxidants and omega-3 fatty acids,
                    making them a fantastic ingredient for naturally glowing and
                    hydrated skin.
                  </p>
                  <button
                    style={finalButtonStyle}
                    onClick={toggleInstructions}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                  >
                    {showInstructions
                      ? "Hide Face Mask Instructions"
                      : "How to Use for Face & Skin"}
                  </button>

                  <div
                    id="chia-instructions"
                    style={styles.instructionBox(showInstructions)}
                  >
                    <h4 style={styles.instructionTitle}>
                      DIY Chia Seed Face Gel:
                    </h4>
                    <ul>
                      <li>Take 2 tablespoons of chia seeds</li>
                      <li>
                        Add 1/2 cup of water and let it soak for 30 minutes
                      </li>
                      <li>Apply the gel gently to your clean face</li>
                      <li>
                        Leave on for 10–15 minutes, then rinse with warm water
                      </li>
                      <li>Use 2–3 times a week for best results</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Image Slider */}
            <div className="col-lg-6">
              <div className="skincare-slider">
                <Slider {...sliderSettings}>
                  {skincareImages.map((image) => (
                    <div key={image.id}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="img-fluid"
                        style={styles.sliderImage}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SkincareSection;
