import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const colors = {
  textDark: "#3d2b56",
  textMuted: "#5a506b",
  primary: "#878fba",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};
const styles = {
  section: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    padding: "80px 0",
  },
  clientWrapper: {
    background: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  title: {
    textAlign: "center",
    color: colors.textDark,
    fontWeight: 700,
    fontSize: "36px",
    marginBottom: "40px",
  },
  slideItem: {
    display: "flex !important",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    outline: "none",
    padding: "20px 10px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
  partnerIcon: {
    fontSize: "48px",
    color: colors.primary,
    marginBottom: "15px",
    transition: "color 0.3s ease",
  },
  partnerText: {
    fontSize: "18px",
    fontWeight: "600",
    color: colors.textMuted,
    transition: "color 0.3s ease",
  },
};
const hoverStyles = `
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

    .partner-item:hover {
        transform: translateY(-5px);
    }
    .partner-item:hover .partner-icon {
        color: ${colors.textDark};
    }
    .partner-item:hover .partner-text {
        color: ${colors.textDark};
    }
`;
const partnersData = [
  { icon: "fas fa-leaf", name: "Greenfarm's" },
  { icon: "fas fa-tractor", name: "Farmer Local Purshottam" },
  { icon: "fas fa-seedling", name: "Farmer Local Vilash" },
  { icon: "fas fa-user-tie", name: "Farmer Local kishanrao" },
  { icon: "fas fa-sun", name: "Farmer Local ravi kumar" },
  { icon: "fas fa-hands-helping", name: "Farmer Local santosh" },
];

class Client extends Component {
  render() {
    const settings = {
      dots: false,
      arrows: false,
      speed: 1500, 
      slidesToShow: 6, 
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      responsive: [
        { breakpoint: 1400, settings: { slidesToShow: 5 } }, 
        { breakpoint: 1200, settings: { slidesToShow: 4 } }, 
        { breakpoint: 992, settings: { slidesToShow: 3 } }, 
        { breakpoint: 768, settings: { slidesToShow: 2 } }, 
      ],
    };

    return (
      <>
        <style>{hoverStyles}</style>
        <section style={styles.section}>
          <div className="container">
            <div style={styles.clientWrapper}>
              <h2 style={styles.title}>Our Trusted Partners</h2>
              <div className="client-carousel">
                <Slider {...settings}>
                  {partnersData.map((partner, index) => (
                    <div key={index} className="partner-item">
                      <div style={styles.slideItem}>
                        <i
                          className={partner.icon}
                          style={styles.partnerIcon}
                        ></i>
                        <span style={styles.partnerText}>{partner.name}</span>
                      </div>
                    </div>
                  ))}
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
