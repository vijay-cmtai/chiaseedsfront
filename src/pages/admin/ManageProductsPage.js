// src/components/admin/ManageProductsPage.js (MOBILE RESPONSIVE VERSION)

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../../features/admin/adminSlice";

// --- Material-UI Imports ---
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
  Hidden,
  Grid,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// --- Styles with Enhanced Mobile Responsiveness ---
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
  container: {
    padding: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2),
    },
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
      gap: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  pageTitle: {
    fontWeight: "bold",
    color: colors.textDark,
    fontSize: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
      textAlign: "center",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.1rem",
    },
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "8px",
    textTransform: "none",
    "&:hover": { backgroundColor: colors.primaryHover },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
      padding: theme.spacing(1, 2),
      width: "100%",
    },
  },
  contentCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    [theme.breakpoints.down("sm")]: {
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      margin: theme.spacing(0, -1),
    },
  },
  toolbar: {
    padding: theme.spacing(2, 3),
    display: "flex",
    gap: theme.spacing(2),
    alignItems: "center",
    borderBottom: `1px solid ${colors.borderColor}`,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(1.5),
      padding: theme.spacing(1.5, 2),
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1, 1.5),
    },
  },
  searchField: {
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  filterSelect: {
    minWidth: 150,
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.primary,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "auto",
    },
  },
  tableHead: {
    backgroundColor: colors.lightBg,
    "& .MuiTableCell-head": {
      fontWeight: "bold",
      color: colors.textDark,
      borderBottom: "none",
      fontSize: "0.95rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.85rem",
        padding: theme.spacing(1, 0.5),
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.8rem",
        padding: theme.spacing(0.5),
      },
    },
  },
  tableRow: {
    "& .MuiTableCell-root": {
      borderBottom: `1px solid ${colors.borderColor}`,
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.85rem",
        padding: theme.spacing(1, 0.5),
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.8rem",
        padding: theme.spacing(0.5),
      },
    },
    "&:last-child .MuiTableCell-root": { borderBottom: "none" },
    "&:hover": { backgroundColor: colors.lightBg },
  },
  productCell: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: theme.spacing(0.5),
    },
  },
  productImage: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(1.5),
    borderRadius: "8px",
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
      marginRight: theme.spacing(0.5),
    },
  },
  productName: {
    fontWeight: 500,
    color: colors.textDark,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.85rem",
      lineHeight: 1.2,
    },
  },
  chip: {
    borderRadius: "16px",
    fontWeight: "bold",
    height: "24px",
    fontSize: "0.75rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.7rem",
      height: "20px",
    },
  },
  statusPublished: { backgroundColor: colors.lightGreen, color: colors.green },
  statusOutOfStock: { backgroundColor: colors.lightRed, color: colors.red },
  successMessage: {
    padding: theme.spacing(1.5, 2),
    backgroundColor: colors.lightGreen,
    color: colors.green,
    borderRadius: "8px",
    marginBottom: theme.spacing(2),
    fontWeight: 500,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
      padding: theme.spacing(1, 1.5),
      margin: theme.spacing(0, -1, 2, -1),
    },
  },
  actionsCell: {
    display: "flex",
    gap: theme.spacing(0.5),
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      gap: theme.spacing(0.2),
    },
  },
  actionButton: {
    padding: theme.spacing(0.5),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0.3),
    },
  },
  mobileCard: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(2),
    borderRadius: "8px",
    border: `1px solid ${colors.borderColor}`,
    backgroundColor: colors.cardBg,
  },
  mobileProductHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  mobileProductInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  mobileActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(1),
  },
  priceText: {
    fontWeight: "bold",
    color: colors.primary,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
  categoryText: {
    color: colors.textMuted,
    fontSize: "0.9rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  stockText: {
    fontSize: "0.9rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  // Hide table on mobile, show cards instead
  desktopTable: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobileView: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
}));

const getStatusChipDetails = (stock, classes) => {
  return stock > 0
    ? { label: "In Stock", className: classes.statusPublished }
    : { label: "Out of Stock", className: classes.statusOutOfStock };
};

const ManageProductsPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { products = [], status } = useSelector((state) => state.admin || {});

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
      const timer = setTimeout(() => setSuccessMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate, location.pathname]);

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

  // Mobile Card Component
  const MobileProductCard = ({ product }) => {
    const stockStatus = getStatusChipDetails(product.stock, classes);

    return (
      <Card className={classes.mobileCard}>
        <Box className={classes.mobileProductHeader}>
          <Avatar
            src={product.images?.[0] || ""}
            variant="rounded"
            className={classes.productImage}
          />
          <Box sx={{ ml: 1, flex: 1 }}>
            <Typography variant="body1" className={classes.productName}>
              {product.name}
            </Typography>
            <Typography variant="body2" className={classes.categoryText}>
              {product.category}
            </Typography>
          </Box>
        </Box>

        <Box className={classes.mobileProductInfo}>
          <Box>
            <Typography variant="body1" className={classes.priceText}>
              ₹{product.price}
            </Typography>
            <Typography variant="body2" className={classes.stockText}>
              Stock: {product.stock}
            </Typography>
          </Box>
          <Chip
            label={stockStatus.label}
            className={`${classes.chip} ${stockStatus.className}`}
          />
        </Box>

        <Box className={classes.mobileActions}>
          <IconButton
            size="small"
            component={Link}
            to={`/admin/products/edit/${product._id}`}
            style={{ color: colors.primary }}
            className={classes.actionButton}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            style={{ color: colors.red }}
            onClick={() => handleDeleteProduct(product._id)}
            className={classes.actionButton}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Card>
    );
  };

  return (
    <div className={classes.container}>
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
            className={classes.searchField}
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
            className={classes.filterSelect}
          >
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              label="Category"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Desktop Table View */}
        <Box className={classes.desktopTable}>
          <TableContainer style={{ width: "100%", overflowX: "auto" }}>
            <Table style={{ minWidth: 650 }}>
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
                        <TableCell>
                          <Typography className={classes.categoryText}>
                            {product.category}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className={classes.priceText}>
                            ₹{product.price}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className={classes.stockText}>
                            {product.stock}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={stockStatus.label}
                            className={`${classes.chip} ${stockStatus.className}`}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Box className={classes.actionsCell}>
                            <IconButton
                              size="small"
                              component={Link}
                              to={`/admin/products/edit/${product._id}`}
                              style={{ color: colors.primary }}
                              className={classes.actionButton}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              style={{ color: colors.red }}
                              onClick={() => handleDeleteProduct(product._id)}
                              className={classes.actionButton}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
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
        </Box>

        {/* Mobile Card View */}
        <Box className={classes.mobileView}>
          {status === "loading" && products.length === 0 ? (
            <Box textAlign="center" p={3}>
              <CircularProgress />
            </Box>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <MobileProductCard key={product._id} product={product} />
            ))
          ) : (
            <Box textAlign="center" p={3}>
              <Typography>No products found.</Typography>
            </Box>
          )}
        </Box>
      </Card>
    </div>
  );
};

export default ManageProductsPage;
