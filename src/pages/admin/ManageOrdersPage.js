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
  Button, // Import Button for mobile view
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import OrderTracker from "../../components/OrderTracker";
import {
  getAllAdminOrders,
  resetAdminStatus,
} from "../../features/admin/adminSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: theme.spacing(3),
    fontWeight: "bold",
  },
  tableContainer: {
    maxHeight: "75vh",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  errorBox: {
    padding: theme.spacing(2),
    backgroundColor: "#f8d7da",
    color: "#721c24",
    borderLeft: "5px solid #dc3545",
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
  failedShipmentRow: { backgroundColor: "rgba(255, 235, 238, 0.6)" },
  collapsibleCell: { padding: 0 },
  detailsBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[50],
  },
  // --- New styles for mobile card view ---
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
  cardContent: {
    padding: theme.spacing(0, 2, 2, 2),
  },
  cardRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1),
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

const FailedShipmentInfo = () => {
  return (
    <Box bgcolor="#ffebee" p={1.5} borderRadius={1} mb={2}>
      <Typography variant="body2" color="error" style={{ fontWeight: "bold" }}>
        Automatic Shipment Failed. Please create it manually.
      </Typography>
    </Box>
  );
};

const DesktopRow = ({ order }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const isFailedShipment =
    order.orderStatus === "Paid" && !order.shipmentDetails?.trackingNumber;

  return (
    <>
      <TableRow className={isFailedShipment ? classes.failedShipmentRow : ""}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>#{order._id.slice(-6).toUpperCase()}</TableCell>
        <TableCell>
          {order.shippingAddress?.fullName || order.user?.fullName || "N/A"}
        </TableCell>
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
              {isFailedShipment && <FailedShipmentInfo />}
              <OrderTracker order={order} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const MobileCard = ({ order }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const isFailedShipment =
    order.orderStatus === "Paid" && !order.shipmentDetails?.trackingNumber;

  return (
    <Paper
      className={`${classes.mobileCard} ${isFailedShipment ? classes.failedShipmentRow : ""}`}
    >
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
            {order.shippingAddress?.fullName || order.user?.fullName || "N/A"}
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
          {isFailedShipment && <FailedShipmentInfo />}
          <OrderTracker order={order} />
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
  const { orders = [], status, message } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(resetAdminStatus());
    dispatch(getAllAdminOrders());
    return () => dispatch(resetAdminStatus());
  }, [dispatch]);

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

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

  if (status === "failed" && orders.length === 0) {
    return (
      <Box p={3}>
        <Paper className={classes.errorBox}>
          <Typography variant="h6">Error</Typography>
          <Typography>{message || "Failed to load orders."}</Typography>
        </Paper>
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
            <MobileCard key={order._id} order={order} />
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
                  DB Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedOrders.map((order) => (
                <DesktopRow key={order._id} order={order} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

// ✨ FIX: Removed the duplicate "export"
export default ManageOrdersPage;
