// src/pages/admin/ManageOrdersPage.js (FULLY RESPONSIVE)

import React, { useState, useEffect, useMemo, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllAdminOrders,
  updateOrderStatus,
} from "../../features/admin/adminSlice";

// --- Material-UI Imports ---
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
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
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
  CircularProgress,
  Collapse,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

// --- Styles ---
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
  blue: "#3498db",
  lightBlue: "rgba(52, 152, 219, 0.1)",
  orange: "#f39c12",
  lightOrange: "rgba(243, 156, 18, 0.1)",
  red: "#c0392b",
  lightRed: "rgba(192, 57, 43, 0.1)",
  purple: "#8e44ad",
  lightPurple: "rgba(142, 68, 173, 0.1)",
};

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
      gap: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
  },
  pageTitle: {
    fontWeight: "bold",
    color: colors.textDark,
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      fontSize: "1.8rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  contentCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    [theme.breakpoints.down("xs")]: {
      borderRadius: "8px",
      margin: theme.spacing(0, 1),
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
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1.5),
    },
  },
  tableContainer: {
    overflowX: "auto",
    "&::-webkit-scrollbar": {
      height: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: colors.borderColor,
      borderRadius: "4px",
    },
  },
  table: {
    minWidth: 750,
    [theme.breakpoints.down("sm")]: {
      minWidth: 600,
    },
  },
  tableHead: {
    backgroundColor: colors.lightBg,
    "& .MuiTableCell-head": {
      fontWeight: "bold",
      color: colors.textDark,
      borderBottom: "none",
      fontSize: "0.9rem",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.8rem",
        padding: theme.spacing(1),
      },
    },
  },
  tableRow: {
    "& .MuiTableCell-root": {
      borderBottom: `1px solid ${colors.borderColor}`,
      padding: theme.spacing(2),
      fontSize: "0.9rem",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1),
        fontSize: "0.8rem",
      },
    },
    "&:last-child .MuiTableCell-root": { borderBottom: "none" },
    "&:hover": { backgroundColor: colors.lightBg },
  },
  // Mobile Card View (Alternative to table)
  mobileCard: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: colors.cardBg,
    border: `1px solid ${colors.borderColor}`,
  },
  mobileCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  mobileCardContent: {
    marginTop: theme.spacing(1),
  },
  mobileCardRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(0.5),
  },
  expandButton: {
    padding: "4px",
    color: colors.primary,
  },
  orderId: {
    fontWeight: 500,
    color: colors.primary,
    cursor: "pointer",
    "&:hover": { textDecoration: "underline" },
  },
  chip: {
    borderRadius: "16px",
    fontWeight: "bold",
    height: "28px",
    fontSize: "0.75rem",
    textTransform: "capitalize",
    [theme.breakpoints.down("xs")]: {
      height: "24px",
      fontSize: "0.7rem",
    },
  },
  // Status chip styles
  statusCompleted: { backgroundColor: colors.lightGreen, color: colors.green },
  statusShipped: { backgroundColor: colors.lightBlue, color: colors.blue },
  statusPending: { backgroundColor: colors.lightOrange, color: colors.orange },
  statusProcessing: {
    backgroundColor: colors.lightPurple,
    color: colors.purple,
  },
  statusCancelled: { backgroundColor: colors.lightRed, color: colors.red },
  filterSelect: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.primary,
    },
  },
  dialogTitle: {
    color: colors.textDark,
    fontWeight: "bold",
  },
  dialogActions: {
    padding: theme.spacing(1, 3, 2, 3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1, 2, 2, 2),
      flexDirection: "column",
      gap: theme.spacing(1),
      "& > *": {
        width: "100%",
      },
    },
  },
  // Hidden on mobile
  hiddenOnMobile: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  // Show only on mobile
  showOnMobile: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  searchTextField: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: colors.primary,
      },
    },
  },
}));

// Helper function
const getStatusChipClass = (status, classes) => {
  const statusLower = status?.toLowerCase();
  switch (statusLower) {
    case "completed":
      return classes.statusCompleted;
    case "shipped":
      return classes.statusShipped;
    case "processing":
      return classes.statusProcessing;
    case "pending":
      return classes.statusPending;
    case "cancelled":
      return classes.statusCancelled;
    default:
      return "";
  }
};

