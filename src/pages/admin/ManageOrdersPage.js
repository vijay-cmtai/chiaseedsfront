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
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AutorenewIcon from "@material-ui/icons/Autorenew";

import OrderTracker from "../../components/OrderTracker";
import {
  getAllAdminOrders,
  createShipmentForOrder,
  resetAdminStatus,
} from "../../features/admin/adminSlice";

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(3), backgroundColor: "#f9f9f9" },
  header: { marginBottom: theme.spacing(3), fontWeight: "bold" },
  tableContainer: {
    maxHeight: "75vh",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  alertBox: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    backgroundColor: "#fffbe6",
    color: "#856404",
    borderLeft: `5px solid #ffc107`,
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

const Row = ({ order }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const isFailedShipment =
    order.orderStatus === "Paid" && !order.shipmentDetails?.trackingNumber;
  const { status: actionStatus } = useSelector((state) => state.admin);

  const handleRetryShipment = () => {
    dispatch(createShipmentForOrder(order._id)); // ✅ Corrected
  };

  return (
    <>
      <TableRow className={isFailedShipment ? classes.failedShipmentRow : ""}>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
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

              {isFailedShipment && (
                <Box
                  display="flex"
                  alignItems="center"
                  bgcolor="#ffebee"
                  p={1}
                  borderRadius={1}
                  mb={2}
                >
                  <Typography
                    variant="body2"
                    color="error"
                    style={{ flexGrow: 1 }}
                  >
                    Automatic shipment failed.
                  </Typography>
                  <Tooltip title="Retry Shipment Creation">
                    <IconButton
                      onClick={handleRetryShipment}
                      disabled={actionStatus === "loading"}
                    >
                      {actionStatus === "loading" ? (
                        <CircularProgress size={20} />
                      ) : (
                        <AutorenewIcon color="primary" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}

              <OrderTracker order={order} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const ManageOrdersPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { orders = [], status, message } = useSelector((state) => state.admin);

  useEffect(() => {
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

  if (status === "failed") {
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
              <Row key={order._id} order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageOrdersPage;
