import React from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";

// --- Color Palette from your Hero component ---
const colors = {
  textDark: "#3d2b56",
  textBody: "#5a506b", // Slightly lighter for better readability
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

// --- Styles for the content page (same as T&C) ---
const styles = {
  section: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    padding: "120px 0 80px 0",
    minHeight: "100vh",
  },
  contentBox: {
    background: "rgba(255, 255, 255, 0.85)", // Frosted glass effect
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "40px 50px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    maxWidth: "900px",
    margin: "0 auto",
  },
  h1: {
    color: colors.textDark,
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "48px",
    fontWeight: 700,
  },
  h2: {
    color: colors.textDark,
    marginTop: "30px",
    marginBottom: "15px",
    fontSize: "24px",
  },
  p: {
    color: colors.textBody,
    lineHeight: "1.8",
    marginBottom: "15px",
  },
  ul: {
    paddingLeft: "20px",
    color: colors.textBody,
    marginBottom: "15px",
  },
  li: {
    marginBottom: "10px",
    lineHeight: "1.8",
  },
};

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <section style={styles.section}>
        <div className="container">
          <div style={styles.contentBox}>
            <h1 style={styles.h1}>Privacy Policy</h1>

            <p style={styles.p}>
              Your privacy is important to us. It is Chia Seeds E-commerce's
              policy to respect your privacy regarding any information we may
              collect from you across our website.
            </p>

            <h2 style={styles.h2}>1. Information We Collect</h2>
            <p style={styles.p}>
              We only ask for personal information when we truly need it to
              provide a service to you. We collect it by fair and lawful means,
              with your knowledge and consent. We collect information such as:
            </p>
            <ul style={styles.ul}>
              <li style={styles.li}>
                Name and contact information including email address.
              </li>
              <li style={styles.li}>Shipping and billing address.</li>
              <li style={styles.li}>Order history and payment information.</li>
            </ul>

            <h2 style={styles.h2}>2. How We Use Your Information</h2>
            <p style={styles.p}>
              We use the information we collect to process your transactions,
              manage your orders, and communicate with you about your account or
              our products.
            </p>

            <h2 style={styles.h2}>3. Data Security</h2>
            <p style={styles.p}>
              We protect your personal information within commercially
              acceptable means to prevent loss and theft, as well as
              unauthorized access, disclosure, copying, use or modification.
            </p>

            <h2 style={styles.h2}>4. Cookies</h2>
            <p style={styles.p}>
              We use cookies to help us remember and process the items in your
              shopping cart. You can choose to disable cookies through your
              browser options.
            </p>

            <h2 style={styles.h2}>5. Your Rights</h2>
            <p style={styles.p}>
              You have the right to access, correct, or delete your personal
              information that we hold. Please contact us if you wish to
              exercise these rights.
            </p>

            <p style={styles.p}>
              <strong>Last updated:</strong> October 26, 2023
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
