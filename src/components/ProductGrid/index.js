import React, { useState } from "react";
import DefaultModal from "../Modal";

const styles = {
  productItem: {
    cursor: "pointer",
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxShadow: '0 4px 15px rgba(0,0,0,0.07)',
    borderRadius: '8px',
    overflow: 'hidden',
    background: '#fff',
  },
  productImg: {
    position: 'relative', // For the action buttons
    height: '280px',
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageTag: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  productContent: {
    padding: '0 20px 20px 20px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  productBtm: {
    marginTop: 'auto',
  },
  productCategory: {
    color: "#888",
    display: "block",
    marginBottom: "5px",
    textTransform: 'capitalize',
  }
};

const ProductGrid = ({ products, addToCartProduct, addToWishListProduct }) => {
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
      <div className="row align-items-stretch">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div
              className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-4"
              key={product._id}
            >
              <div
                className="product-item"
                onClick={() => handleClickOpen(product)}
                style={styles.productItem}
              >
                <div className="product-img" style={styles.productImg}>
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    loading="lazy"
                    style={styles.imageTag}
                  />
                  <ul>
                    <li>
                      <button title="Add to Cart" onClick={(e) => { e.stopPropagation(); addToCartProduct(product); }}>
                        <i className="fi flaticon-shopping-cart"></i>
                      </button>
                    </li>
                    <li>
                      <button title="Quick View" onClick={(e) => { e.stopPropagation(); handleClickOpen(product); }}>
                        <i className="fi ti-eye"></i>
                      </button>
                    </li>
                    <li>
                      <button title="Add to Wishlist" onClick={(e) => { e.stopPropagation(); addToWishListProduct(product); }}>
                        <i className="fi flaticon-heart"></i>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="product-content" style={styles.productContent}>
                  <div>
                    <small style={styles.productCategory}>
                      {product.category}
                    </small>
                    <h3>{product.name}</h3>
                  </div>
                  <div className="product-btm" style={styles.productBtm}>
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
          <div className="col-12 text-center">
            <h3>No products found for the selected filters.</h3>
          </div>
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
