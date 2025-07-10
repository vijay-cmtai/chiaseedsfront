import React, { useState } from "react";
import { Link } from "react-router-dom";
import blogs from "../../api/blogs";

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
  },
  // 2. Section Title and Paragraph
  sectionTitle: {
    textAlign: "center",
    marginBottom: "60px",
  },
  h2: {
    fontSize: "40px",
    fontWeight: "700",
    marginBottom: "15px",
    color: colors.textDark,
  },
  spanNews: {
    color: colors.textDark,
  },
  spanBlog: {
    color: colors.primary,
  },
  p: {
    color: colors.textMuted,
    lineHeight: "1.8",
    maxWidth: "550px",
    margin: "0 auto",
  },
  // 3. Blog Card Styles (Frosted Glass Effect)
  blogItemBase: {
    background: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  blogItemHover: {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
  },
  // 4. Image Container and Image
  blogImg: {
    overflow: "hidden",
    position: "relative",
  },
  imgBase: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    transition: "transform 0.4s ease",
  },
  imgHover: {
    transform: "scale(1.08)",
  },
  // 5. Content Area
  blogContent: {
    padding: "25px 30px 30px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  // 6. Meta Info
  metaList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 15px 0",
    display: "flex",
    gap: "20px",
    fontSize: "14px",
    color: colors.textMuted,
  },
  metaIcon: {
    color: colors.primary,
    marginRight: "8px",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "600",
    lineHeight: 1.4,
  },
  cardTitleLink: {
    color: colors.textDark,
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
  // 8. "Read More" Button
  readMoreBtn: {
    display: "inline-block",
    marginTop: "20px",
    padding: "8px 20px",
    color: colors.primary,
    backgroundColor: "transparent",
    border: `1px solid ${colors.primary}`,
    borderRadius: "5px",
    fontWeight: 500,
    textDecoration: "none",
    transition: "all 0.3s ease",
  },
  readMoreBtnHover: {
    backgroundColor: colors.primary,
    color: colors.textLight,
  },
};

const BlogSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <section className="blog-area" style={styles.section}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div style={styles.sectionTitle}>
              <h2 style={styles.h2}>
                <span style={styles.spanNews}>News And </span>
                <span style={styles.spanBlog}>Blog</span>
              </h2>
              <p style={styles.p}>
                Stay updated with our latest articles, tips, and company news.
                Explore insights from our experts.
              </p>
            </div>
          </div>
        </div>
        <div className="blog-wrap">
          <div className="row">
            {blogs.slice(0, 3).map((blog, index) => {
              const isCardHovered = hoveredCard === index;
              const cardStyle = isCardHovered
                ? { ...styles.blogItemBase, ...styles.blogItemHover }
                : styles.blogItemBase;

              const imgStyle = isCardHovered
                ? { ...styles.imgBase, ...styles.imgHover }
                : styles.imgBase;

              const isButtonHovered = hoveredButton === index;
              const buttonStyle = isButtonHovered
                ? { ...styles.readMoreBtn, ...styles.readMoreBtnHover }
                : styles.readMoreBtn;

              return (
                <div
                  className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex mb-4"
                  key={index}
                >
                  <div
                    style={cardStyle}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={styles.blogImg}>
                      <Link
                        onClick={ClickHandler}
                        to={`/blog-single/${blog.id}`}
                      >
                        <img
                          src={blog.screens}
                          alt={blog.title}
                          style={imgStyle}
                        />
                      </Link>
                    </div>
                    <div style={styles.blogContent}>
                      <div>
                        <ul style={styles.metaList}>
                          <li>
                            {/* === ICON UPDATED === */}
                            <i
                              className="fa fa-calendar-alt"
                              style={styles.metaIcon}
                            ></i>
                            {blog.create_at}
                          </li>
                          <li>
                            {/* === ICON UPDATED === */}
                            <i
                              className="fa fa-heart"
                              style={styles.metaIcon}
                            ></i>
                            {blog.comment} Comments
                          </li>
                        </ul>
                        <h3 style={styles.cardTitle}>
                          <Link
                            onClick={ClickHandler}
                            to={`/blog-single/${blog.id}`}
                            style={styles.cardTitleLink}
                          >
                            {blog.title}
                          </Link>
                        </h3>
                      </div>
                      <Link
                        onClick={ClickHandler}
                        to={`/blog-single/${blog.id}`}
                        style={buttonStyle}
                        onMouseEnter={() => setHoveredButton(index)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        Read More
                        <i
                          className="fa fa-angle-double-right"
                          style={{ marginLeft: "8px" }}
                        ></i>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
