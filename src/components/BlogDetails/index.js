import React from "react";
import { Link, useParams } from "react-router-dom";
import blogs from "../../api/blogs";
import BlogSidebar from "../../components/BlogSidebar";

// Placeholder images from the original code
import blog3 from "../../images/blog-details/comments-author/img-1.jpg";
import blog4 from "../../images/blog-details/comments-author/img-2.jpg";
import blog5 from "../../images/blog-details/comments-author/img-3.jpg";
import blog6 from "../../images/blog-details/author.jpg";
import gl1 from "../../images/blog/img-3.jpg";
import gl2 from "../../images/blog/img-2.jpg";

// --- Color Palette (Consistent with your theme) ---
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

// --- Styles for the new UI ---
const styles = {
  // Main Section
  blogSection: {
    padding: "100px 0",
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
  },
  // Main blog content card
  contentWrapper: {
    padding: "40px",
    backgroundColor: colors.cardBackground,
    borderRadius: "20px",
    border: `1px solid ${colors.borderColor}`,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.07)",
    marginBottom: "40px",
  },
  // Blog Post styles
  mainImage: {
    width: "100%",
    borderRadius: "15px",
    marginBottom: "25px",
  },
  metaInfo: {
    display: "flex",
    gap: "20px",
    color: colors.textMuted,
    marginBottom: "15px",
    fontSize: "14px",
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
  gallery: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    margin: "30px 0",
  },
  galleryImage: {
    width: "100%",
    borderRadius: "10px",
  },
  // Tags and Share
  tagShareSection: {
    paddingTop: "20px",
    borderTop: `1px solid ${colors.borderColor}`,
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
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
  // Author Box
  authorBox: {
    display: "flex",
    gap: "25px",
    padding: "30px",
    backgroundColor: "rgba(135, 143, 186, 0.1)",
    borderRadius: "15px",
    marginTop: "40px",
  },
  authorImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  authorName: {
    fontSize: "20px",
    fontWeight: "700",
    color: colors.textDark,
    textDecoration: "none",
    marginBottom: "10px",
    display: "block",
  },
  // Comments Section
  commentsWrapper: {
    padding: "40px",
    backgroundColor: colors.cardBackground,
    borderRadius: "20px",
    border: `1px solid ${colors.borderColor}`,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.07)",
  },
  commentsTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: "30px",
  },
  commentList: {
    listStyle: "none",
    padding: 0,
  },
  commentItem: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },
  commentImage: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
  },
  commentBody: {},
  commentMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  commentAuthor: {
    fontSize: "18px",
    fontWeight: "bold",
    color: colors.textDark,
  },
  commentDate: {
    fontSize: "13px",
    color: colors.textMuted,
  },
  commentText: {
    color: colors.textMuted,
  },
  replyLink: {
    color: colors.primary,
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: "14px",
  },
  // Comment Form
  commentForm: {
    marginTop: "40px",
  },
  formTextarea: {
    width: "100%",
    height: "120px",
    padding: "15px",
    border: `1px solid ${colors.borderColor}`,
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    fontSize: "16px",
    marginBottom: "15px",
  },
  formInputs: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },
  formInput: {
    width: "100%",
    height: "50px",
    padding: "10px 15px",
    border: `1px solid ${colors.borderColor}`,
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  formSubmit: {
    backgroundColor: colors.primary,
    color: colors.textLight,
    padding: "15px 35px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

const BlogSingle = (props) => {
  const { id } = useParams();
  const BlogDetails = blogs.find((item) => item.id === id);

  if (!BlogDetails) {
    return <div>Blog post not found!</div>; // Fallback for when no blog is found
  }

  const submitHandler = (e) => e.preventDefault();
  const ClickHandler = () => window.scrollTo(10, 0);

  return (
    <section style={styles.blogSection}>
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${props.blRight}`}>
            {/* Main Blog Post Card */}
            <div style={styles.contentWrapper}>
              <img
                src={BlogDetails.blogSingleImg}
                alt=""
                style={styles.mainImage}
              />
              <div style={styles.metaInfo}>
                <span>
                  <i className="fa fa-user"></i> By{" "}
                  <Link to="/blog" style={styles.metaLink}>
                    {BlogDetails.author}
                  </Link>
                </span>
                <span>
                  <i className="fa fa-comment"></i> Comments{" "}
                  {BlogDetails.comment}
                </span>
                <span>
                  <i className="fa fa-calendar-alt"></i> {BlogDetails.create_at}
                </span>
              </div>
              <h2 style={styles.title}>{BlogDetails.title}</h2>
              <p style={styles.paragraph}>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text.
              </p>
              <blockquote style={styles.blockquote}>
                Combined with a handful of model sentence structures, generate
                Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
                therefore always free from repetition.
              </blockquote>
              <p style={styles.paragraph}>
                I must explain to you how all this mistaken idea of denouncing
                pleasure and praising pain was born and I will give you a
                complete account of the system, and expound the actual teachings
                of the great explorer of the truth, the master-builder of human
                happiness.
              </p>
              <div style={styles.gallery}>
                <img src={gl1} alt="" style={styles.galleryImage} />
                <img src={gl2} alt="" style={styles.galleryImage} />
              </div>

              <div style={styles.tagShareSection}>
                <div style={styles.tagList}>
                  <span>Share:</span>
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

            {/* Author Box Card */}
            <div
              style={{
                ...styles.contentWrapper,
                display: "flex",
                gap: "25px",
                alignItems: "center",
              }}
            >
              <img
                src={blog6}
                alt="Author"
                style={{
                  ...styles.authorImage,
                  width: "120px",
                  height: "120px",
                }}
              />
              <div>
                <Link to="/blog" style={styles.authorName}>
                  Author: Jenny Watson
                </Link>
                <p style={{ ...styles.paragraph, marginBottom: 0 }}>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam.
                </p>
              </div>
            </div>

            {/* Comments Section Card */}
            <div style={styles.commentsWrapper}>
              <h3 style={styles.commentsTitle}>
                {BlogDetails.comment} Comments
              </h3>
              <ol style={styles.commentList}>
                <li style={styles.commentItem}>
                  <img src={blog3} alt="" style={styles.commentImage} />
                  <div style={styles.commentBody}>
                    <div style={styles.commentMeta}>
                      <h4 style={styles.commentAuthor}>John Abraham</h4>
                      <span style={styles.commentDate}>January 12, 2024</span>
                    </div>
                    <p style={styles.commentText}>
                      I will give you a complete account of the system, and
                      expound the actual teachings of the great explorer.
                    </p>
                    <Link to="/blog-single/1" style={styles.replyLink}>
                      Reply
                    </Link>
                  </div>
                </li>
                <li style={{ ...styles.commentItem, paddingLeft: "50px" }}>
                  {" "}
                  {/* Indented reply */}
                  <img src={blog4} alt="" style={styles.commentImage} />
                  <div style={styles.commentBody}>
                    <div style={styles.commentMeta}>
                      <h4 style={styles.commentAuthor}>Lily Watson</h4>
                      <span style={styles.commentDate}>January 12, 2024</span>
                    </div>
                    <p style={styles.commentText}>
                      I will give you a complete account of the system, and
                      expound the actual teachings.
                    </p>
                    <Link to="/blog-single/1" style={styles.replyLink}>
                      Reply
                    </Link>
                  </div>
                </li>
              </ol>

              {/* Comment Form */}
              <div style={styles.commentForm}>
                <h3 style={styles.commentsTitle}>Leave a Comment</h3>
                <form onSubmit={submitHandler}>
                  <textarea
                    style={styles.formTextarea}
                    placeholder="Write Your Comment..."
                  ></textarea>
                  <div style={styles.formInputs}>
                    <input
                      style={styles.formInput}
                      placeholder="Name"
                      type="text"
                    />
                    <input
                      style={styles.formInput}
                      placeholder="Email"
                      type="email"
                    />
                  </div>
                  <input
                    id="submit"
                    value="Post Comment"
                    type="submit"
                    style={styles.formSubmit}
                  />
                </form>
              </div>
            </div>
          </div>
          <BlogSidebar blLeft={props.blLeft} />
        </div>
      </div>
    </section>
  );
};

export default BlogSingle;
