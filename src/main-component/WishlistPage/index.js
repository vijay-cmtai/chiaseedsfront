// src/components/WishlistPage/index.js (Final Version with Earthy Theme)

import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  IconButton,
  Avatar,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import { removeFromWishList, addToCart } from "../../store/actions/action";

// --- NEW "Earthy & Trustworthy" Color Theme ---
const colors = {
  primary: "#a96e4f", // Warm, earthy brown for buttons & accents
  primaryHover: "#8e5a3e", // Darker brown for hover
  textDark: "#2c3e50", // Deep charcoal for headings
  textMuted: "#667280", // Softer grey for body text
  background: "#f9f7f3", // Warm, light cream background
  cardBg: "#ffffff", // Clean white for cards
  borderColor: "#e0e0e0", // Light grey for borders
  red: "#c0392b", // Muted, strong red
  pageTitleBg: "#EFEAE2", // Slightly darker cream for the PageTitle background
};

const useStyles = makeStyles((theme) => ({
  pageWrapper: {
    backgroundColor: colors.background,
    padding: "80px 0",
  },
  productCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    },
  },
  cardMedia: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(2.5),
    textAlign: "center",
  },
  productName: {
    fontWeight: 600,
    color: colors.textDark,
    marginBottom: theme.spacing(1),
    fontSize: "1.1rem",
    minHeight: "44px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  productPrice: {
    fontWeight: "bold",
    color: colors.primary,
    fontSize: "1.3rem",
    marginBottom: theme.spacing(2),
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(0, 2.5, 2.5, 2.5),
    borderTop: `1px solid ${colors.borderColor}`,
    marginTop: "auto",
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    fontSize: "0.8rem",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: "8px 16px",
    "&:hover": {
      backgroundColor: colors.primaryHover,
    },
  },
  emptyWishlist: {
    textAlign: "center",
    padding: theme.spacing(10, 2),
    color: colors.textMuted,
    backgroundColor: colors.cardBg,
    borderRadius: "15px",
    boxShadow: "0 5px 25px rgba(0,0,0,0.05)",
  },
}));

// PageTitle ke liye ek wrapper component
const ThemedPageTitle = () => (
  <div style={{ backgroundColor: colors.pageTitleBg }}>
    <PageTitle pageTitle={"My Wishlist"} pagesub={"Wishlist"} />
  </div>
);

const WishlistPage = (props) => {
  const classes = useStyles();
  const { wishs, removeFromWishList, addToCart } = props;

  return (
    <Fragment>
      <Navbar hClass={"header-style-2"} />
      <ThemedPageTitle />

      <div className={classes.pageWrapper}>
        <div className="container">
          {wishs && wishs.length > 0 ? (
            <Grid container spacing={4}>
              {wishs.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Card className={classes.productCard}>
                    <Avatar
                      src={item.proImg}
                      variant="square"
                      className={classes.cardMedia}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography variant="h6" className={classes.productName}>
                        {item.title}
                      </Typography>
                      <Typography variant="h5" className={classes.productPrice}>
                        ₹{item.price}
                      </Typography>
                    </CardContent>
                    <Box className={classes.cardActions}>
                      <Button
                        variant="contained"
                        className={classes.buttonPrimary}
                        startIcon={<AddShoppingCartIcon />}
                        onClick={() => addToCart(item, 1)}
                      >
                        Add to Cart
                      </Button>
                      <IconButton
                        onClick={() => removeFromWishList(item.id)}
                        style={{ color: colors.red }}
                        title="Remove from Wishlist"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <div className={classes.emptyWishlist}>
              <Typography variant="h5" style={{ color: colors.textDark }}>
                Your Wishlist is Empty
              </Typography>
              <Typography style={{ marginTop: "10px", marginBottom: "30px" }}>
                Looks like you haven't added anything yet. Explore our products!
              </Typography>
              <Button
                component={Link}
                to="/shop"
                variant="contained"
                className={classes.buttonPrimary}
              >
                Start Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    wishs: state.wishList.w_list,
  };
};

export default connect(mapStateToProps, { removeFromWishList, addToCart })(
  WishlistPage
);
