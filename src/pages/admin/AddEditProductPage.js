// src/pages/admin/AddEditProductPage.js

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createProduct,
  updateProduct,
  // Agar products list pehle se na ho to fetch karne ke liye
  // getAllProducts,
} from "../../features/admin/adminSlice";

// --- Material-UI Imports ---
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Box,
  IconButton,
  CircularProgress, // Loading ke liye
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

// --- Colors aur Styles (Aapke code se) ---
const colors = {
  primary: "#878fba",
  textDark: "#3d2b56",
  textMuted: "#6c749d",
  borderColor: "#e0e0e0",
  lightBg: "#f8f9fa",
  error: "#dc3545",
};

const useStyles = makeStyles((theme) => ({
  pageContainer: { padding: theme.spacing(3) },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  pageTitle: { fontWeight: "bold", color: colors.textDark },
  formCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    padding: theme.spacing(2),
  },
  sectionTitle: {
    fontWeight: 600,
    color: colors.textDark,
    marginBottom: theme.spacing(3),
    borderBottom: `2px solid ${colors.borderColor}`,
    paddingBottom: theme.spacing(1),
  },
  imageUploader: {
    border: `2px dashed ${colors.borderColor}`,
    borderRadius: "8px",
    padding: theme.spacing(4),
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: colors.lightBg,
    color: colors.textMuted,
    transition: "background-color 0.3s ease",
    "&:hover": { backgroundColor: "#f1f3f5" },
  },
  imagePreview: {
    width: "100%",
    height: "auto",
    maxHeight: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginTop: theme.spacing(2),
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    fontWeight: "bold",
    padding: theme.spacing(1.5, 4),
    "&:hover": { backgroundColor: "#6c749d" },
  },
}));

const AddEditProductPage = () => {
  const classes = useStyles();
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditing = Boolean(productId);

  // Redux se status aur message get karein, with fallback to avoid destructuring undefined
  const {
    status = "idle",
    message = "",
    products = [],
  } = useSelector((state) => state.admin || {});

  // Form ke data ke liye state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "", // Category field bhi add karein
  });
  const [productImage, setProductImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  // Agar editing mode hai, to product data ko form me fill karein
  useEffect(() => {
    if (isEditing) {
      const productToEdit = products.find((p) => p._id === productId);
      if (productToEdit) {
        setFormData({
          name: productToEdit.name,
          description: productToEdit.description,
          price: productToEdit.price,
          stock: productToEdit.stock,
          category: productToEdit.category,
        });
        // Existing image ko preview me dikhayein
        if (productToEdit.images && productToEdit.images.length > 0) {
          setImagePreviewUrl(productToEdit.images[0]);
        }
      }
      // Agar products list khali hai, to aap yahan dispatch(getAllProducts()) call kar sakte hain
    }
  }, [isEditing, productId, products]);

  // Input fields ke change ko handle karein
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Image change ko handle karein
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  // Form submit ko handle karein
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create ke liye FormData ka istemal karein
    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("price", formData.price);
    productData.append("stock", formData.stock);
    productData.append("category", formData.category);
    if (productImage) {
      productData.append("images", productImage); // Key 'images' honi chahiye (multer ke according)
    }

    let resultAction;
    if (isEditing) {
      // Backend update function abhi image handle nahi kar raha, sirf text data bhejenge
      resultAction = await dispatch(
        updateProduct({ ...formData, _id: productId })
      );
    } else {
      resultAction = await dispatch(createProduct(productData));
    }

    // Agar action successful hai to navigate karein
    if (
      createProduct.fulfilled.match(resultAction) ||
      updateProduct.fulfilled.match(resultAction)
    ) {
      navigate("/admin/products");
    }
  };

  return (
    <div className={classes.pageContainer}>
      <Box className={classes.headerContainer}>
        <Typography variant="h4" className={classes.pageTitle}>
          {isEditing ? "Edit Product" : "Add New Product"}
        </Typography>
        <Button
          component={Link}
          to="/admin/products"
          color="primary"
          startIcon={<ArrowBackIcon />}
        >
          Back to Products
        </Button>
      </Box>

      {/* Form tag aur onSubmit handler add karein */}
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={4}>
          {/* Left Column: Product Details Form */}
          <Grid item xs={12} md={8}>
            <Card className={classes.formCard}>
              <CardContent>
                <Typography variant="h6" className={classes.sectionTitle}>
                  Product Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      name="name"
                      label="Product Name"
                      variant="outlined"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      name="price"
                      label="Price (₹)"
                      type="number"
                      variant="outlined"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      name="stock"
                      label="Stock Quantity"
                      type="number"
                      variant="outlined"
                      value={formData.stock}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      name="category"
                      label="Category"
                      variant="outlined"
                      value={formData.category}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      name="description"
                      label="Product Description"
                      variant="outlined"
                      multiline
                      rows={6}
                      placeholder="Describe the product details..."
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column: Image Uploader */}
          <Grid item xs={12} md={4}>
            <Card className={classes.formCard}>
              <CardContent>
                <Typography variant="h6" className={classes.sectionTitle}>
                  Product Image
                </Typography>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="product-image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="product-image-upload">
                  <Box className={classes.imageUploader}>
                    <IconButton color="primary" component="span">
                      <PhotoCamera style={{ fontSize: 40 }} />
                    </IconButton>
                    <Typography>Click to upload image</Typography>
                  </Box>
                </label>
                {imagePreviewUrl && (
                  <Box mt={2}>
                    <Typography variant="subtitle2">Image Preview:</Typography>
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className={classes.imagePreview}
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Error Message Display */}
        {status === "failed" && (
          <Box mt={2}>
            <Typography color="error">{message}</Typography>
          </Box>
        )}

        {/* Save Button */}
        <Box mt={4} style={{ textAlign: "right" }}>
          <Button
            type="submit"
            variant="contained"
            className={classes.buttonPrimary}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <CircularProgress size={24} color="inherit" />
            ) : isEditing ? (
              "Save Changes"
            ) : (
              "Create Product"
            )}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddEditProductPage;
