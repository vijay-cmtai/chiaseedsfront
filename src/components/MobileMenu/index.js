import React, { Component } from "react";
import { Collapse, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

// --- CSS Styles (as a string, all fixes included) ---
const mobileMenuStyles = `
    /* === MOBILE MENU TRIGGER (HAMBURGER ICON) === */
    .showmenu {
        display: none; /* Desktop par hide rahega */
    }
    @media (max-width: 991px) {
        .showmenu {
            display: inline-block; /* Sirf mobile par dikhega */
        }
    }

    .showmenu .navbar-toggler {
        background: #f8f5f0 !important;
        border: none !important;
        width: 40px;
        height: 40px;
        border-radius: 50% !important;
        padding: 0 !important;
        position: relative;
        transition: all 0.2s ease;
    }
    .showmenu .navbar-toggler:hover {
        background: #e9e4dc !important;
    }
    .showmenu .navbar-toggler .icon-bar {
        background-color: #3d2b56 !important;
        height: 2px;
        width: 18px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        transition: all 0.3s ease;
    }
    .showmenu .navbar-toggler .icon-bar.first-angle { top: 13px; }
    .showmenu .navbar-toggler .icon-bar.middle-angle { top: 19px; }
    .showmenu .navbar-toggler .icon-bar.last-angle { top: 25px; }


    /* === MOBILE MENU PANEL (SIDEBAR) === */
    .mobileMenu {
        background: #fff;
        position: fixed;
        left: -300px;
        top: 0;
        width: 300px;
        height: 100%;
        z-index: 9999;
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease-in-out;
        opacity: 0;
    }

    .mobileMenu.show {
        left: 0;
        opacity: 1;
    }

    .mobileMenu .menu-close {
        position: relative;
        top: 0;
        width: 100%;
        height: 60px;
        background: #f5f5f5;
        text-align: right;
    }

    .mobileMenu .menu-close .clox {
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        display: inline-block;
        cursor: pointer;
        font-size: 20px;
        color: #333;
    }

    .mobileMenu .responsivemenu {
        list-style: none;
        padding: 20px 0;
        margin: 0;
        height: calc(100% - 60px);
        overflow-y: auto;
    }

    .mobileMenu .responsivemenu li {
        display: block;
        padding: 0;
        margin: 0;
        border-bottom: 1px solid #f0f0f0;
    }

    .mobileMenu .responsivemenu li a,
    .mobileMenu .responsivemenu li p {
        padding: 15px 20px;
        display: block;
        color: #333; /* Black text */
        text-decoration: none;
        font-size: 16px;
        text-transform: capitalize;
        margin: 0;
        position: relative;
        cursor: pointer;
        font-weight: 500;
    }

    .mobileMenu .responsivemenu li p > i {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        transition: all 0.3s ease;
    }

    .mobileMenu .responsivemenu li .card ul li a {
        padding-left: 35px;
    }

    /* === AUTH BUTTONS CONTAINER === */
    .mobileMenu .responsivemenu .auth-buttons-container {
        margin-top: 20px;
        padding: 0 20px 20px 20px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        border-bottom: none; /* Remove bottom border for this special li */
    }

    /* Common style for all auth buttons */
    .mobileMenu .responsivemenu .auth-buttons-container .btn {
        display: block;
        width: 100%;
        height:40px
        text-align: center;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        font-size: 16px;
        transition: all 0.3s ease;
        border: 2px solid transparent;
        cursor: pointer;
        line-height: 1;
    }

    .mobileMenu .responsivemenu .auth-buttons-container .btn-login {
        background-color: transparent;
        border-color: #878fba;
        color: #878fba;
    }
    .mobileMenu .responsivemenu .auth-buttons-container .btn-login:hover {
        background-color: #878fba;
        color: #fff;
    }

    .mobileMenu .responsivemenu .auth-buttons-container .btn-signup {
        background-color: #878fba;
        border-color: #878fba;
        color: #fff;
    }
    .mobileMenu .responsivemenu .auth-buttons-container .btn-signup:hover {
        background-color: #6c749d;
        border-color: #6c749d;
    }

    /* === SIGN OUT BUTTON FIX === */
    .mobileMenu .responsivemenu .auth-buttons-container .btn-logout {
        background-color: #e74c3c;  /* Solid red background */
        color: #ffffff;            /* White text */
        border-color: #e74c3c;     /* Matching border */
    }
    .mobileMenu .responsivemenu .auth-buttons-container .btn-logout:hover {
        background-color: #c0392b;  /* Darker red on hover */
        border-color: #c0392b;
    }
`;

const menus = [
  { id: 1, title: "Home", link: "/home" },
  { id: 2, title: "About", link: "/about" },
  { id: 3, title: "Shop", link: "/shop" },
  { id: 5, title: "Blog", link: "/blog" },
  { id: 88, title: "Contact", link: "/contact" },
];

const authMenus = [
  { id: 991, title: "Login", link: "/login", className: "btn-login" },
  { id: 992, title: "Sign Up", link: "/register", className: "btn-signup" },
];

export default class MobileMenu extends Component {
  state = {
    isMenuShow: false,
    isOpen: 0,
  };

  menuHandler = () => {
    this.setState({ isMenuShow: !this.state.isMenuShow });
  };

  setIsOpen = (id) => () => {
    this.setState({ isOpen: id === this.state.isOpen ? 0 : id });
  };

  ClickHandler = () => {
    this.setState({ isMenuShow: false });
  };

  handleLogoutClick = () => {
    if (this.props.onLogout) {
      this.props.onLogout();
    }
    this.ClickHandler();
  };

  render() {
    const { isMenuShow, isOpen } = this.state;
    const { isAuthenticated } = this.props;

    return (
      <div>
        <style>{mobileMenuStyles}</style>

        <div className={`mobileMenu ${isMenuShow ? "show" : ""}`}>
          <div className="menu-close">
            <div className="clox" onClick={this.menuHandler}>
              <i className="ti-close"></i>
            </div>
          </div>

          <ul className="responsivemenu">
            {menus.map((item) => (
              <li key={item.id}>
                <Link onClick={this.ClickHandler} to={item.link}>
                  {item.title}
                </Link>
              </li>
            ))}

            {/* Authentication Logic */}
            {isAuthenticated ? (
              <li className="auth-buttons-container">
                <button
                  onClick={this.handleLogoutClick}
                  className="btn btn-logout"
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <li className="auth-buttons-container">
                {authMenus.map((item) => (
                  <Link
                    key={item.id}
                    onClick={this.ClickHandler}
                    to={item.link}
                    className={`btn ${item.className}`}
                  >
                    {item.title}
                  </Link>
                ))}
              </li>
            )}
          </ul>
        </div>

        <div className="showmenu" onClick={this.menuHandler}>
          <button type="button" className="navbar-toggler open-btn">
            <span className="icon-bar first-angle"></span>
            <span className="icon-bar middle-angle"></span>
            <span className="icon-bar last-angle"></span>
          </button>
        </div>
      </div>
    );
  }
}
