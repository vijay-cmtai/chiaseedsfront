import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../../features/admin/adminSlice";

// --- Material-UI Imports (No Changes) ---
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Card,
  Box,
  Button,
  TextField,
  InputAdornment,
  Avatar,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";

// --- Styles (No Changes) ---
const colors = {
  primary: "#a96e4f",
  primaryHover: "#8e5a3e",
  textDark: "#2c3e50",
  textMuted: "#667280",
  cardBg: "#ffffff",
  borderColor: "#e0e0e0",
  lightBg: "#f9f7f3",
  green: "#27ae60",
  lightGreen: "rgba(39, 174, 96, 0.1)",
  red: "#c0392b",
  lightRed: "rgba(192, 57, 43, 0.1)",
};
const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  pageTitle: { fontWeight: "bold", color: colors.textDark },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "8px",
    "&:hover": { backgroundColor: colors.primaryHover },
  },
  contentCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
  },
  toolbar: {
    padding: theme.spacing(2, 3),
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center",
    borderBottom: `1px solid ${colors.borderColor}`,
  },
  tableHead: {
    backgroundColor: colors.lightBg,
    "& .MuiTableCell-head": {
      fontWeight: "bold",
      color: colors.textDark,
      borderBottom: "none",
    },
  },
  tableRow: {
    "& .MuiTableCell-root": { borderBottom: `1px solid ${colors.borderColor}` },
    "&:last-child .MuiTableCell-root": { borderBottom: "none" },
    "&:hover": { backgroundColor: colors.lightBg },
  },
  productCell: { display: "flex", alignItems: "center" },
  productImage: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
    borderRadius: "8px",
  },
  productName: { fontWeight: 500, color: colors.textDark },
  chip: {
    borderRadius: "16px",
    fontWeight: "bold",
    height: "26px",
    fontSize: "0.8rem",
  },
  statusPublished: { backgroundColor: colors.lightGreen, color: colors.green },
  statusOutOfStock: { backgroundColor: colors.lightRed, color: colors.red },
  filterSelect: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.primary,
    },
  },
  successMessage: {
    padding: theme.spacing(1, 2),
    backgroundColor: colors.lightGreen,
    color: colors.green,
    borderRadius: "8px",
    marginBottom: theme.spacing(2),
    fontWeight: 500,
    textAlign: "center",
  },
}));

const getStatusChipDetails = (stock, classes) => {
  return stock > 0
    ? { label: "In Stock", className: classes.statusPublished }
    : { label: "Out of Stock", className: classes.statusOutOfStock };
};

const ManageProductsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Redux se data get karein
  const { products = [], status } = useSelector((state) => state.admin || {});

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllProducts());
    }
  }, [status, dispatch]);

  // Success message (agar pichle page se aaya hai)
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      navigate(location.pathname, { replace: true });
      setTimeout(() => setSuccessMessage(""), 4000);
    }
  }, [location, navigate]);

  const filteredProducts = (products || []).filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
    }
  };

  const categories = [
    "All",
    ...new Set((products || []).map((p) => p.category)),
  ];

  return (
    <div>
      <Box className={classes.headerContainer}>
        <Typography variant="h4" className={classes.pageTitle}>
          Manage Products
        </Typography>
        <Button
          component={Link}
          to="/admin/products/add"
          variant="contained"
          className={classes.buttonPrimary}
          startIcon={<AddIcon />}
        >
          Add Product
        </Button>
      </Box>

      {successMessage && (
        <Box className={classes.successMessage}>
          <Typography variant="body1">{successMessage}</Typography>
        </Box>
      )}

      <Card className={classes.contentCard}>
        <Box className={classes.toolbar}>
          <TextField
            style={{ flexGrow: 1 }}
            variant="standard"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          />
          <FormControl
            variant="outlined"
            size="small"
            style={{ minWidth: 150 }}
          >
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              label="Category"
              className={classes.filterSelect}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TableContainer>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {status === "loading" && products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length > 0 ? (
                // Ab hum seedhe `filteredProducts` ko map karenge
                filteredProducts.map((product) => {
                  const stockStatus = getStatusChipDetails(
                    product.stock,
                    classes
                  );
                  return (
                    <TableRow key={product._id} className={classes.tableRow}>
                      <TableCell>
                        <Box className={classes.productCell}>
                          <Avatar
                            src={product.images?.[0] || ""}
                            variant="rounded"
                            className={classes.productImage}
                          />
                          <Typography
                            variant="body1"
                            className={classes.productName}
                          >
                            {product.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Chip
                          label={stockStatus.label}
                          className={`${classes.chip} ${stockStatus.className}`}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          component={Link}
                          to={`/admin/products/edit/${product._id}`}
                          style={{ color: colors.primary }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          style={{ color: colors.red }}
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography>No products found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default ManageProductsPage;
