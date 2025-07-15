import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlogSidebar from "../BlogSidebar";
import VideoModal from "../../components/ModalVideo";
import blogs from "../../api/blogs";

const colors = {
  primary: "#878fba",
  textDark: "#3d2b56",
  textMuted: "#5a506b",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
  textLight: "#ffffff",
  cardBackground: "rgba(255, 255, 255, 0.75)",
  borderColor: "rgba(135, 143, 186, 0.25)",
};

const styles = {
  blogSection: {
    padding: "100px 0",
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
  },
  postCard: {
    padding: "30px",
    backgroundColor: colors.cardBackground,
    borderRadius: "20px",
    border: `1px solid ${colors.borderColor}`,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.07)",
    marginBottom: "40px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
    },
  },
  mediaHolder: {
    position: "relative",
    borderRadius: "15px",
    overflow: "hidden",
    marginBottom: "25px",
  },
  postImage: {
    width: "100%",
    display: "block",
  },
  videoButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
  postTitle: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "15px",
  },
  titleLink: {
    color: colors.textDark,
    textDecoration: "none",
    transition: "color 0.3s ease",
    "&:hover": {
      color: colors.primary,
    },
  },
  postExcerpt: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: colors.textMuted,
    marginBottom: "25px",
  },
  readMoreLink: {
    fontWeight: "bold",
    color: colors.primary,
    textDecoration: "none",
    fontSize: "16px",
    transition: "color 0.3s ease",
    "&:hover": {
      color: colors.textDark,
    },
  },
  paginationWrapper: {
    textAlign: "center",
    marginTop: "20px",
  },
  paginationList: {
    display: "inline-flex",
    gap: "10px",
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  paginationLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "45px",
    height: "45px",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    color: colors.textDark,
    borderRadius: "10px",
    textDecoration: "none",
    transition: "all 0.3s ease",
  },
  paginationLinkActive: {
    backgroundColor: colors.primary,
    color: colors.textLight,
  },
};

const BlogList = (props) => {
  // --- ClickHandler HATA DIYA GAYA HAI ---

  const [activePage, setActivePage] = useState(1);

  return (
    <section style={styles.blogSection}>
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${props.blRight}`}>
            <div>
              {blogs.slice(0, 4).map((blog, bitem) => (
                <div style={styles.postCard} key={bitem}>
                  <div style={styles.mediaHolder}>
                    <img
                      src={blog.blogSingleImg}
                      alt={blog.title}
                      style={styles.postImage}
                    />
                    {blog.video && (
                      <div style={styles.videoButton}>
                        <VideoModal />
                      </div>
                    )}
                  </div>
                  <div style={styles.metaInfo}>
                    <span>
                      <i className="fa fa-user"></i> By{" "}
                      {/* --- onClick HATA DIYA GAYA HAI --- */}
                      <Link
                        to={`/blog-single/${blog.id}`}
                        style={styles.metaLink}
                      >
                        {blog.author}
                      </Link>
                    </span>
                    <span>
                      <i className="fa fa-comment"></i> Comments {blog.comment}
                    </span>
                    <span>
                      <i className="fa fa-calendar-alt"></i> {blog.create_at}
                    </span>
                  </div>
                  <div>
                    <h3 style={styles.postTitle}>
                      {/* --- onClick HATA DIYA GAYA HAI --- */}
                      <Link
                        to={`/blog-single/${blog.id}`}
                        style={styles.titleLink}
                      >
                        {blog.title}
                      </Link>
                    </h3>
                    <p style={styles.postExcerpt}>
                      Law is a great career path if you want to build a broad
                      skill set that includes everything from critical thinking
                      and strategic planning to communications. If you love
                      rising to a challenge.
                    </p>
                    {/* --- onClick HATA DIYA GAYA HAI --- */}
                    <Link
                      to={`/blog-single/${blog.id}`}
                      style={styles.readMoreLink}
                    >
                      READ MORE »
                    </Link>
                  </div>
                </div>
              ))}

              {/* Pagination remains the same */}
              <div style={styles.paginationWrapper}>
                <ul style={styles.paginationList}>
                  <li>
                    <Link
                      to="/blog"
                      aria-label="Previous"
                      style={styles.paginationLink}
                    >
                      <i className="fa fa-angle-left"></i>
                    </Link>
                  </li>
                  {[1, 2, 3].map((page) => (
                    <li key={page}>
                      <Link
                        to="/blog"
                        style={
                          activePage === page
                            ? {
                                ...styles.paginationLink,
                                ...styles.paginationLinkActive,
                              }
                            : styles.paginationLink
                        }
                        onClick={() => setActivePage(page)}
                      >
                        {page}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      to="/blog"
                      aria-label="Next"
                      style={styles.paginationLink}
                    >
                      <i className="fa fa-angle-right"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <BlogSidebar blLeft={props.blLeft} />
        </div>
      </div>
      {/* Simple hover effects using CSS for better performance */}
      <style>{`
        .postCard:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        .titleLink:hover {
          color: ${colors.primary} !important;
        }
         .readMoreLink:hover {
          color: ${colors.textDark} !important;
        }
      `}</style>
    </section>
  );
};

export default BlogList;