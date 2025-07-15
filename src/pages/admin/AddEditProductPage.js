// src/pages/admin/AddEditProductPage.js

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, updateProduct } from "../../features/admin/adminSlice";
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
  CircularProgress,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

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

  const {
    status,
    message,
    products = [],
  } = useSelector((state) => state.admin || {});

  // --- YAHAN BADLAAV KIYA GAYA HAI ---
  // Form state mein weight aur dimensions add karein
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    weight: "",
    length: "",
    breadth: "",
    height: "",
  });
  const [productImage, setProductImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  useEffect(() => {
    if (isEditing) {
      const productToEdit = products.find((p) => p._id === productId);
      if (productToEdit) {
        setFormData({
          name: productToEdit.name || "",
          description: productToEdit.description || "",
          price: productToEdit.price || "",
          stock: productToEdit.stock || "",
          category: productToEdit.category || "",
          // --- YAHAN BADLAAV KIYA GAYA HAI ---
          // Weight aur dimensions ko bhi fill karein
          weight: productToEdit.weight || "",
          length: productToEdit.dimensions?.length || "",
          breadth: productToEdit.dimensions?.breadth || "",
          height: productToEdit.dimensions?.height || "",
        });
        if (productToEdit.mainImage) {
          setImagePreviewUrl(productToEdit.mainImage);
        }
      }
    }
  }, [isEditing, productId, products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // --- YAHAN BADLAAV KIYA GAYA HAI ---
    // FormData mein weight aur dimensions ko bhi append karein
    const productDataForCreation = new FormData();
    Object.keys(formData).forEach((key) => {
      productDataForCreation.append(key, formData[key]);
    });
    if (productImage) {
      productDataForCreation.append("images", productImage);
    }

    // Update ke liye plain object banayein
    const productDataForUpdate = { ...formData, _id: productId };

    let resultAction;
    if (isEditing) {
      // Note: Backend mein image update ka logic alag se banana padega.
      // Abhi ke liye sirf text data update ho raha hai.
      resultAction = await dispatch(updateProduct(productDataForUpdate));
    } else {
      resultAction = await dispatch(createProduct(productDataForCreation));
    }

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

      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={4}>
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
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* --- YAHAN NAYE FIELDS ADD KIYE GAYE HAIN --- */}
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      className={classes.sectionTitle}
                      style={{ marginTop: "20px" }}
                    >
                      Shipping Details
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      required
                      name="weight"
                      label="Weight (kg)"
                      type="number"
                      variant="outlined"
                      value={formData.weight}
                      onChange={handleInputChange}
                      inputProps={{ step: "0.01" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      required
                      name="length"
                      label="Length (cm)"
                      type="number"
                      variant="outlined"
                      value={formData.length}
                      onChange={handleInputChange}
                      inputProps={{ step: "0.1" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      required
                      name="breadth"
                      label="Breadth (cm)"
                      type="number"
                      variant="outlined"
                      value={formData.breadth}
                      onChange={handleInputChange}
                      inputProps={{ step: "0.1" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      required
                      name="height"
                      label="Height (cm)"
                      type="number"
                      variant="outlined"
                      value={formData.height}
                      onChange={handleInputChange}
                      inputProps={{ step: "0.1" }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

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

        {status === "failed" && (
          <Box mt={2}>
            <Typography color="error">{message}</Typography>
          </Box>
        )}

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