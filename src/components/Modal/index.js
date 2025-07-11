// src/Modal.js (FINAL CORRECTED CODE)

import React, { Fragment, useState } from "react";
import { Dialog, Grid, Button } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import bee from "../../images/bee2.png"; // Assuming this image exists
import { Link } from "react-router-dom";

const DefaultModal = ({
  maxWidth,
  open,
  onClose,
  addToCartProduct,
  product,
}) => {
  const [qty, setQty] = useState(1);

  // Yeh check zaroori hai taaki agar product na ho to error na aaye
  if (!product || !product._id) {
    return null;
  }

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <i className="fa fa-close"></i>
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  // Helper to safely get the image
  const getProductImage = (p) => {
    if (p && p.images && p.images.length > 0) {
      return p.images[0];
    }
    return "https://via.placeholder.com/500x500.png?text=No+Image"; // Fallback image
  };

  const handleAddToCart = () => {
    // Pass the entire product object along with the quantity
    addToCartProduct({ ...product, quantity: qty });
    onClose(); // Close modal after action
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        className="modalWrapper quickview-dialog"
        maxWidth={maxWidth || "md"} // Default to 'md' if not provided
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={onClose}
        ></DialogTitle>
        <Grid className="modalBody modal-body">
          <div className="product-details">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="product-single-img">
                  <div className="modal-product">
                    <div className="item">
                      {/* FIX 1: Using correct image from product data */}
                      <img src={getProductImage(product)} alt={product.name} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="product-single-content">
                  {/* FIX 2: Using correct name from product data */}
                  <h5>{product.name}</h5>
                  {/* FIX 3: Using correct price and currency */}
                  <h6>₹{product.price?.toFixed(2)}</h6>
                  <ul className="rating">
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                  </ul>
                  {/* FIX 4: Using correct description from product data */}
                  <p>{product.description || "No description available."}</p>

                  {/* Optional: Agar aapke product me color/weight hai to unhe yahan dynamic bana sakte hain */}
                  {/* Abhi ke liye inko comment kar diya gaya hai taaki confusion na ho */}
                  {/* 
                  <div className="product-filter-item color"> ... </div>
                  <div className="product-filter-item color filter-size"> ... </div>
                  */}

                  <div className="pro-single-btn">
                    <Grid className="quantity cart-plus-minus">
                      <Button
                        className="dec qtybutton"
                        onClick={() => setQty(qty <= 1 ? 1 : qty - 1)}
                      >
                        -
                      </Button>
                      <input
                        value={qty}
                        readOnly // User ko type karne se rokein
                        type="text"
                      />
                      <Button
                        className="inc qtybutton"
                        onClick={() => setQty(qty + 1)}
                      >
                        +
                      </Button>
                    </Grid>
                    {/* FIX 5: Calling the correct handler */}
                    <button onClick={handleAddToCart} className="theme-btn">
                      Add to cart
                    </button>
                  </div>
                  <div className="social-share">
                    <span>Share with : </span>
                    <ul className="socialLinks">
                      <li>
                        <Link to="/">
                          <i className="fa fa-facebook"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fa fa-linkedin"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fa fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fa fa-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fa fa-youtube-play"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="m-shape">
                    <img src={bee} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Dialog>
    </Fragment>
  );
};
export default DefaultModal;
