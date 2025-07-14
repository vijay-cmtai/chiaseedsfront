import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import toast from 'react-hot-toast'; // The toast import has been removed.

// --- Material-UI Imports ---
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// --- Redux Toolkit Thunks ---
import {
  getWishlist,
  removeFromWishlist,
  addToCart,
} from "../../features/user/userSlice";

// --- Styles ---
const colors = {
  primary: "#a96e4f",
  primaryHover: "#8e5a3e",
  textDark: "#2c3e50",
  textMuted: "#667280",
  cardBg: "#ffffff",
  borderColor: "#e0e0e0",
  red: "#c0392b",
};

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: theme.spacing(3),
  },
  header: {
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(4),
  },
  productCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    },
  },
  cardMedia: {
    height: 200,
    objectFit: "cover",
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  productName: {
    fontWeight: 600,
    color: colors.textDark,
    marginBottom: theme.spacing(0.5),
    fontSize: "1rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  productPrice: {
    fontWeight: "bold",
    color: colors.primary,
    fontSize: "1.1rem",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(0, 2, 2, 2),
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    "&:hover": {
      backgroundColor: colors.primaryHover,
    },
  },
  emptyState: {
    textAlign: "center",
    padding: theme.spacing(10, 2),
    color: colors.textMuted,
    backgroundColor: colors.cardBg,
    borderRadius: "12px",
  },
}));

const WishlistPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { wishlist, status } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleRemoveFromWishlist = (productId, productName) => {
    if (window.confirm(`Are you sure you want to remove ${productName}?`)) {
      dispatch(removeFromWishlist(productId));
      // You can add an alert for removal as well if you like
      alert(`${productName} has been removed from your wishlist.`);
    }
  };

  const handleMoveToCart = (product) => {
    try {
      dispatch(addToCart({ productId: product._id, quantity: 1 }));
      dispatch(removeFromWishlist(product._id));
      // Replaced toast.success with the standard browser alert
      alert(`${product.name} has been moved to your cart!`);
    } catch (error) {
      // Replaced toast.error with the standard browser alert
      alert("Could not move item to cart.");
    }
  };

  if (status === "loading" && (!wishlist || wishlist.length === 0)) {
    return (
      <Box textAlign="center" my={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={classes.pageContainer}>
      <Typography variant="h4" className={classes.header}>
        My Wishlist ({wishlist?.length || 0})
      </Typography>

      {wishlist && wishlist.length > 0 ? (
        <Grid container spacing={4}>
          {wishlist.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Card className={classes.productCard}>
                <CardMedia
                  className={classes.cardMedia}
                  component="img"
                  alt={product.name}
                  image={
                    product.mainImage ||
                    (product.images && product.images[0]) ||
                    "https://via.placeholder.com/200"
                  }
                  title={product.name}
                />
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" className={classes.productName}>
                    {product.name}
                  </Typography>
                  <Typography variant="h5" className={classes.productPrice}>
                    ₹{product.price.toLocaleString()}
                  </Typography>
                </CardContent>
                <Box className={classes.cardActions}>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.buttonPrimary}
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleMoveToCart(product)}
                  >
                    Move to Cart
                  </Button>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveFromWishlist(product._id, product.name)}
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
        <Card>
          <CardContent className={classes.emptyState}>
            <Typography variant="h6">Your wishlist is empty.</Typography>
            <Typography>Looks like you haven't added anything yet.</Typography>
            <Button
              component={Link}
              to="/shop"
              variant="contained"
              className={classes.buttonPrimary}
              style={{ marginTop: "24px" }}
            >
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WishlistPage;
