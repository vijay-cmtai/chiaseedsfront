import React from "react";
import { Link } from "react-router-dom";
import blogs from "../../api/blogs";

const colors = {
  primary: "#878fba",
  textDark: "#3d2b56",
  textMuted: "#5a506b",
  textLight: "#ffffff",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

const styles = {
  // --- YAHAN BADLAAV KIYA GAYA HAI ---
  section: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    padding: "80px 0", // Padding kam ki gayi
  },
  sectionTitle: {
    textAlign: "center",
    marginBottom: "60px",
  },
  h2: {
    fontSize: "40px",
    fontWeight: "700",
    color: colors.textDark,
  },
  p: {
    color: colors.textMuted,
    lineHeight: "1.8",
    maxWidth: "550px",
    margin: "0 auto",
  },
  // --- YAHAN BADLAAV KIYA GAYA HAI ---
  blogItem: {
    background: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    height: "100%", // Height ko 100% kiya gaya taaki sab cards barabar ho
    display: "flex",
    flexDirection: "column",
  },
  // --- YAHAN BADLAAV KIYA GAYA HAI ---
  blogImg: {
    overflow: "hidden",
    position: "relative",
    "& img": {
      width: "100%",
      height: "200px", // Image height ko balanced kiya gaya
      objectFit: "cover",
    },
  },
  blogContent: {
    padding: "20px 25px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
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
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: 1.4,
  },
  cardTitleLink: {
    color: colors.textDark,
    textDecoration: "none",
  },
  readMoreBtn: {
    display: "inline-flex",
    alignItems: "center",
    marginTop: "20px",
    padding: "8px 20px",
    color: colors.primary,
    backgroundColor: "transparent",
    border: `1px solid ${colors.primary}`,
    borderRadius: "5px",
    fontWeight: 500,
    textDecoration: "none",
  },
};

const BlogSection = () => {
  return (
    <section className="blog-area" style={styles.section}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div style={styles.sectionTitle}>
              <h2 style={styles.h2}>News And Blog</h2>
              <p style={styles.p}>
                Stay updated with our latest articles, tips, and company news.
              </p>
            </div>
          </div>
        </div>
        <div className="blog-wrap">
          <div className="row">
            {blogs.slice(0, 3).map((blog) => (
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex mb-4"
                key={blog.id}
              >
                <div style={styles.blogItem} className="blog-item-wrapper">
                  <Link to={`/blog-single/${blog.id}`} style={styles.blogImg}>
                    <img src={blog.screens} alt={blog.title} />
                  </Link>
                  <div style={styles.blogContent}>
                    <div>
                      <ul style={styles.metaList}>
                        <li>
                          <i
                            className="fa fa-calendar-alt"
                            style={styles.metaIcon}
                          ></i>
                          {blog.create_at}
                        </li>
                        <li>
                          <i
                            className="fa fa-heart"
                            style={styles.metaIcon}
                          ></i>
                          {blog.comment} Comments
                        </li>
                      </ul>
                      <h3 style={styles.cardTitle}>
                        <Link
                          to={`/blog-single/${blog.id}`}
                          style={styles.cardTitleLink}
                          className="card-title-link"
                        >
                          {blog.title}
                        </Link>
                      </h3>
                    </div>
                    <Link
                      to={`/blog-single/${blog.id}`}
                      style={styles.readMoreBtn}
                      className="read-more-btn"
                    >
                      Read More
                      <i className="fa fa-angle-double-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .blog-item-wrapper {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .blog-item-wrapper:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }
        .blog-item-wrapper .blog-img img {
          transition: transform 0.4s ease;
        }
        .blog-item-wrapper:hover .blog-img img {
          transform: scale(1.08);
        }
        .card-title-link {
          transition: color 0.3s ease;
        }
        .card-title-link:hover {
          color: ${colors.primary} !important;
        }
        .read-more-btn {
           transition: all 0.3s ease;
        }
        .read-more-btn i {
          margin-left: 8px;
          transition: transform 0.3s ease;
        }
        .read-more-btn:hover {
          background-color: ${colors.primary} !important;
          color: ${colors.textLight} !important;
        }
        .read-more-btn:hover i {
          transform: translateX(5px);
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
