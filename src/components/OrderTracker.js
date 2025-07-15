import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@material-ui/core";
import trackingService from "../features/tracking/trackingAPI";

const OrderTracker = ({ order }) => {
  const [liveStatus, setLiveStatus] = useState(null); // ✅ typo fixed
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (order?._id && order.shipmentDetails?.trackingNumber) {
      const fetchStatus = async () => {
        setLoading(true);
        try {
          const data = await trackingService.getOrderStatus(order._id);
          setLiveStatus(data.liveCourierStatus);
        } catch (error) {
          console.error("Failed to fetch tracking status", error);
        } finally {
          setLoading(false);
        }
      };
      fetchStatus();
      const interval = setInterval(fetchStatus, 60000); // refresh every 60s
      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, [order?._id, order?.shipmentDetails]);

  if (!order?.shipmentDetails?.trackingNumber) {
    return (
      <Box p={2} bgcolor="#fff3cd" borderRadius="8px">
        <Typography variant="body2" style={{ color: "#856404" }}>
          Order has not been shipped yet. Please check back later.
        </Typography>
      </Box>
    );
  }

  if (loading && !liveStatus) {
    return (
      <Box p={2} display="flex" alignItems="center" gap={1}>
        <CircularProgress size={20} color="primary" />
        <Typography>Loading tracking details...</Typography>
      </Box>
    );
  }

  return (
    <Box my={2} p={2} bgcolor={"#e3f6f8"} borderRadius="8px">
      <Typography
        variant="body2"
        style={{ color: "#17a2b8", fontWeight: "bold" }}
      >
        Live Tracking (Delhivery)
      </Typography>

      <Typography
        variant="body2"
        style={{ color: "#3d2b56", marginTop: "4px" }}
      >
        <strong>Status:</strong> {liveStatus?.status || order.orderStatus}
      </Typography>

      <Typography variant="body2" style={{ color: "#3d2b56" }}>
        <strong>Location:</strong> {liveStatus?.location || "Info awaited"}
      </Typography>

      <Typography variant="body2" style={{ color: "#3d2b56" }}>
        <strong>Tracking #:</strong> {order.shipmentDetails.trackingNumber}
      </Typography>

      {liveStatus?.timestamp && (
        <Typography variant="body2" style={{ color: "#3d2b56" }}>
          <strong>Last Updated:</strong>{" "}
          {new Date(liveStatus.timestamp).toLocaleString()}
        </Typography>
      )}
    </Box>
  );
};

export default OrderTracker;
