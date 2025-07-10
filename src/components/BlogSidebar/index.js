import React from "react";
import { Link } from "react-router-dom";
import blogs from "../../api/blogs";

// Author ki image ke liye ek placeholder istemal kiya gaya hai
import authorImg from "../../images/team/img-1.jpg";

// --- Color Palette (Aapke theme se match karta hua) ---
const colors = {
  primaryButton: "#878fba",
  textDark: "#3d2b56",
  textLight: "#ffffff",
  cardBackground: "rgba(255, 255, 255, 0.7)",
  borderColor: "rgba(135, 143, 186, 0.2)",
  tagBackground: "rgba(135, 143, 186, 0.15)",
};

// --- Styles ---
const styles = {
  sidebarWrapper: {
    padding: "30px",
    backgroundColor: colors.cardBackground,
    borderRadius: "20px",
    border: `1px solid ${colors.borderColor}`,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
  },
  widget: {
    marginBottom: "40px",
  },
  widgetTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: colors.textDark,
    paddingBottom: "10px",
    marginBottom: "20px",
    borderBottom: `2px solid ${colors.borderColor}`,
  },
  // About Widget Styles
  aboutWidget: {
    textAlign: "center",
  },
  profileImageHolder: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "0 auto 20px",
    border: `4px solid ${colors.textLight}`,
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  profileName: {
    fontSize: "20px",
    fontWeight: "700",
    color: colors.textDark,
    margin: "0 0 10px 0",
  },
  profileBio: {
    fontSize: "15px",
    color: colors.textDark,
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  socialList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    gap: "12px",
  },
  socialLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "38px",
    height: "38px",
    backgroundColor: colors.tagBackground,
    color: colors.primaryButton,
    borderRadius: "50%",
    transition: "all 0.3s ease",
  },
  // Search Widget Styles
  searchContainer: {
    position: "relative",
  },
  searchInput: {
    width: "100%",
    height: "50px",
    padding: "10px 55px 10px 20px",
    border: `1px solid ${colors.borderColor}`,
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: colors.textDark,
    fontSize: "16px",
    outline: "none",
  },
  searchButton: {
    position: "absolute",
    right: "5px",
    top: "5px",
    width: "40px",
    height: "40px",
    backgroundColor: colors.primaryButton,
    color: colors.textLight,
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  // Recent Post Styles
  recentPostItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  // === YAHAN BADLAV KIYA GAYA HAI ===
  recentPostImage: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "50%", // Isse image poori tarah gol ho jaayegi
    flexShrink: 0,
  },
  recentPostTitle: {
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "1.4",
    marginBottom: "5px",
  },
  recentPostLink: {
    color: colors.textDark,
    textDecoration: "none",
  },
  recentPostDate: {
    fontSize: "13px",
    color: colors.primaryButton,
  },
  // Tag Styles
  tagList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  tagLink: {
    display: "inline-block",
    padding: "8px 15px",
    backgroundColor: colors.tagBackground,
    color: colors.textDark,
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },
  // CTA Widget
  ctaWidget: {
    backgroundColor: colors.primaryButton,
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
  },
  ctaTitle: {
    color: colors.textLight,
    fontSize: "24px",
    fontWeight: "700",
    lineHeight: "1.3",
  },
  ctaText: {
    color: colors.textLight,
    opacity: 0.9,
    margin: "15px 0 25px 0",
  },
  ctaButton: {
    display: "inline-block",
    padding: "12px 30px",
    backgroundColor: colors.textLight,
    color: colors.textDark,
    fontWeight: "bold",
    borderRadius: "10px",
    textDecoration: "none",
    transition: "all 0.3s ease",
  },
};

const BlogSidebar = (props) => {
  const SubmitHandler = (e) => e.preventDefault();
  const ClickHandler = () => window.scrollTo(10, 0);

  const tags = [
    "Nutrition",
    "Recipes",
    "Health",
    "Smoothie",
    "Fitness",
    "Organic",
    "Lifestyle",
  ];

  return (
    <div className={`col col-lg-4 col-12 ${props.blLeft}`}>
      <div style={styles.sidebarWrapper}>
        {/* About Widget */}
        <div style={{ ...styles.widget, ...styles.aboutWidget }}>
          <div style={styles.profileImageHolder}>
            <img src={authorImg} alt="Author" style={styles.profileImage} />
          </div>
          <h4 style={styles.profileName}>Jenny Watson</h4>
          <p style={styles.profileBio}>
            Welcome! I'm a health enthusiast sharing the amazing benefits and
            delicious recipes for a healthier life with chia.
          </p>
          <ul style={styles.socialList}>
            <li>
              <Link to="/blog" style={styles.socialLink}>
                <i className="fab fa-facebook-f"></i>
              </Link>
            </li>
            <li>
              <Link to="/blog" style={styles.socialLink}>
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link to="/blog" style={styles.socialLink}>
                <i className="fab fa-instagram"></i>
              </Link>
            </li>
            <li>
              <Link to="/blog" style={styles.socialLink}>
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </li>
          </ul>
        </div>

        {/* Search Widget */}
        <div style={styles.widget}>
          <h3 style={styles.widgetTitle}>Search</h3>
          <form onSubmit={SubmitHandler} style={styles.searchContainer}>
            <input
              type="text"
              style={styles.searchInput}
              placeholder="Search Post.."
            />
            <button type="submit" style={styles.searchButton}>
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>

        {/* Recent Posts Widget */}
        <div style={styles.widget}>
          <h3 style={styles.widgetTitle}>Related Posts</h3>
          <div>
            {blogs.slice(0, 3).map((blog, Bitem) => (
              <div style={styles.recentPostItem} key={Bitem}>
                <img src={blog.screens} alt="" style={styles.recentPostImage} />
                <div>
                  <h4 style={styles.recentPostTitle}>
                    <Link
                      onClick={ClickHandler}
                      to={`/blog-single/${blog.id}`}
                      style={styles.recentPostLink}
                    >
                      {blog.title}
                    </Link>
                  </h4>
                  <span style={styles.recentPostDate}>{blog.create_at}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tags Widget */}
        <div style={styles.widget}>
          <h3 style={styles.widgetTitle}>Tags</h3>
          <ul style={styles.tagList}>
            {tags.map((tag) => (
              <li key={tag}>
                <Link onClick={ClickHandler} to="/blog" style={styles.tagLink}>
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Widget */}
        <div style={styles.ctaWidget}>
          <h2 style={styles.ctaTitle}>
            How We Can <br /> Help You!
          </h2>
          <p style={styles.ctaText}>
            Have questions about our products or your health journey? We're here
            to help.
          </p>
          <Link onClick={ClickHandler} to="/contact" style={styles.ctaButton}>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
