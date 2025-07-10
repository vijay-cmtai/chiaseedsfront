// src/components/FilterSidebar.js (UPDATED WITH NEW COLOR THEME)

import React from "react";

// --- Data (with Rupee symbol) ---
const prices = [
  { id: 1, value: { min: 0, max: 500 }, label: "₹0 - ₹500" },
  { id: 2, value: { min: 500, max: 1000 }, label: "₹500 - ₹1000" },
  { id: 3, value: { min: 1000, max: 2000 }, label: "₹1000 - ₹2000" },
  { id: 4, value: { min: 2000, max: null }, label: "₹2000 and more" },
];

// Helper function to get a unique list of items from products
const getUniqueListBy = (products, key) => {
  if (!products || products.length === 0) return [];
  return [...new Set(products.map((product) => product[key]).filter(Boolean))];
};

// ===================== FIX 1: APPLY THE NEW COLOR THEME =====================
const colors = {
  primaryButton: "#878fba",
  textDark: "#3d2b56",
  textLight: "#ffffff",
  cardBackground: "rgba(255, 255, 255, 0.7)",
  borderColor: "rgba(135, 143, 186, 0.3)",
};

const styles = {
  sidebarWrapper: {
    padding: "30px",
    backgroundColor: colors.cardBackground,
    borderRadius: "20px",
    border: `1px solid ${colors.borderColor}`,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
  },
  widget: {
    marginBottom: "35px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: colors.textDark,
    paddingBottom: "10px",
    marginBottom: "20px",
    borderBottom: `2px solid ${colors.borderColor}`,
  },
  // Search Styles
  searchGroup: { position: "relative" },
  searchInput: {
    width: "100%",
    height: "50px",
    padding: "10px 55px 10px 20px",
    border: `1px solid ${colors.borderColor}`,
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: colors.textDark,
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  searchButton: {
    position: "absolute",
    right: "5px",
    top: "5px",
    width: "40px",
    height: "40px",
    backgroundColor: colors.primaryButton,
    color: colors.textLight,
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  // Custom Radio Button Styles
  list: { listStyle: "none", padding: 0, margin: 0 },
  listItem: { marginBottom: "12px" },
  label: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "16px",
    color: colors.textDark,
  },
  input: { display: "none" }, // Hide the default radio button
  customRadio: {
    width: "20px",
    height: "20px",
    border: `2px solid ${colors.primaryButton}`,
    borderRadius: "50%",
    marginRight: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease, border-color 0.3s ease",
  },
  customRadioInner: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: colors.primaryButton,
    transform: "scale(0)",
    transition: "transform 0.2s ease",
  },
};

const FilterSidebar = ({
  products,
  filter,
  changeHandler,
  priceChangeHandler,
}) => {
  const categories = getUniqueListBy(products, "category");
  const brands = getUniqueListBy(products, "brand");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    // ===================== FIX 2: APPLY THE NEW STYLES =====================
    <div style={styles.sidebarWrapper}>
      {/* Search Section */}
      <div style={styles.widget}>
        <h2 style={styles.title}>Search</h2>
        <form onSubmit={handleSearchSubmit}>
          <div style={styles.searchGroup}>
            <input
              type="text"
              name="search"
              style={styles.searchInput}
              placeholder="Search products..."
            />
            <button style={styles.searchButton} type="submit">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </form>
      </div>

      {/* Price Section */}
      <div style={styles.widget}>
        <h2 style={styles.title}>Price</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <label style={styles.label}>
              <input
                style={styles.input}
                type="radio"
                value={""}
                checked={!filter.price}
                name="price"
                onChange={priceChangeHandler}
              />
              <span style={styles.customRadio}>
                <span
                  style={{
                    ...styles.customRadioInner,
                    transform: !filter.price ? "scale(1)" : "scale(0)",
                  }}
                ></span>
              </span>
              All Prices
            </label>
          </li>
          {prices.map((price) => (
            <li key={price.id} style={styles.listItem}>
              <label style={styles.label}>
                <input
                  style={styles.input}
                  type="radio"
                  value={JSON.stringify(price.value)}
                  checked={filter.price && filter.price.min === price.value.min}
                  onChange={priceChangeHandler}
                  name="price"
                />
                <span style={styles.customRadio}>
                  <span
                    style={{
                      ...styles.customRadioInner,
                      transform:
                        filter.price && filter.price.min === price.value.min
                          ? "scale(1)"
                          : "scale(0)",
                    }}
                  ></span>
                </span>
                {price.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Category Section */}
      <div style={styles.widget}>
        <h2 style={styles.title}>Category</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <label style={styles.label}>
              <input
                style={styles.input}
                type="radio"
                value=""
                checked={filter.category === ""}
                onChange={changeHandler}
                name="category"
              />
              <span style={styles.customRadio}>
                <span
                  style={{
                    ...styles.customRadioInner,
                    transform: filter.category === "" ? "scale(1)" : "scale(0)",
                  }}
                ></span>
              </span>
              All Categories
            </label>
          </li>
          {categories.map((category) => (
            <li key={category} style={styles.listItem}>
              <label style={styles.label}>
                <input
                  style={styles.input}
                  type="radio"
                  value={category}
                  checked={filter.category === category}
                  onChange={changeHandler}
                  name="category"
                />
                <span style={styles.customRadio}>
                  <span
                    style={{
                      ...styles.customRadioInner,
                      transform:
                        filter.category === category ? "scale(1)" : "scale(0)",
                    }}
                  ></span>
                </span>
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Brand Section */}
      <div style={styles.widget}>
        <h2 style={styles.title}>Brand</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <label style={styles.label}>
              <input
                style={styles.input}
                type="radio"
                value=""
                checked={filter.brand === ""}
                onChange={changeHandler}
                name="brand"
              />
              <span style={styles.customRadio}>
                <span
                  style={{
                    ...styles.customRadioInner,
                    transform: filter.brand === "" ? "scale(1)" : "scale(0)",
                  }}
                ></span>
              </span>
              All Brands
            </label>
          </li>
          {brands.map((brand) => (
            <li key={brand} style={styles.listItem}>
              <label style={styles.label}>
                <input
                  style={styles.input}
                  type="radio"
                  value={brand}
                  checked={filter.brand === brand}
                  onChange={changeHandler}
                  name="brand"
                />
                <span style={styles.customRadio}>
                  <span
                    style={{
                      ...styles.customRadioInner,
                      transform:
                        filter.brand === brand ? "scale(1)" : "scale(0)",
                    }}
                  ></span>
                </span>
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
