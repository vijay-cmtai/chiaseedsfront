import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Collapse,
  Button,
  useTheme,
  useMediaQuery,
  TextField,
  Divider, // Divider ko import rehne dein
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import OrderTracker from "../../components/OrderTracker";
import { getAllAdminOrders } from "../../features/admin/adminSlice";
import {
  cancelOrder,
  retryShipment,
} from "../../features/payment/paymentSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: { padding: theme.spacing(3) },
    backgroundColor: "#f9f9f9",
  },
  header: { marginBottom: theme.spacing(3), fontWeight: "bold" },
  tableContainer: {
    maxHeight: "75vh",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  chip: {
    fontWeight: "bold",
    textTransform: "capitalize",
    borderRadius: "16px",
    color: "#fff",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.grey[200],
  },
  collapsibleCell: { padding: 0 },
  detailsBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[50],
  },
  mobileCard: {
    marginBottom: theme.spacing(2),
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1.5, 2),
  },
  cardContent: { padding: theme.spacing(0, 2, 2, 2) },
  cardRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  cancelButton: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
  retryButton: {
    color: theme.palette.info.dark,
    borderColor: theme.palette.info.dark,
  },
  actionSection: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[200]}`,
  },
  infoBox: {
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
}));

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "shipped":
      return "#17a2b8";
    case "delivered":
      return "#28a745";
    case "paid":
      return "#ffc107";
    case "processing":
      return "#fd7e14";
    case "cancelled":
      return "#dc3545";
    default:
      return "#6c757d";
  }
};

// --- CORRECTED OrderActions COMPONENT ---
const OrderActions = ({
  order,
  onCancel,
  onRetry,
  isCancelling,
  isRetrying,
}) => {
  const classes = useStyles();
  const [reason, setReason] = useState("");

  const isShipmentFailed =
    order.orderStatus === "Paid" && !order.shipmentDetails?.trackingNumber;
  const isShippedOrDone = ["Shipped", "Delivered", "Cancelled"].includes(
    order.orderStatus
  );

  if (isCancelling || isRetrying) {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <CircularProgress size={20} />
        <Typography>
          {isCancelling ? "Cancelling order..." : "Retrying shipment..."}
        </Typography>
      </Box>
    );
  }

  if (isShippedOrDone) {
    return (
      <Box
        className={classes.infoBox}
        bgcolor={order.orderStatus === "Cancelled" ? "#f8d7da" : "#e3f6f8"}
      >
        <Typography variant="body2" style={{ fontWeight: 500 }}>
          {order.orderStatus === "Cancelled"
            ? `This order was cancelled by ${order.cancellationDetails?.cancelledBy || "N/A"}.`
            : "This order is with the delivery partner and cannot be modified."}
        </Typography>
      </Box>
    );
  }

  if (isShipmentFailed) {
    return (
      <Box display="flex" flexDirection="column" gap={2}>
        <Box bgcolor="#ffebee" p={1.5} borderRadius={1}>
          <Typography
            variant="body2"
            color="error"
            style={{ fontWeight: "bold" }}
          >
            Automatic Shipment Failed. Please choose an action.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          className={classes.retryButton}
          onClick={() => onRetry(order._id)}
        >
          Retry Shipment Creation
        </Button>

        {/* --- 💡 FIX IS HERE --- */}
        <Box display="flex" alignItems="center" my={1}>
          <Divider style={{ flexGrow: 1 }} />
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ margin: "0 16px" }}
          >
            OR
          </Typography>
          <Divider style={{ flexGrow: 1 }} />
        </Box>

        <TextField
          label="Reason for Cancellation (Optional)"
          variant="outlined"
          size="small"
          fullWidth
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <Button
          variant="outlined"
          className={classes.cancelButton}
          onClick={() => onCancel(order._id, reason)}
        >
          Cancel Order & Refund
        </Button>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Reason for Cancellation (Optional)"
        variant="outlined"
        size="small"
        fullWidth
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <Button
        variant="outlined"
        className={classes.cancelButton}
        onClick={() => onCancel(order._id, reason)}
      >
        Confirm Cancellation
      </Button>
    </Box>
  );
};

const DesktopRow = ({
  order,
  onCancel,
  onRetry,
  cancellingOrderId,
  retryingOrderId,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>#{order._id.slice(-6).toUpperCase()}</TableCell>
        <TableCell>{order.shippingAddress?.fullName || "N/A"}</TableCell>
        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
        <TableCell>₹{order.totalPrice.toLocaleString()}</TableCell>
        <TableCell>
          <Chip
            label={order.orderStatus}
            size="small"
            className={classes.chip}
            style={{ backgroundColor: getStatusColor(order.orderStatus) }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.collapsibleCell} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className={classes.detailsBox}>
              <Typography variant="h6" gutterBottom>
                Order Details
              </Typography>
              <OrderTracker order={order} />
              <Box className={classes.actionSection}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  Actions
                </Typography>
                <OrderActions
                  order={order}
                  onCancel={onCancel}
                  onRetry={onRetry}
                  isCancelling={cancellingOrderId === order._id}
                  isRetrying={retryingOrderId === order._id}
                />
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const MobileCard = ({
  order,
  onCancel,
  onRetry,
  cancellingOrderId,
  retryingOrderId,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Paper className={classes.mobileCard}>
      <Box className={classes.cardHeader}>
        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
          #{order._id.slice(-6).toUpperCase()}
        </Typography>
        <Chip
          label={order.orderStatus}
          size="small"
          className={classes.chip}
          style={{ backgroundColor: getStatusColor(order.orderStatus) }}
        />
      </Box>
      <Box className={classes.cardContent}>
        <Box className={classes.cardRow}>
          <Typography variant="body2" color="textSecondary">
            Customer
          </Typography>
          <Typography variant="body2">
            {order.shippingAddress?.fullName || "N/A"}
          </Typography>
        </Box>
        <Box className={classes.cardRow}>
          <Typography variant="body2" color="textSecondary">
            Total
          </Typography>
          <Typography variant="body2" style={{ fontWeight: 500 }}>
            ₹{order.totalPrice.toLocaleString()}
          </Typography>
        </Box>
        <Box className={classes.cardRow}>
          <Typography variant="body2" color="textSecondary">
            Date
          </Typography>
          <Typography variant="body2">
            {new Date(order.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            size="small"
            onClick={() => setOpen(!open)}
            endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          >
            {open ? "Hide Details" : "Show Details"}
          </Button>
        </Box>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box className={classes.detailsBox}>
          <OrderTracker order={order} />
          <Box className={classes.actionSection}>
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Actions
            </Typography>
            <OrderActions
              order={order}
              onCancel={onCancel}
              onRetry={onRetry}
              isCancelling={cancellingOrderId === order._id}
              isRetrying={retryingOrderId === order._id}
            />
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

const ManageOrdersPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { orders = [], status } = useSelector((state) => state.admin);
  const { status: paymentStatus } = useSelector((state) => state.payment);

  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [retryingOrderId, setRetryingOrderId] = useState(null);

  useEffect(() => {
    dispatch(getAllAdminOrders());
  }, [dispatch]);

  useEffect(() => {
    if (paymentStatus === "succeeded") {
      if (cancellingOrderId || retryingOrderId) {
        dispatch(getAllAdminOrders());
        setCancellingOrderId(null);
        setRetryingOrderId(null);
      }
    } else if (paymentStatus === "failed") {
      if (cancellingOrderId || retryingOrderId) {
        setCancellingOrderId(null);
        setRetryingOrderId(null);
      }
    }
  }, [paymentStatus, cancellingOrderId, retryingOrderId, dispatch]);

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleCancelOrder = (orderId, reason) => {
    if (
      window.confirm(
        "Are you sure you want to cancel this order? This will also initiate a refund."
      )
    ) {
      setCancellingOrderId(orderId);
      dispatch(cancelOrder({ orderId, reason }));
    }
  };

  const handleRetryShipment = (orderId) => {
    setRetryingOrderId(orderId);
    dispatch(retryShipment({ orderId }));
  };

  if (status === "loading" && orders.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.header}>
        Manage All Orders
      </Typography>

      {isMobile ? (
        <Box>
          {sortedOrders.map((order) => (
            <MobileCard
              key={order._id}
              order={order}
              onCancel={handleCancelOrder}
              onRetry={handleRetryShipment}
              cancellingOrderId={cancellingOrderId}
              retryingOrderId={retryingOrderId}
            />
          ))}
        </Box>
      ) : (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table stickyHeader aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell className={classes.tableHeaderCell}>
                  Order ID
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Customer
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>Date</TableCell>
                <TableCell className={classes.tableHeaderCell}>Total</TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedOrders.map((order) => (
                <DesktopRow
                  key={order._id}
                  order={order}
                  onCancel={handleCancelOrder}
                  onRetry={handleRetryShipment}
                  cancellingOrderId={cancellingOrderId}
                  retryingOrderId={retryingOrderId}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ManageOrdersPage;
