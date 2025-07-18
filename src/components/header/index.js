import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import Logo from "../../images/logo.png"; // Make sure this path is correct
import { Link, NavLink, useNavigate } from "react-router-dom";
import MobileMenu from "../../components/MobileMenu";
import { logout } from "../../features/auth/authSlice";

// Profile data fetch karne ke liye action import karein
import { getMyProfile } from "../../features/user/userSlice";

// --- Styles ---
const colors = {
  primary: "#878fba",
  primaryHover: "#6c749d",
  accent1: "#3d2b56",
  textLight: "#ffffff",
  headerBg: "#ffffff",
  borderColor: "#e5e5e5",
  dropdownBg: "#f8f5f0",
  textMuted: "#6c749d",
};

const headerStyles = `
    /* --- FIX #2: NAVBAR KO FIXED KARNE KE LIYE CSS CHANGES --- */
    header#header.site-header { 
        background-color: ${colors.headerBg} !important; 
        border-bottom: 1px solid ${colors.borderColor} !important; 
        position: fixed;      /* Pehle 'relative' tha, ab 'fixed' hai */
        top: 0;               /* Top se chipkaane ke liye */
        left: 0;              /* Full width ke liye */
        right: 0;             /* Full width ke liye */
        z-index: 100;         /* Sabse upar rakhne ke liye */
    } 

    #header .navigation-holder .navbar-nav > li > a { 
      color: ${colors.accent1} !important; 
      font-weight: 500 !important; 
      position: relative !important;
      z-index: 99 !important; /* Ensure links are clickable */
    } 

    #header .navigation-holder .navbar-nav > li > a:hover, 
    #header .navigation-holder .navbar-nav > li > a.active { 
      color: ${colors.primary} !important; 
    } 

    #header .header-right { 
        gap: 5px; 
        display: flex; 
        align-items: center; 
        justify-content: flex-end; 
        width: 100%; 
        padding-right: 0; 
        margin-left: auto; 
    } 

    #header .header-right .profile-toggle-btn, 
    #header .header-right .cart-toggle-btn, 
    #header .header-right .wishlist-toggle-btn { 
        color: ${colors.accent1} !important; 
        background: #f8f5f0; 
        border-radius: 50%; 
        width: 40px; 
        height: 40px; 
        line-height: 40px; 
        text-align: center; 
        cursor: pointer; 
        border: none; 
        padding: 0; 
        position: relative; 
        margin: 0; 
        flex-shrink: 0; 
    } 

    #header .header-right .cart-count { 
        position: absolute; 
        top: -2px; 
        right: -2px; 
        background-color: ${colors.primary}; 
        color: ${colors.textLight}; 
        border-radius: 50%; 
        width: 18px; 
        height: 18px; 
        font-size: 10px; 
        font-weight: bold; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        line-height: 1; 
    }

    #header .auth-buttons { 
        display: flex; 
        align-items: center; 
        gap: 8px; 
        margin-left: 0; 
        flex-shrink: 0; 
    } 

    #header .auth-buttons .btn { 
        padding: 8px 20px !important; 
        border-radius: 8px !important; 
        font-weight: 600 !important; 
        font-size: 15px !important; 
        text-decoration: none !important; 
        transition: all 0.3s ease !important; 
        line-height: 1.5 !important; 
        border: 2px solid transparent !important; 
    } 

    #header .auth-buttons .btn-login { 
        border-color: ${colors.primary} !important; 
        color: ${colors.primary} !important; 
        background-color: transparent !important; 
    } 

    #header .auth-buttons .btn-login:hover { 
        background-color: ${colors.primary} !important; 
        color: ${colors.textLight} !important; 
    } 

    #header .auth-buttons .btn-signup { 
        background-color: ${colors.primary} !important; 
        color: ${colors.textLight} !important; 
        border-color: ${colors.primary} !important; 
    } 
    
    #header .auth-buttons .btn-signup:hover { 
        background-color: ${colors.primaryHover} !important; 
        border-color: ${colors.primaryHover} !important; 
    }

    #header .profile-dropdown-wrapper { 
        position: relative; 
    }

    #header .profile-dropdown { 
        position: absolute; 
        top: 50px; 
        right: 0; 
        width: 220px; 
        background: #ffffff; 
        border: 1px solid ${colors.borderColor}; 
        border-radius: 8px; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
        padding: 0; 
        z-index: 999; 
        opacity: 0; 
        visibility: hidden; 
        transform: translateY(10px); 
        transition: all 0.2s ease; 
    } 

    #header .profile-dropdown.show { 
        opacity: 1; 
        visibility: visible; 
        transform: translateY(0); 
    } 

    #header .profile-dropdown .user-info { 
        padding: 15px 20px; 
        border-bottom: 1px solid ${colors.borderColor}; 
    } 

    #header .profile-dropdown .user-info h6 { 
        margin: 0 0 4px 0; 
        font-weight: 600; 
        color: ${colors.accent1}; 
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis; 
    } 

    #header .profile-dropdown .user-info span { 
        font-size: 13px; 
        color: ${colors.textMuted}; 
        display: block; 
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis; 
    } 

    #header .profile-dropdown ul { 
        list-style: none; 
        padding: 10px 0; 
        margin: 0; 
    } 

    #header .profile-dropdown ul li a, 
    #header .profile-dropdown ul li button { 
        display: block; 
        width: 100%; 
        padding: 10px 20px; 
        color: ${colors.accent1}; 
        text-decoration: none; 
        background: none; 
        border: none; 
        text-align: left; 
        font-size: 15px; 
        cursor: pointer; 
        transition: background-color 0.2s ease; 
    } 

    #header .profile-dropdown ul li a:hover, 
    #header .profile-dropdown ul li button:hover { 
        background-color: ${colors.dropdownBg}; 
    }
    
    #header .mobile-menu-wrapper { 
        margin-left: 5px; 
        flex-shrink: 0; 
    }
    
    #header .col-lg-3:last-child { 
        padding-right: 15px; 
    }
    
    #header .navigation-holder { 
        position: relative; 
        z-index: 10; 
    }
    
    #header .collapse.navbar-collapse { 
        z-index: 10; 
    }
    
    @media (max-width: 991px) {
      #header .header-right {
        gap: 3px;
        justify-content: flex-end;
        width: 100%;
        padding-right: 0;
      }
      #header .col-lg-3:last-child { 
          padding-right: 10px; 
      }
      #header .header-right .profile-toggle-btn,
      #header .header-right .cart-toggle-btn,
      #header .header-right .wishlist-toggle-btn {
        width: 35px;
        height: 35px;
        line-height: 35px;
        font-size: 14px;
      }
      #header .profile-dropdown {
        top: 45px;
        right: 0;
        width: 200px;
      }
      #header .profile-dropdown.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      #header .mobile-menu-wrapper {
        margin-left: 3px;
        flex-shrink: 0;
      }
      
      #header .navbar-brand .logo-img {
          height: 60px !important; /* Adjust logo height on mobile */
      }
      #header .navigation.navbar {
          padding-top: 5px !important;
          padding-bottom: 5px !important;
      }
    }
`;

