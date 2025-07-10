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

// --- Styles for the content page ---
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

const TermsAndConditions = () => {
  return (
    <>
      <Header />
      <section style={styles.section}>
        <div className="container">
          <div style={styles.contentBox}>
            <h1 style={styles.h1}>Terms and Conditions</h1>

            <p style={styles.p}>
              Welcome to Chia Seeds E-commerce! These terms and conditions
              outline the rules and regulations for the use of our website and
              the purchase of our products.
            </p>

            <h2 style={styles.h2}>1. General</h2>
            <p style={styles.p}>
              By accessing this website, we assume you accept these terms and
              conditions. Do not continue to use Chia Seeds E-commerce if you do
              not agree to all of the terms and conditions stated on this page.
            </p>

            <h2 style={styles.h2}>2. Products and Orders</h2>
            <p style={styles.p}>
              All products are subject to availability. We reserve the right to
              limit the quantities of any products or services that we offer.
              All descriptions of products or product pricing are subject to
              change at any time without notice.
            </p>

            <h2 style={styles.h2}>3. Payments</h2>
            <p style={styles.p}>
              We accept various forms of payment as specified during the
              checkout process. By providing a payment method, you represent and
              warrant that you are authorized to use the designated payment
              method.
            </p>

            <h2 style={styles.h2}>4. Shipping and Delivery</h2>
            <p style={styles.p}>
              Shipping and delivery times are estimates only and cannot be
              guaranteed. We are not liable for any delays in shipments.
            </p>

            <h2 style={styles.h2}>5. Intellectual Property</h2>
            <p style={styles.p}>
              The service and its original content, features, and functionality
              are and will remain the exclusive property of Chia Seeds
              E-commerce and its licensors.
            </p>

            <h2 style={styles.h2}>6. Limitation of Liability</h2>
            <p style={styles.p}>
              In no event shall Chia Seeds E-commerce, nor its directors,
              employees, partners, agents, suppliers, or affiliates, be liable
              for any indirect, incidental, special, consequential or punitive
              damages.
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

export default TermsAndConditions;
