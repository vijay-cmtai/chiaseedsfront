import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Client logo images
import client1 from "../../images/client/img-1.png";
import client2 from "../../images/client/img-2.png";
import client3 from "../../images/client/img-3.png";
import client4 from "../../images/client/img-4.png";
import client5 from "../../images/client/img-5.png";

// --- Consistent Color Palette ---
const colors = {
  textDark: "#3d2b56",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

// --- Style Objects for the New Design ---
const styles = {
  // 1. Main section with gradient background
  section: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    padding: "80px 0",
  },
  // 2. Main container for the client logos (Frosted Glass Effect)
  clientWrapper: {
    background: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  // 3. Section Title
  title: {
    textAlign: "center",
    color: colors.textDark,
    fontWeight: 700,
    fontSize: "36px",
    marginBottom: "40px",
  },
  // 4. Style for each slide item to center the logo
  slideItem: {
    display: "flex !important", // Important to override slick styles
    justifyContent: "center",
    alignItems: "center",
    outline: "none",
  },
  // 5. Style for each client logo
  clientLogo: {
    maxHeight: "60px", // Limits the height of logos
    width: "auto",
    maxWidth: "150px", // Prevents logos from being too wide
    filter: "grayscale(100%) opacity(0.7)", // Default grayscale look
    transition: "filter 0.3s ease",
    cursor: "pointer",
  },
};

// CSS for hover effect, injected via a style tag
const hoverStyles = `
    .client-logo-item:hover img {
        filter: grayscale(0%) opacity(1);
    }
`;

class Client extends Component {
  render() {
    const settings = {
      dots: false,
      arrows: false,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000, // Slightly faster autoplay
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 4 } },
        { breakpoint: 768, settings: { slidesToShow: 3 } },
        { breakpoint: 480, settings: { slidesToShow: 2 } },
      ],
    };

    const clients = [client1, client2, client3, client4, client5];

    return (
      <>
        <style>{hoverStyles}</style>
        <section style={styles.section}>
          <div className="container">
            <div style={styles.clientWrapper}>
              <h2 style={styles.title}>Our Trusted Partners</h2>
              <div className="client-carousel">
                <Slider {...settings}>
                  {clients.concat(clients).map(
                    (
                      clientImg,
                      index // Doubling the array for a seamless loop
                    ) => (
                      <div
                        key={index}
                        className="client-logo-item"
                        style={styles.slideItem}
                      >
                        <img
                          src={clientImg}
                          alt={`Client ${index + 1}`}
                          style={styles.clientLogo}
                        />
                      </div>
                    )
                  )}
                </Slider>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Client;
