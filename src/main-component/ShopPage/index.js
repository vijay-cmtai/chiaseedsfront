// src/pages/ShopPage.js (FINAL PERFORMANCE FIX WITHOUT EXTERNAL CSS)

import React, { Fragment, useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import FilterSidebar from "../../components/FilterSidebar";
import FilterAllProduct from "../../components/FilterAllProduct";
import { CircularProgress, Box } from "@material-ui/core";

import { fetchAllProducts } from "../../features/products/productSlice";
import { addToCart, addToWishlist } from "../../features/user/userSlice";
const colors = {
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
};

const styles = {
  shopSection: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    padding: "100px 0",
  },
};

const ShopPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: productsArray, status: productStatus } = useSelector(
    (state) => state.products
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchAllProducts());
    }
  }, [productStatus, dispatch]);

  const [filter, setFilter] = useState({
    price: "",
    category: "",
    size: "",
    color: "",
    brand: "",
  });

  const priceChangeHandler = ({ target: { name, value } }) => {
    if (value === "") {
      setFilter({ ...filter, [name]: "" });
      return;
    }
    const val = JSON.parse(value);
    setFilter({ ...filter, [name]: val });
  };

  const changeHandler = ({ target: { name, value } }) => {
    setFilter({ ...filter, [name]: value });
  };

  const priceFIlter = (productPrice) => {
    if (!filter.price || filter.price === "") {
      return true;
    }
    const { min, max } = filter.price;
    if (min !== null && max !== null) {
      return productPrice >= min && productPrice <= max;
    }
    if (min !== null && max === null) {
      return productPrice >= min;
    }
    return true;
  };

  const addToCartProduct = (product) => {
    if (isAuthenticated) {
      dispatch(addToCart({ productId: product._id, quantity: 1 }));
      alert(`${product.name} added to cart!`);
    } else {
      alert("Please log in to add items to your cart.");
      navigate("/login");
    }
  };

  const addToWishListProduct = (product) => {
    if (isAuthenticated) {
      dispatch(addToWishlist(product._id));
      alert(`${product.name} added to wishlist!`);
    } else {
      alert("Please log in to add items to your wishlist.");
      navigate("/login");
    }
  };

  const products = useMemo(() => {
    return (productsArray || [])
      .filter((el) => priceFIlter(el.price))
      .filter((el) =>
        filter.category ? el.category === filter.category : true
      )
      .filter((el) => (filter.size ? el.size === filter.size : true))
      .filter((el) => (filter.color ? el.color === filter.color : true))
      .filter((el) => (filter.brand ? el.brand === filter.brand : true));
  }, [productsArray, filter]);
  // ===========================================================================================

  return (
    <Fragment>
      <Navbar hClass={"header-style-2"} />
      <PageTitle pageTitle={"Shop"} pagesub={"Shop"} />

      <div className="shop-section" style={styles.shopSection}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-12">
              <FilterSidebar
                products={productsArray}
                filter={filter}
                priceChangeHandler={priceChangeHandler}
                changeHandler={changeHandler}
              />
            </div>
            {productStatus === "loading" ? (
              <div className="col-lg-9 col-md-8 col-12">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{ height: "50vh", width: "100%" }}
                >
                  <CircularProgress />
                </Box>
              </div>
            ) : (
              <FilterAllProduct
                addToCartProduct={addToCartProduct}
                addToWishListProduct={addToWishListProduct}
                products={products}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default ShopPage;
