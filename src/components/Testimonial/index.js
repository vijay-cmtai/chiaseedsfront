import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import test1 from "../../images/testimonial/1.png";
import test2 from "../../images/testimonial/3.png";
import test3 from "../../images/testimonial/2.png";
import t1 from "../../images/testimonial/t1.jpg";
import t2 from "../../images/testimonial/t2.jpg";
import t3 from "../../images/testimonial/t3.jpg";
import t4 from "../../images/testimonial/t4.jpg";
import t5 from "../../images/testimonial/t5.jpg";
import t6 from "../../images/testimonial/t6.jpg";

// --- Consistent Color Palette ---
const colors = {
  primary: "#878fba",
  primaryHover: "#6c749d",
  textDark: "#3d2b56",
  textMuted: "#5a506b",
  textLight: "#ffffff",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

// --- Style Objects for the New Design ---
const styles = {
  // 1. Main section with gradient background
  section: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    padding: "100px 0",
    position: "relative",
  },
  // 2. Section Title and Paragraph
  sectionTitle: {
    textAlign: "center",
    marginBottom: "80px", // Increased space for the new card design
  },
  h2: {
    fontSize: "40px",
    fontWeight: "700",
    marginBottom: "15px",
    color: colors.textDark,
  },
  spanClient: {
    color: colors.textDark,
  },
  spanTestimonial: {
    color: colors.primary,
  },
  p: {
    color: colors.textMuted,
    lineHeight: "1.8",
    maxWidth: "550px",
    margin: "0 auto",
  },
  // 3. New Testimonial Card Style
  testimonialItem: {
    textAlign: "center",
    padding: "30px",
    paddingTop: "60px", // Extra padding at the top for the image
    position: "relative",
    // "Frosted Glass" effect
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    margin: "50px 20px 20px 20px", // Top margin to make space for the image
  },
  // 4. Circular Image that sits on top of the card
  testimonialImg: {
    position: "absolute",
    top: "-50px", // Positioned half-way outside the card
    left: "50%",
    transform: "translateX(-50%)",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: `5px solid ${colors.textLight}`,
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  // 5. Testimonial Content
  contentText: {
    fontStyle: "italic",
    color: colors.textMuted,
    lineHeight: "1.7",
    marginBottom: "25px",
    fontSize: "18px",
  },
  authorName: {
    color: colors.textDark,
    fontWeight: "700",
    fontSize: "20px",
    marginBottom: "3px",
  },
  authorRole: {
    color: colors.primary,
    fontWeight: 500,
  },
};

// --- CSS for the slider arrows, updated to match the new theme ---
const sliderArrowStyles = `
    .testimonial-area .slick-prev,
    .testimonial-area .slick-next {
        background-color: ${colors.primary};
        width: 45px;
        height: 45px;
        border-radius: 50%;
        z-index: 9;
        transition: background-color 0.3s ease;
    }
    .testimonial-area .slick-prev:hover,
    .testimonial-area .slick-next:hover {
        background-color: ${colors.primaryHover};
    }
    .testimonial-area .slick-prev {
        left: -25px; /* Moved closer */
    }
    .testimonial-area .slick-next {
        right: -25px; /* Moved closer */
    }
    /* Hide on smaller screens */
    @media (max-width: 767px) {
        .testimonial-area .slick-prev,
        .testimonial-area .slick-next {
            display: none !important;
        }
    }
    .testimonial-area .slick-prev:before,
    .testimonial-area .slick-next:before {
        color: ${colors.textLight};
        font-size: 24px;
        line-height: 1;
    }
`;

// --- Data array for testimonials ---
const testimonialsData = [
  {
    img: t1,
    text: "I add these seeds to my breakfast every day. Pure and full of energy!",
    name: "Sakshi Firangi",
    role: "Agra",
  },
  {
    img: t2,
    text: "These chia seeds are super fresh and full of nutrition. I’ve started using them daily!",
    name: "Honey Shinde",
    role: "Mumbai",
  },
  {
    img: t3,
    text: "Great taste, premium packaging, and fast delivery. Highly recommended!",
    name: " Kaple Raj",
    role: "Delhi",
  },
  {
    img: t4,
    text: "These seeds have become my daily health partner. Thank you, Naraa Global!",
    name: "Krishna Thorat",
    role: "Pune",
  },
  {
    img: t5,
    text: "Great quality chia seeds! Loved the packaging and the freshness. Totally worth it",
    name: "Natu Rastogi",
    role: "Lucknow",
  },
  {
    img: t6,
    text: "Natural, clean, and super fresh seeds. Glad to have a brand like this in India!",
    name: "Ayush Dhaval,",
    role: "Pulgaon",
  },
];

class Testimonial extends Component {
  render() {
    const settings = {
      dots: true, // Dots look good with this design
      arrows: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000, // Slightly longer pause
      fade: true,
    };

    return (
      <>
        <style>{sliderArrowStyles}</style>
        <section className="testimonial-area" style={styles.section}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div style={styles.sectionTitle}>
                  <h2 style={styles.h2}>
                    <span style={styles.spanClient}>Client </span>
                    <span style={styles.spanTestimonial}>Testimonial</span>
                  </h2>
                  <p style={styles.p}>
                    Discover what our valued clients have to say about their
                    experience with our products and services.
                  </p>
                </div>
              </div>
            </div>
            <div className="testimonial-wrap">
              <div className="testimonial-active">
                <Slider {...settings}>
                  {testimonialsData.map((testimonial, index) => (
                    <div key={index}>
                      <div style={styles.testimonialItem}>
                        <div style={styles.testimonialImg}>
                          <img
                            src={testimonial.img}
                            alt={testimonial.name}
                            style={styles.img}
                          />
                        </div>
                        <div className="testimonial-content">
                          <p style={styles.contentText}>"{testimonial.text}"</p>
                          <div className="testimonial-author">
                            <h3 style={styles.authorName}>
                              {testimonial.name}
                            </h3>
                            <span style={styles.authorRole}>
                              {testimonial.role}
                            </span>
                          </div>
                        </div>
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

export default Testimonial;
