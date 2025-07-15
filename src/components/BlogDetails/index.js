import React from "react";
import { Link, useParams } from "react-router-dom";
import blogs from "../../api/blogs"; // Dynamic data yahan se aayega
import BlogSidebar from "../../components/BlogSidebar";

// --- Color Palette (wahi rahega) ---
const colors = {
  primary: "#878fba",
  textDark: "#3d2b56",
  textMuted: "#5a506b",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
  textLight: "#ffffff",
  cardBackground: "rgba(255, 255, 255, 0.75)",
  borderColor: "rgba(135, 143, 186, 0.25)",
  tagBackground: "rgba(135, 143, 186, 0.15)",
};

// --- Styles (Cleaned up) ---
const styles = {
  blogSection: {
    padding: "100px 0",
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
  },
  contentWrapper: {
    padding: "40px",
    backgroundColor: colors.cardBackground,
    borderRadius: "20px",
    border: `1px solid ${colors.borderColor}`,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.07)",
  },
  mainImage: {
    width: "100%",
    borderRadius: "15px",
    marginBottom: "25px",
    objectFit: "cover",
    maxHeight: "450px",
  },
  metaInfo: {
    display: "flex",
    gap: "20px",
    color: colors.textMuted,
    marginBottom: "15px",
    fontSize: "14px",
    flexWrap: "wrap",
  },
  metaLink: {
    color: colors.primary,
    textDecoration: "none",
    fontWeight: "bold",
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
    color: colors.textDark,
    marginBottom: "20px",
    lineHeight: 1.3,
  },
  paragraph: {
    fontSize: "17px",
    lineHeight: "1.8",
    color: colors.textMuted,
    marginBottom: "20px",
  },
  blockquote: {
    borderLeft: `4px solid ${colors.primary}`,
    padding: "15px 25px",
    margin: "30px 0",
    fontSize: "18px",
    fontStyle: "italic",
    color: colors.textDark,
    backgroundColor: "rgba(135, 143, 186, 0.05)",
  },
  tagShareSection: {
    paddingTop: "20px",
    borderTop: `1px solid ${colors.borderColor}`,
    marginTop: "30px",
  },
  tagList: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  tagLink: {
    display: "inline-block",
    padding: "8px 15px",
    backgroundColor: colors.tagBackground,
    color: colors.textDark,
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
  },
};

const BlogSingle = (props) => {
  const { id } = useParams();
  const BlogDetails = blogs.find((item) => item.id === id);

  // Agar blog ID na mile to fallback
  if (!BlogDetails) {
    return (
      <section style={styles.blogSection}>
        <div className="container">
          <h2>Blog post not found!</h2>
        </div>
      </section>
    );
  }

  return (
    <section style={styles.blogSection}>
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${props.blRight}`}>
            {/* --- Main Blog Post Card --- */}
            <div style={styles.contentWrapper}>
              {/* Main Image from dynamic data */}
              <img
                src={BlogDetails.blogSingleImg}
                alt={BlogDetails.title}
                style={styles.mainImage}
              />

              {/* Meta Info from dynamic data */}
              <div style={styles.metaInfo}>
                <span>
                  <i className="fa fa-user" style={{ marginRight: "5px" }}></i>{" "}
                  By{" "}
                  <Link to="/blog" style={styles.metaLink}>
                    {BlogDetails.author}
                  </Link>
                </span>
                <span>
                  <i
                    className="fa fa-calendar-alt"
                    style={{ marginRight: "5px" }}
                  ></i>{" "}
                  {BlogDetails.create_at}
                </span>
              </div>

              {/* Title from dynamic data */}
              <h2 style={styles.title}>{BlogDetails.title}</h2>

              {/* --- DYNAMIC CONTENT SECTIONS --- */}
              {BlogDetails.description && (
                <p style={styles.paragraph}>{BlogDetails.description}</p>
              )}

              {BlogDetails.quote && (
                <blockquote style={styles.blockquote}>
                  {BlogDetails.quote}
                </blockquote>
              )}

              {BlogDetails.conclusion && (
                <p style={styles.paragraph}>{BlogDetails.conclusion}</p>
              )}

              {/* Tags Section */}
              <div style={styles.tagShareSection}>
                <div style={styles.tagList}>
                  <span>Tags:</span>
                  <Link to="/blog" style={styles.tagLink}>
                    Chia
                  </Link>
                  <Link to="/blog" style={styles.tagLink}>
                    Health
                  </Link>
                  <Link to="/blog" style={styles.tagLink}>
                    Nutrition
                  </Link>
                </div>
              </div>
            </div>

            {/* --- AUTHOR BOX AND COMMENTS SECTION HATA DIYE GAYE HAIN --- */}
          </div>
          {/* Sidebar abhi bhi yahan hai */}
          <BlogSidebar blLeft={props.blLeft} />
        </div>
      </div>
    </section>
  );
};

export default BlogSingle;