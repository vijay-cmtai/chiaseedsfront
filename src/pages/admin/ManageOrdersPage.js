import React, { useState, useEffect, useMemo, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllAdminOrders,
  updateOrderStatus,
} from "../../features/admin/adminSlice";

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
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SearchIcon from "@material-ui/icons/Search";

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
  },
  pageTitle: { fontWeight: "bold", color: colors.textDark },
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
  orderId: {
    fontWeight: 500,
    color: colors.primary,
    cursor: "pointer",
    "&:hover": { textDecoration: "underline" },
  },
  chip: {
    borderRadius: "16px",
    fontWeight: "bold",
    height: "26px",
    fontSize: "0.8rem",
    textTransform: "capitalize",
  },
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
  dialogTitle: { color: colors.textDark, fontWeight: "bold" },
}));

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

const ManageOrdersPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
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
            style={{ flexGrow: 1 }}
            variant="standard"
            placeholder="Search by Order ID or Customer Name..."
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

        <TableContainer>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingStatus === "loading" &&
              (!orders || orders.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress style={{ color: colors.primary }} />
                  </TableCell>
                </TableRow>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order._id} className={classes.tableRow}>
                    <TableCell>
                      <Typography
                        onClick={() => handleOpenViewDialog(order)}
                        variant="body1"
                        className={classes.orderId}
                      >
                        {order._id}
                      </Typography>
                    </TableCell>
                    <TableCell>{order.user?.name || "N/A"}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>₹{order.totalPrice.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.orderStatus} // Use orderStatus
                        className={`${classes.chip} ${getStatusChipClass(order.orderStatus, classes)}`}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleOpenViewDialog(order)}
                        size="small"
                        style={{ color: colors.primary }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography>No orders found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {viewingOrder && (
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            <Typography className={classes.dialogTitle}>
              Order Details: {viewingOrder._id}
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography color="textSecondary">Customer:</Typography>
                <Typography>
                  <strong>{viewingOrder.user?.name || "N/A"}</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="textSecondary">Order Date:</Typography>
                <Typography>
                  <strong>
                    {new Date(viewingOrder.createdAt).toLocaleString()}
                  </strong>
                </Typography>
              </Grid>

              {/* === THIS IS THE CORRECTED PART === */}
              <Grid item xs={12}>
                <Typography color="textSecondary">Shipping Address:</Typography>
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
                    <Typography>
                      {item.name} (Qty: {item.quantity})
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography align="right">
                      <strong>₹{item.price * item.quantity}</strong>
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
              <Grid item xs={4}>
                <Typography variant="h6" align="right">
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
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              style={{ color: colors.textMuted }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateStatus}
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
