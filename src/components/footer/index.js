import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png"; // Make sure the logo path is correct

// --- Dark Color Palette (Frosted Blueberry) ---
const colors = {
  backgroundDark: "#3d2b56",
  backgroundLighter: "#2c1f4a",
  accent: "#f5e5a4",
  textPrimary: "#e0e0e0",
  textSecondary: "#d1d1d1",
  textHighlight: "#ffffff",
};

const Footer = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const footerStyles = `
    .tp-site-footer {
      background-color: ${colors.backgroundDark};
      color: ${colors.textPrimary};
      position: relative;
      z-index: 1;
      border-top: 4px solid ${colors.accent};
    }
    .footer-shape1, .footer-shape2 { display: none; }
    .tp-site-footer .widget-title h3 { color: ${colors.accent}; font-weight: 600; }
    .tp-site-footer p { color: ${colors.textPrimary}; }
    .tp-site-footer a { color: ${colors.textSecondary}; transition: color 0.3s ease; text-decoration: none; }
    .tp-site-footer a:hover { color: ${colors.accent}; }
    .tp-site-footer .logo a { color: ${colors.textHighlight}; font-weight: 600; }
    .tp-site-footer .logo img { filter: brightness(0) invert(1); }
    .contact-ft ul li i { color: ${colors.accent}; }
    .about-widget ul li a { background-color: rgba(245, 229, 164, 0.1); color: ${colors.textHighlight}; border-radius: 50%; transition: all 0.3s ease; }
    .about-widget ul li a:hover { background-color: ${colors.accent}; color: ${colors.backgroundDark}; }
    .newsletter-widget form input { background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(245, 229, 164, 0.2); color: ${colors.textHighlight}; }
    .newsletter-widget form input::placeholder { color: ${colors.textSecondary}; }
    .newsletter-widget form button { background-color: ${colors.accent}; color: ${colors.backgroundDark}; }

   
       
    .tp-lower-footer {
      background-color: ${colors.backgroundLighter};
      border-top: 1px solid rgba(245, 229, 164, 0.1);
    }
    
    .tp-lower-footer .row .col {
        display: flex;
        justify-content: space-between; /* Pushes items to opposite ends */
        align-items: center;
        flex-wrap: wrap; /* Helps on small screens */
        gap: 15px; /* Adds space if items wrap on small screens */
    }

    .tp-lower-footer .copyright {
      color: #b0aacc;
      margin: 0; /* Remove default paragraph margin */
    }
    .tp-lower-footer .copyright a {
      color: ${colors.accent};
      font-weight: 600;
    }
    .tp-lower-footer .copyright a:hover {
      text-decoration: underline;
    }
    
    /* New styles for the policy links */
    .footer-policy-links a {
        color: #b0aacc; /* Same color as copyright text for consistency */
        margin-left: 20px;
    }
    .footer-policy-links a:hover {
        color: ${colors.accent}; /* Highlight on hover */
    }
  `;

  return (
    <>
      <style>{footerStyles}</style>

      <footer className="tp-site-footer">
        {/* --- UPPER FOOTER (Unchanged) --- */}
        <div className="tp-upper-footer">
          <div className="container">
            <div className="row">
              {/* All 4 columns are exactly the same */}
              <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="widget about-widget">
                  <div className="logo widget-title">
                    <Link onClick={ClickHandler} to="/">
                      <img src={Logo} alt="ft-logo" /> Chia Seeds
                    </Link>
                  </div>

                  <ul>
                    <li>
                      <Link to="https://www.instagram.com/naraaglobal?utm_source=qr&igsh=NGVxOW5idmtzN2x1">
                        <i className="ti-instagram"></i>
                      </Link>
                    </li>
                    {/* ✅ FIX: Corrected class from 'ti-linkdin' to 'ti-linkedin' and updated the link */}
                    <li>
                      <Link to="https://www.linkedin.com/company/naraaglobal/?viewAsMember=true">
                        <i className="ti-linkedin"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="widget tp-service-link-widget">
                  <div className="widget-title">
                    <h3>Contact</h3>
                  </div>
                  <div className="contact-ft">
                    <ul>
                      <li>
                        <i className="fi flaticon-pin"></i> KAVTHA RAILWAY,
                        KAVTHA, TA DEOLI WARDHA, MAHARASHTRA, 442302
                      </li>
                      <li>
                        <i className="fi flaticon-call"></i>+91 7620945925
                      </li>
                      <li>
                        <i className="fi flaticon-envelope"></i>{" "}
                        hello@naraaglobal.com
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="widget link-widget">
                  <div className="widget-title">
                    <h3>My Account</h3>
                  </div>
                  <ul>
                    <li>
                      <Link onClick={ClickHandler} to="/about">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/shop">
                        Shop
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/blog">
                        Blogs
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/contact">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="widget newsletter-widget">
                  <div className="widget-title">
                    <h3>Newsletter</h3>
                  </div>
                  <p>You will be notified when something new will appear.</p>
                  <form>
                    <div className="input-1">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address *"
                        required
                      />
                    </div>
                    <div className="submit clearfix">
                      <button type="submit">
                        <i className="ti-email"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- LOWER FOOTER (Updated Layout) --- */}
        <div className="tp-lower-footer">
          <div className="container">
            <div className="row">
              <div className="col col-xs-12">
                {/* Left Side: Copyright Text */}
                <p className="copyright">
                  Copyright © 2025 Chia Seeds by{" "}
                  <Link onClick={ClickHandler} to="/">
                    naraaglobal
                  </Link>
                  . All Rights Reserved.
                </p>

                {/* Right Side: Policy Links */}
                <div className="footer-policy-links">
                  <Link onClick={ClickHandler} to="/termandcond">
                    Terms & Conditions
                  </Link>
                  <Link onClick={ClickHandler} to="/privacypolicy">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ... (footer shapes) ... */}
      </footer>
    </>
  );
};

export default Footer;
