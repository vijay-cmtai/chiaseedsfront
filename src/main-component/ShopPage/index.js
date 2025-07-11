import React, { Fragment, useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import FilterSidebar from "../../components/FilterSidebar";
import ProductGrid from "../../components/ProductGrid";
import ProductList from "../../components/ProductList";

import {
  CircularProgress,
  Box,
  useMediaQuery,
  Button,
  IconButton,
  Snackbar, // Snackbar abhi bhi istemal hoga
} from "@material-ui/core";
// import MuiAlert from '@material-ui/lab/Alert'; // <-- YEH LINE HATA DI GAYI HAI
import CloseIcon from "@material-ui/icons/Close";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

import { fetchAllProducts } from "../../features/products/productSlice";
import { addToCart, addToWishlist } from "../../features/user/userSlice";

const colors = {
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
  primaryButton: "#878fba",
  textDark: "#3d2b56",
  textLight: "#ffffff",
  cardBackground: "rgba(255, 255, 255, 0.7)",
  borderColor: "rgba(135, 143, 186, 0.3)",
};

const styles = {
  shopSection: (isMobile) => ({
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    padding: isMobile ? "60px 0" : "100px 0",
  }),
  filterButtonContainer: {
    marginBottom: "20px",
    textAlign: "center",
  },
  mobileFilterOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "white",
    zIndex: 1000,
    overflowY: "auto",
    padding: "20px",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 1001,
  },
  filterBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    backgroundColor: colors.cardBackground,
    borderRadius: "15px",
    marginBottom: "40px",
    border: `1px solid ${colors.borderColor}`,
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
  },
  viewSwitcherNav: { border: "none", display: "flex", gap: "8px" },
  navButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: `2px solid ${colors.borderColor}`,
    color: colors.primaryButton,
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  navButtonActive: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryButton,
    border: `2px solid ${colors.primaryButton}`,
    color: colors.textLight,
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  iconStyle: { fontSize: "16px" },
  resultsText: { color: colors.textDark, fontSize: "16px", fontWeight: "500" },
  productCount: { color: colors.primaryButton, fontWeight: "700" },

  // --- ▼▼▼ CUSTOM NOTIFICATION KE LIYE STYLE ▼▼▼ ---
  customAlert: {
    padding: "12px 20px",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  // Success (green)
  success: {
    backgroundColor: "#4caf50",
  },
  // Warning (orange)
  warning: {
    backgroundColor: "#ff9800",
  },
};

const ShopPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:767px)");
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { items: productsArray, status: productStatus } = useSelector(
    (state) => state.products
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchAllProducts());
    }
  }, [productStatus, dispatch]);

  useEffect(() => {
    if (!isMobile) {
      setFilterVisible(false);
    }
  }, [isMobile]);

  const [filter, setFilter] = useState({
    price: "",
    category: "",
    size: "",
    color: "",
    brand: "",
  });

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const priceChangeHandler = ({ target: { name, value } }) => {
    if (value === "") {
      setFilter({ ...filter, [name]: "" });
      return;
    }
    setFilter({ ...filter, [name]: JSON.parse(value) });
  };

  const changeHandler = ({ target: { name, value } }) => {
    setFilter({ ...filter, [name]: value });
  };

  const priceFilter = (productPrice) => {
    if (!filter.price || filter.price === "") return true;
    const { min, max } = filter.price;
    if (min !== null && max !== null)
      return productPrice >= min && productPrice <= max;
    if (min !== null && max === null) return productPrice >= min;
    return true;
  };

  const addToCartProduct = (product) => {
    if (isAuthenticated) {
      dispatch(addToCart({ productId: product._id, quantity: 1 }));
      setSnackbar({
        open: true,
        message: "Added to cart successfully!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Please log in to add items to your cart.",
        severity: "warning",
      });
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  const addToWishListProduct = (product) => {
    if (isAuthenticated) {
      dispatch(addToWishlist(product._id));
      setSnackbar({
        open: true,
        message: "Added to wishlist successfully!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Please log in to add items to your wishlist.",
        severity: "warning",
      });
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const products = useMemo(() => {
    return (productsArray || [])
      .filter((el) => priceFilter(el.price))
      .filter((el) =>
        filter.category ? el.category === filter.category : true
      )
      .filter((el) => (filter.size ? el.size === filter.size : true))
      .filter((el) => (filter.color ? el.color === filter.color : true))
      .filter((el) => (filter.brand ? el.brand === filter.brand : true));
  }, [productsArray, filter]);

  const renderFilterSidebar = () => (
    <FilterSidebar
      products={productsArray}
      filter={filter}
      priceChangeHandler={priceChangeHandler}
      changeHandler={changeHandler}
    />
  );

  return (
    <Fragment>
      <Navbar hClass={"header-style-2"} />
      <PageTitle pageTitle={"Shop"} pagesub={"Shop"} />

      <div className="shop-section" style={styles.shopSection(isMobile)}>
        <div className="container">
          <div className="row">
            {isMobile && (
              <div className="col-12" style={styles.filterButtonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setFilterVisible(true)}
                >
                  Filters
                </Button>
              </div>
            )}

            {isMobile && isFilterVisible && (
              <div style={styles.mobileFilterOverlay}>
                <IconButton
                  style={styles.closeButton}
                  onClick={() => setFilterVisible(false)}
                >
                  <CloseIcon />
                </IconButton>
                {renderFilterSidebar()}
              </div>
            )}

            {!isMobile && (
              <div className="col-lg-3 col-md-4">{renderFilterSidebar()}</div>
            )}

            <div className={!isMobile ? "col-lg-9 col-md-8" : "col-12"}>
              {productStatus === "loading" ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{ height: "50vh", width: "100%" }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <div style={styles.filterBar}>
                    <Nav tabs style={styles.viewSwitcherNav}>
                      <NavItem>
                        <NavLink
                          style={
                            activeTab === "1"
                              ? styles.navButtonActive
                              : styles.navButton
                          }
                          onClick={() => toggleTab("1")}
                        >
                          <i className="fa fa-th" style={styles.iconStyle}></i>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={
                            activeTab === "2"
                              ? styles.navButtonActive
                              : styles.navButton
                          }
                          onClick={() => toggleTab("2")}
                        >
                          <i
                            className="fa fa-list"
                            style={styles.iconStyle}
                          ></i>
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <div style={styles.resultsText}>
                      <span>
                        Showing{" "}
                        <strong style={styles.productCount}>
                          {products.length}
                        </strong>{" "}
                        Products
                      </span>
                    </div>
                  </div>
                  <div className="shop-product-wrap">
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="1">
                        <ProductGrid
                          products={products}
                          addToCartProduct={addToCartProduct}
                          addToWishListProduct={addToWishListProduct}
                        />
                      </TabPane>
                      <TabPane tabId="2">
                        <ProductList
                          products={products}
                          addToCartProduct={addToCartProduct}
                          addToWishListProduct={addToWishListProduct}
                        />
                      </TabPane>
                    </TabContent>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Scrollbar />

      {/* --- ▼▼▼ SNACKBAR MEIN CUSTOM ALERT KA ISTEMAL ▼▼▼ --- */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <div
          style={{
            ...styles.customAlert,
            ...(snackbar.severity === "success"
              ? styles.success
              : styles.warning),
          }}
        >
          <span>{snackbar.message}</span>
        </div>
      </Snackbar>
    </Fragment>
  );
};

export default ShopPage;