class Header extends Component {
  profileNode = createRef();
  state = { isProfileShow: false };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("touchstart", this.handleClickOutside);
    if (this.props.isAuthenticated && !this.props.profile) {
      this.props.getMyProfile();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("touchstart", this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    if (
      this.profileNode.current &&
      !this.profileNode.current.contains(e.target)
    ) {
      this.setState({ isProfileShow: false });
    }
  };

  profileHandler = () =>
    this.setState((prevState) => ({ isProfileShow: !prevState.isProfileShow }));

  handleLogout = () => {
    this.props.logout();
    this.props.navigate("/login");
  };

  render() {
    const { isProfileShow } = this.state;
    const { carts, wishs, isAuthenticated, user, profile } = this.props;
    const displayUser = profile || user;

    const ClickHandler = () => window.scrollTo(10, 0);

    return (
      <>
        <style>{headerStyles}</style>
        <header id="header" className={`site-header ${this.props.hClass}`}>
          <nav className="navigation navbar navbar-expand-lg">
            <div className="container">
              <div className="row align-items-center w-100">
                <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                  <div className="navbar-header">
                    <Link
                      onClick={ClickHandler}
                      className="navbar-brand"
                      to="/home"
                    >
                      <img
                        src={Logo}
                        alt="icon"
                        style={{ height: "80px", width: "auto" }}
                        className="logo-img"
                      />
                    </Link>
                  </div>
                </div>

                {/* --- FIX #1: NAVIGATION LINKS KO UNCOMMENT KIYA GAYA HAI --- */}
                <div className="col-lg-6 d-none d-lg-block">
                  <div
                    id="navbar"
                    className="collapse navbar-collapse navigation-holder"
                  >
                    <ul className="nav navbar-nav me-auto mb-2 mb-lg-0">
                      <li>
                        <NavLink onClick={ClickHandler} to="/">
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={ClickHandler} to="/about">
                          About
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={ClickHandler} to="/shop">
                          Shop
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={ClickHandler} to="/blog">
                          Blog
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={ClickHandler} to="/contact">
                          Contact
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3 col-md-8 col-sm-6 col-6">
                  <div className="header-right">
                    {isAuthenticated ? (
                      <>
                        {displayUser?.role === "user" && (
                          <>
                            <button
                              className="cart-toggle-btn"
                              onClick={() => this.props.navigate("/user/cart")}
                              title="View Cart"
                            >
                              <i className="fi flaticon-bag"></i>
                              {(carts?.length || 0) > 0 && (
                                <span className="cart-count">
                                  {carts.length}
                                </span>
                              )}
                            </button>
                            <button
                              className="wishlist-toggle-btn"
                              onClick={() =>
                                this.props.navigate("/user/wishlist")
                              }
                              title="View Wishlist"
                            >
                              <i className="fi flaticon-heart"></i>
                              {(wishs?.length || 0) > 0 && (
                                <span className="cart-count">
                                  {wishs.length}
                                </span>
                              )}
                            </button>
                          </>
                        )}
                        <div
                          className="profile-dropdown-wrapper"
                          ref={this.profileNode}
                        >
                          <button
                            onClick={this.profileHandler}
                            className="profile-toggle-btn"
                            title="My Account"
                          >
                            <i className="fi flaticon-user"></i>
                          </button>
                          <div
                            className={`profile-dropdown ${
                              isProfileShow ? "show" : ""
                            }`}
                          >
                            <div className="user-info">
                              <h6>{displayUser?.fullName || "Guest User"}</h6>
                              <span>{displayUser?.email || "No email"}</span>
                            </div>
                            <ul>
                              <li>
                                <Link
                                  to={
                                    displayUser?.role === "admin"
                                      ? "/admin/dashboard"
                                      : "/user/dashboard"
                                  }
                                  onClick={() =>
                                    this.setState({ isProfileShow: false })
                                  }
                                >
                                  Dashboard
                                </Link>
                              </li>
                              <li>
                                <button onClick={this.handleLogout}>
                                  Sign Out
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="auth-buttons d-none d-lg-flex">
                        <Link
                          to="/login"
                          className="btn btn-login"
                          onClick={ClickHandler}
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="btn btn-signup"
                          onClick={ClickHandler}
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                    <div className="mobile-menu-wrapper">
                      <MobileMenu
                        isAuthenticated={isAuthenticated}
                        onLogout={this.handleLogout}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </>
    );
  }
}

const HeaderWithNavigate = (props) => {
  const navigate = useNavigate();
  return <Header {...props} navigate={navigate} />;
};

const mapStateToProps = (state) => ({
  carts: state.user?.cart || [],
  wishs: state.user?.wishlist || [],
  isAuthenticated: state.auth?.isAuthenticated,
  user: state.auth?.user,
  profile: state.user?.profile,
});

const mapDispatchToProps = {
  logout,
  getMyProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithNavigate);