// Mobile Order Card Component
const MobileOrderCard = ({ order, classes, onViewOrder }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={classes.mobileCard}>
      <div className={classes.mobileCardHeader}>
        <Typography
          variant="body2"
          className={classes.orderId}
          onClick={() => onViewOrder(order)}
        >
          #{order._id.slice(-6).toUpperCase()}
        </Typography>
        <IconButton
          size="small"
          className={classes.expandButton}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </div>

      <div className={classes.mobileCardRow}>
        <Typography variant="body2" color="textSecondary">
          Customer:
        </Typography>
        <Typography variant="body2" style={{ fontWeight: 500 }}>
          {order.user?.name || "N/A"}
        </Typography>
      </div>

      <div className={classes.mobileCardRow}>
        <Typography variant="body2" color="textSecondary">
          Total:
        </Typography>
        <Typography variant="body2" style={{ fontWeight: 500 }}>
          ₹{order.totalPrice.toLocaleString()}
        </Typography>
      </div>

      <div className={classes.mobileCardRow}>
        <Typography variant="body2" color="textSecondary">
          Status:
        </Typography>
        <Chip
          label={order.orderStatus}
          className={`${classes.chip} ${getStatusChipClass(
            order.orderStatus,
            classes
          )}`}
        />
      </div>

      <Collapse in={expanded}>
        <div className={classes.mobileCardContent}>
          <Divider style={{ margin: "8px 0" }} />
          <div className={classes.mobileCardRow}>
            <Typography variant="body2" color="textSecondary">
              Date:
            </Typography>
            <Typography variant="body2">
              {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
          </div>
          <div className={classes.mobileCardRow} style={{ marginTop: "8px" }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => onViewOrder(order)}
              style={{
                color: colors.primary,
                borderColor: colors.primary,
                width: "100%",
              }}
            >
              View Details
            </Button>
          </div>
        </div>
      </Collapse>
    </Card>
  );
};

const ManageOrdersPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));

  const { orders, status: loadingStatus } = useSelector((state) => state.admin);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("Pending");

  useEffect(() => {
    dispatch(getAllAdminOrders());
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    return orders.filter((order) => {
      const customerName = order.user?.name || "";
      const orderId = order._id || "";
      const orderStatus = order.orderStatus || "";

      const searchMatch =
        orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customerName.toLowerCase().includes(searchTerm.toLowerCase());

      const statusMatch =
        statusFilter === "All" ||
        orderStatus.toLowerCase() === statusFilter.toLowerCase();

      return searchMatch && statusMatch;
    });
  }, [orders, searchTerm, statusFilter]);

  const handleOpenViewDialog = (order) => {
    setViewingOrder(order);
    const validStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Completed",
      "Cancelled",
    ];
    const currentStatus = order.orderStatus;
    setNewStatus(
      validStatuses.includes(currentStatus) ? currentStatus : "Pending"
    );
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setViewingOrder(null);
  };

  const handleUpdateStatus = async () => {
    if (!viewingOrder || !newStatus) return;
    const resultAction = await dispatch(
      updateOrderStatus({ orderId: viewingOrder._id, status: newStatus })
    );
    if (updateOrderStatus.fulfilled.match(resultAction)) {
      handleCloseDialog();
    }
  };

  return (
    <div>
      <Box className={classes.headerContainer}>
        <Typography variant="h4" className={classes.pageTitle}>
          Manage Orders
        </Typography>
      </Box>

      <Card className={classes.contentCard}>
        <Box className={classes.toolbar}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search by Order ID or Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={classes.searchTextField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <FormControl
            variant="outlined"
            size="small"
            fullWidth
            style={{ maxWidth: isMobile ? "100%" : "200px" }}
          >
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
              className={classes.filterSelect}
            >
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Mobile View */}
        {isMobile ? (
          <div className={classes.showOnMobile}>
            {loadingStatus === "loading" && (!orders || orders.length === 0) ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ padding: "40px 0" }}
              >
                <CircularProgress style={{ color: colors.primary }} />
              </Box>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <MobileOrderCard
                  key={order._id}
                  order={order}
                  classes={classes}
                  onViewOrder={handleOpenViewDialog}
                />
              ))
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ padding: "40px 0" }}
              >
                <Typography>No orders found.</Typography>
              </Box>
            )}
          </div>
        ) : (
          /* Desktop/Tablet Table View */
          <div className={classes.hiddenOnMobile}>
            <TableContainer className={classes.tableContainer}>
              <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer</TableCell>
                    {!isTablet && <TableCell>Date</TableCell>}
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingStatus === "loading" &&
                  (!orders || orders.length === 0) ? (
                    <TableRow>
                      <TableCell
                        colSpan={isTablet ? 5 : 6}
                        align="center"
                        style={{ padding: "40px 0" }}
                      >
                        <CircularProgress style={{ color: colors.primary }} />
                      </TableCell>
                    </TableRow>
                  ) : filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <TableRow key={order._id} className={classes.tableRow}>
                        <TableCell>
                          <Typography
                            onClick={() => handleOpenViewDialog(order)}
                            variant="body2"
                            className={classes.orderId}
                          >
                            #{order._id.slice(-6).toUpperCase()}
                          </Typography>
                        </TableCell>
                        <TableCell>{order.user?.name || "N/A"}</TableCell>
                        {!isTablet && (
                          <TableCell>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </TableCell>
                        )}
                        <TableCell>
                          ₹{order.totalPrice.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={order.orderStatus}
                            className={`${classes.chip} ${getStatusChipClass(
                              order.orderStatus,
                              classes
                            )}`}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => handleOpenViewDialog(order)}
                            size="small"
                            style={{ color: colors.primary }}
                            aria-label="view order"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={isTablet ? 5 : 6}
                        align="center"
                        style={{ padding: "40px 0" }}
                      >
                        <Typography>No orders found.</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Card>

      {/* Dialog */}
      {viewingOrder && (
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
          scroll="paper"
          fullScreen={isMobile} // Full screen on mobile
        >
          <DialogTitle>
            <Typography variant="h6" className={classes.dialogTitle}>
              Order Details: #{viewingOrder._id.slice(-6).toUpperCase()}
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography color="textSecondary" variant="body2">
                  Customer:
                </Typography>
                <Typography>
                  <strong>{viewingOrder.user?.name || "N/A"}</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="textSecondary" variant="body2">
                  Order Date:
                </Typography>
                <Typography>
                  <strong>
                    {new Date(viewingOrder.createdAt).toLocaleString()}
                  </strong>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="textSecondary" variant="body2">
                  Shipping Address:
                </Typography>
                <Typography>
                  <strong>
                    {viewingOrder.shippingAddress
                      ? `${viewingOrder.shippingAddress.street}, ${viewingOrder.shippingAddress.city}, ${viewingOrder.shippingAddress.state} - ${viewingOrder.shippingAddress.postalCode}`
                      : "Not Available"}
                  </strong>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider style={{ margin: "16px 0" }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.dialogTitle}>
                  Items
                </Typography>
              </Grid>
              {viewingOrder.orderItems.map((item) => (
                <Fragment key={item.product}>
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      {item.name} (Qty: {item.quantity})
                    </Typography>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: "right" }}>
                    <Typography variant="body2">
                      <strong>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </strong>
                    </Typography>
                  </Grid>
                </Fragment>
              ))}
              <Grid item xs={12}>
                <Divider style={{ margin: "16px 0" }} />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6">
                  <strong>Total</strong>
                </Typography>
              </Grid>
              <Grid item xs={4} style={{ textAlign: "right" }}>
                <Typography variant="h6">
                  <strong>₹{viewingOrder.totalPrice.toLocaleString()}</strong>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider style={{ margin: "16px 0" }} />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Update Status</InputLabel>
                  <Select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    label="Update Status"
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Processing">Processing</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button
              onClick={handleCloseDialog}
              variant="text"
              style={{ color: colors.textMuted }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateStatus}
              variant="contained"
              style={{ backgroundColor: colors.primary, color: "white" }}
              disabled={loadingStatus === "loading"}
            >
              {loadingStatus === "loading" ? "Saving..." : "Save Changes"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ManageOrdersPage;
