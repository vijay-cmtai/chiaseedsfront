// src/components/ProductList.js (CORRECTED CODE)

import React, { useState } from "react";
import { Link } from "react-router-dom";
import DefaultModal from "../Modal"; // Assuming this modal component exists and is correct

const ProductList = ({ products, addToCartProduct, addToWishListProduct }) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  // Modal state logic (no changes here)
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({});

  const handleClose = () => setOpen(false);

  const handleClickOpen = (item) => {
    setOpen(true);
    setState(item);
  };

  // Helper function to get image safely
  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return "https://via.placeholder.com/250x280.png?text=No+Image"; // Placeholder
  };

  return (
    <div className="product-list">
      <div className="product-wrap">
        <div className="row align-items-center">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div className="col-xl-12 col-12" key={product._id}>
                {" "}
                {/* Use unique _id for key */}
                <div className="product-item">
                  <div className="product-img">
                    {/* FIX 1: Using correct image source from backend */}
                    <img src={getProductImage(product)} alt={product.name} />
                    <ul>
                      <li>
                        <button
                          title="Add to Cart"
                          onClick={() => addToCartProduct(product)}
                        >
                          <i className="fi flaticon-shopping-cart"></i>
                        </button>
                      </li>
                      <li>
                        <button
                          title="Quick View"
                          onClick={() => handleClickOpen(product)}
                        >
                          <i className="fi ti-eye"></i>
                        </button>
                      </li>
                      <li>
                        <button
                          title="Add to Wishlist"
                          onClick={() => addToWishListProduct(product)}
                        >
                          <i className="fi flaticon-heart"></i>{" "}
                          {/* Correct icon for wishlist */}
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="product-content">
                    {/* FIX 2: Added Category display */}
                    <small
                      style={{
                        color: "#888",
                        display: "block",
                        marginBottom: "5px",
                      }}
                    >
                      {product.category}
                    </small>
                    <h3>
                      {/* FIX 3: Using correct product name and link ID */}
                      <Link
                        onClick={ClickHandler}
                        to={`/product-single/${product._id}`}
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <div className="product-btm">
                      <div className="product-price">
                        {/* FIX 4: Using correct price from backend */}
                        <span>₹{product.price.toFixed(2)}</span>
                      </div>
                      <div className="product-ratting">
                        {/* Static stars for now */}
                        <ul>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* FIX 5: Showing real product description */}
                    <p>
                      {product.description
                        ? product.description.substring(0, 150) + "..."
                        : "No description available."}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
        <DefaultModal
          addToCartProduct={addToCartProduct}
          open={open}
          onClose={handleClose}
          product={state}
        />
      </div>
    </div>
  );
};

export default ProductList;
