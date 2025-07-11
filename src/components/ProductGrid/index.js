// src/components/ProductGrid.js (FINAL CORRECTED CODE)

import React, "react";
// 'Link' aur 'ClickHandler' ki ab zaroorat nahi hai, isliye hata diya.
// import { Link } from "react-router-dom"; // REMOVED
import DefaultModal from "../Modal";

const ProductGrid = ({ products, addToCartProduct, addToWishListProduct }) => {
  
  // ClickHandler function ki ab koi zaroorat nahi hai.
  // const ClickHandler = () => { ... }; // REMOVED

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
    return "https://via.placeholder.com/250x280.png?text=No+Image";
  };

  return (
    <div className="product-wrap">
      <div className="row align-items-center">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div
              className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12"
              key={product._id}
            >
              <div className="product-item">
                <div className="product-img">
                  <img src={getProductImage(product)} alt={product.name} loading="lazy" />
                  <ul>
                    {/* Yeh 3 buttons bilkul pehle ki tarah kaam karenge */}
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
                  
                  {/* === YAHAN PAR CHANGE KIYA GAYA HAI === */}
                  {/* Link component hata diya gaya hai taaki naam par click na ho */}
                  <h3>{product.name}</h3>
                  
                  <div className="product-btm">
                    <div className="product-price">
                      <span>₹{product.price.toFixed(2)}</span>
                    </div>
                    <div className="product-ratting">
                      <ul>
                        <li><i className="fa fa-star" aria-hidden="true"></i></li>
                        <li><i className="fa fa-star" aria-hidden="true"></i></li>
                        <li><i className="fa fa-star" aria-hidden="true"></i></li>
                        <li><i className="fa fa-star" aria-hidden="true"></i></li>
                        <li><i className="fa fa-star" aria-hidden="true"></i></li>
                      </ul>
                    </div>
                  </div>
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
  );
};

export default ProductGrid;
