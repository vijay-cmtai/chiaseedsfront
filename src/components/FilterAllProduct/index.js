import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import ProductGrid from "../ProductGrid";
import ProductList from "../ProductList";
const colors = {
  primaryButton: "#878fba",
  textDark: "#3d2b56",
  textLight: "#ffffff",
  cardBackground: "rgba(255, 255, 255, 0.7)",
  borderColor: "rgba(135, 143, 186, 0.3)",
};

const styles = {
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
  viewSwitcherNav: {
    border: "none",
    display: "flex",
    gap: "8px",
  },
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
  iconStyle: {
    fontSize: "16px",
  },
  resultsText: {
    color: colors.textDark,
    fontSize: "16px",
    fontWeight: "500",
  },
  productCount: {
    color: colors.primaryButton,
    fontWeight: "700",
  },
};
// =======================================================

const FilterAllProduct = ({
  products,
  addToCartProduct,
  addToWishListProduct,
}) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="col-lg-9">
      <div style={styles.filterBar}>
        <Nav tabs style={styles.viewSwitcherNav}>
          <NavItem>
            <NavLink
              style={
                activeTab === "1" ? styles.navButtonActive : styles.navButton
              }
              onClick={() => {
                toggle("1");
              }}
            >
              <i className="fa fa-th" style={styles.iconStyle}></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={
                activeTab === "2" ? styles.navButtonActive : styles.navButton
              }
              onClick={() => {
                toggle("2");
              }}
            >
              <i className="fa fa-list" style={styles.iconStyle}></i>
            </NavLink>
          </NavItem>
        </Nav>

        <div style={styles.resultsText}>
          <span>
            Showing{" "}
            <strong style={styles.productCount}>{products.length}</strong>{" "}
            Products
          </span>
        </div>
      </div>
      <div className="shop-product-wrap">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <ProductGrid
              addToCartProduct={addToCartProduct}
              addToWishListProduct={addToWishListProduct}
              products={products}
            />
          </TabPane>
          <TabPane tabId="2">
            <ProductList
              addToCartProduct={addToCartProduct}
              addToWishListProduct={addToWishListProduct}
              products={products}
            />
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default FilterAllProduct;
