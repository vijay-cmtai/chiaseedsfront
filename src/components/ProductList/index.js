import React, { useState } from "react";
import { Link } from "react-router-dom";
import DefaultModal from "../Modal"; // Assuming this modal component exists

const ProductList = ({ products, addToCartProduct, addToWishListProduct }) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const [open, setOpen] = useState(false);
  const [state, setState] = useState({});

  const handleClose = () => setOpen(false);

  const handleClickOpen = (item) => {
    setOpen(true);
    setState(item);
  };

  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return "https://via.placeholder.com/250x280.png?text=No+Image"; // Placeholder
  };

  const calculateDiscount = (original, discounted) => {
    if (!original || !discounted || original <= discounted) {
      return 0;
    }
    const discount = ((original - discounted) / original) * 100;
    return Math.round(discount);
  };

  return (
    <div className="product-list">
      <div className="product-wrap">
        <div className="row align-items-center">
          {products && products.length > 0 ? (
            products.map((product) => {
              const discountPercent = calculateDiscount(
                product.originalPrice,
                product.price
              );

              return (
                <div className="col-xl-12 col-12" key={product._id}>
                  <div className="product-item">
                    <div className="product-img">
                      {/* ... image and buttons ... */}
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
                            <i className="fi flaticon-heart"></i>
                          </button>
                        </li>
                      </ul>
                      {discountPercent > 0 && (
                        <div className="offer-thumb">
                          <span>{discountPercent}% OFF</span>
                        </div>
                      )}
                    </div>
                    <div className="product-content">
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
                        <Link
                          onClick={ClickHandler}
                          to={`/product-single/${product._id}`}
                        >
                          {product.name}
                        </Link>
                      </h3>

                      {/* --- PRICE DISPLAY SECTION (YAHI AAPKI REQUIREMENT HAI) --- */}
                      <div className="product-btm">
                        <div className="product-price">
                          {/* 1. YE FINAL/DISCOUNTED PRICE HAI (jo 'price' field se aa raha hai) */}
                          {/* Yeh daam prominent dikhega. */}
                          <span>₹{product.price?.toFixed(2)}</span>

                          {/* 2. YE ACTUAL/ORIGINAL PRICE HAI (jo 'originalPrice' field se aa raha hai) */}
                          {/* Yeh daam sirf tab dikhega jab discount ho, aur kata hua (strikethrough) hoga. */}
                          {discountPercent > 0 && (
                            <del style={{ marginLeft: "10px", color: "#aaa" }}>
                              ₹{product.originalPrice?.toFixed(2)}
                            </del>
                          )}
                        </div>
                        <div className="product-ratting">
                          {/* ... ratting stars ... */}
                        </div>
                      </div>

                      {/* --- Baki ki details ... --- */}
                      <div
                        className="product-extra-details"
                        style={{
                          fontSize: "14px",
                          color: "#666",
                          marginTop: "10px",
                        }}
                      >
                        {product.weight && (
                          <p style={{ margin: "2px 0" }}>
                            <strong>Weight:</strong> {product.weight} kg
                          </p>
                        )}
                        {product.seedType && (
                          <p style={{ margin: "2px 0" }}>
                            <strong>Type:</strong> {product.seedType}
                          </p>
                        )}
                        {product.speciality && (
                          <p style={{ margin: "2px 0" }}>
                            <strong>Speciality:</strong> {product.speciality}
                          </p>
                        )}
                        {product.packagingType && (
                          <p style={{ margin: "2px 0" }}>
                            <strong>Packaging:</strong> {product.packagingType}
                          </p>
                        )}
                      </div>

                      <p style={{ marginTop: "15px" }}>
                        {product.description
                          ? product.description.substring(0, 100) + "..."
                          : "No description available."}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
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
