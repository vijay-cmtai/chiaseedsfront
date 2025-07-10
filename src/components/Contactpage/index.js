import React from "react";
import ContactFrom from "../ContactFrom";

// --- Color Palette (Matching your theme) ---
const colors = {
  primaryButton: "#878fba",
  textDark: "#3d2b56",
  textLight: "#ffffff",
  cardBackground: "rgba(255, 255, 255, 0.75)",
  borderColor: "rgba(135, 143, 186, 0.25)",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

// --- Styles (Unchanged) ---
const styles = {
  contactSection: {
    padding: "100px 0",
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
  },
  card: {
    padding: "40px",
    backgroundColor: colors.cardBackground,
    borderRadius: "20px",
    border: `1px solid ${colors.borderColor}`,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.07)",
    height: "100%",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: colors.textDark,
    paddingBottom: "15px",
    marginBottom: "25px",
    borderBottom: `2px solid ${colors.borderColor}`,
  },
  infoText: {
    fontSize: "16px",
    color: colors.textDark,
    lineHeight: "1.7",
    marginBottom: "30px",
  },
  contactList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  contactItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
  },
  iconWrapper: {
    flexShrink: 0,
    width: "50px",
    height: "50px",
    backgroundColor: colors.primaryButton,
    color: colors.textLight,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },
  textWrapper: {},
  itemTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: colors.textDark,
    margin: "0 0 5px 0",
  },
  itemDetail: {
    fontSize: "16px",
    color: colors.textDark,
    lineHeight: "1.6",
    margin: 0,
  },
  // Added for email labels
  emailLabel: {
    fontSize: "14px",
    color: colors.textDark,
    fontWeight: "600",
    display: "block",
    marginTop: "8px",
  },
  itemLink: {
    fontSize: "16px",
    color: colors.textDark,
    lineHeight: "1.6",
    margin: 0,
    textDecoration: "none",
    display: "block",
    marginBottom: "4px",
  },
  mapContainer: {
    marginTop: "60px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.2)",
    height: "450px",
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
};

const Contactpage = () => {
  return (
    <section style={styles.contactSection}>
      <div className="container">
        <div className="row align-items-stretch">
          {/* Left Column: Contact Details */}
          <div className="col col-lg-6 col-12 mb-4 mb-lg-0">
            <div style={styles.card}>
              <h2 style={styles.title}>Contact Us</h2>
              <p style={styles.infoText}>Your trust, our commitment.</p>
              <ul style={styles.contactList}>
                {/* Address */}
                <li style={styles.contactItem}>
                  <div style={styles.iconWrapper}>
                    <i className="fa fa-map-marker-alt"></i>
                  </div>
                  <div style={styles.textWrapper}>
                    <h5 style={styles.itemTitle}>Address</h5>
                    <p style={styles.itemDetail}>
                      Kavtha Railway, Taluka Deoli, District Wardha,
                      <br />
                      Maharashtra – 442302
                      <br />
                      <small>
                        (Manufacturing Plant & Office – Same Location)
                      </small>
                    </p>
                  </div>
                </li>
                {/* Phone */}
                <li style={styles.contactItem}>
                  <div style={styles.iconWrapper}>
                    <i className="fa fa-phone-alt"></i>
                  </div>
                  <div style={styles.textWrapper}>
                    <h5 style={styles.itemTitle}>Phone</h5>
                    {/* The phone number you provided seems incomplete, I've left it as is. */}
                    <a href="tel:+91 7620945925" style={styles.itemLink}>
                      +91 7620945925
                    </a>
                  </div>
                </li>
                {/* Email */}
                <li style={styles.contactItem}>
                  <div style={styles.iconWrapper}>
                    <i className="fa fa-envelope"></i>
                  </div>
                  <div style={styles.textWrapper}>
                    <h5 style={styles.itemTitle}>Email</h5>
                    <span style={styles.emailLabel}>General Inquiries:</span>
                    <a
                      href="mailto:info@naraaglobal.com"
                      style={styles.itemLink}
                    >
                      info@naraaglobal.com
                    </a>

                    <span style={styles.emailLabel}>Customer Support:</span>
                    <a
                      href="mailto:hello@naraaglobal.com"
                      style={styles.itemLink}
                    >
                      hello@naraaglobal.com
                    </a>

                    <span style={styles.emailLabel}>
                      Business/Partnerships:
                    </span>
                    <a
                      href="mailto:business@naraaglobal.com"
                      style={styles.itemLink}
                    >
                      business@naraaglobal.com
                    </a>

                    <span style={styles.emailLabel}>Founder & CEO:</span>
                    <a
                      href="mailto:sahil.pardake@naraaglobal.com"
                      style={styles.itemLink}
                    >
                      sahil.pardake@naraaglobal.com
                    </a>
                  </div>
                </li>
                {/* Working Hours */}
                <li style={styles.contactItem}>
                  <div style={styles.iconWrapper}>
                    <i className="fa fa-clock"></i>
                  </div>
                  <div style={styles.textWrapper}>
                    <h5 style={styles.itemTitle}>Working Hours</h5>
                    <p style={styles.itemDetail}>
                      Monday to Saturday – 9:00 AM to 6:00 PM
                      <br />
                      Closed on Sundays
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="col col-lg-6 col-12">
            <div style={styles.card}>
              <h2 style={styles.title}>Get In Touch</h2>
              <ContactFrom />
            </div>
          </div>
        </div>

        {/* Google Maps Row */}
        <div className="row">
          <div className="col col-xs-12">
            <div style={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.406222677683!2d78.374496!3d20.734323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd47e0a6d17e339%3A0x89e0e4f2010265f0!2sKavtha!5e0!3m2!1sen!2sin!4v1675843837080!5m2!1sen!2sin"
                style={styles.iframe}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Naraa Global Enterprises Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactpage;
