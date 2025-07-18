import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAdminDashboardStats,
  getSalesOverview,
  getRecentAdminOrders,
} from "../../features/admin/adminSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Chip,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import AddIcon from "@material-ui/icons/Add";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// --- UPDATED IMPORTS FOR PDF ---
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import logo from "../../images/logo.png"; // IMPORTANT: Make sure this path to your logo is correct

const colors = {
  primary: "#878fba",
  primaryHover: "#6c749d",
  textDark: "#3d2b56",
  textMuted: "#6c749d",
  cardBg: "#ffffff",
  statPurple: "#8854d0",
  statTeal: "#0fb9b1",
  statAmber: "#f7b731",
  statusCompleted: "#20bf6b",
  statusPending: "#fa8231",
};

// ✅ RESPONSIVE STYLES ADDED
const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    padding: theme.spacing(3),
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    // Tablet view
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
    // Mobile view
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
      backgroundColor: "#fff", // Simple white background on mobile
    },
  },
  welcomeHeader: {
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      marginBottom: theme.spacing(3),
      textAlign: "center", // Center align on smaller screens
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.3rem",
      marginBottom: theme.spacing(2),
    },
  },
  statCard: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3),
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    height: "100%",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
    // On mobile, stack icon on top of text
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1.5),
      flexDirection: "column",
      textAlign: "center",
      minHeight: "120px",
    },
  },
  iconContainer: {
    padding: theme.spacing(2),
    borderRadius: "50%",
    marginRight: theme.spacing(3),
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.5),
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: 0,
      marginBottom: theme.spacing(1), // Add margin below icon on mobile
    },
  },
  statContent: {
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
    },
  },
  statValue: {
    fontWeight: "bold",
    color: colors.textDark,
    lineHeight: 1.2,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.1rem",
    },
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: "0.9rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  bottomCard: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1.5),
    },
  },
  chartContainer: {
    height: "350px",
    [theme.breakpoints.down("sm")]: {
      height: "300px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "250px", // Reduced height for mobile
    },
  },
  sectionTitle: {
    fontWeight: 600,
    color: colors.textDark,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      textAlign: "center",
    },
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    "&:hover": { backgroundColor: colors.primaryHover },
    [theme.breakpoints.down("xs")]: {
      width: "100%", // Full width on mobile
      marginBottom: theme.spacing(1),
    },
  },
  buttonSecondary: {
    color: colors.primary,
    borderColor: colors.primary,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginBottom: theme.spacing(1),
    },
  },
  downloadButton: {
    backgroundColor: colors.statTeal,
    color: "#fff",
    "&:hover": { backgroundColor: "#0da89f" },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  statusChip: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "#fff",
  },
  // Mobile-specific styles for the recent orders list
  orderItem: {
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1.5, 0),
      flexDirection: "column",
      alignItems: "flex-start",
      gap: theme.spacing(1),
    },
  },
  orderItemContent: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  orderText: {
    [theme.breakpoints.down("xs")]: {
      "& .MuiListItemText-primary": { fontSize: "0.9rem" },
      "& .MuiListItemText-secondary": { fontSize: "0.8rem" },
    },
  },
  quickActionsGrid: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  errorContainer: {
    padding: theme.spacing(4),
    textAlign: "center",
  },
  // Classes to reorder layout on mobile
  chartCard: {
    [theme.breakpoints.down("xs")]: {
      order: 2, // Show chart second on mobile
    },
  },
  ordersCard: {
    [theme.breakpoints.down("xs")]: {
      order: 1, // Show orders first on mobile
    },
  },
}));

const AdminDashboardPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs")); // Check for mobile screen
  const dispatch = useDispatch();
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    stats = {},
    salesOverview = [],
    recentOrders = [],
    status = "idle",
    message = "",
  } = useSelector((state) => state.admin || {});

  useEffect(() => {
    dispatch(getAdminDashboardStats());
    dispatch(getSalesOverview());
    dispatch(getRecentAdminOrders());
  }, [dispatch]);

  const statsDataForUI = [
    {
      label: "Total Sales",
      value: (stats.totalSales || 0).toLocaleString("en-IN", {
        style: "currency", currency: "INR", maximumFractionDigits: 0,
      }),
      icon: <MonetizationOnIcon />,
      color: colors.statPurple,
    },
    {
      label: "New Orders",
      value: stats.newOrders || 0,
      icon: <ShoppingCartIcon />,
      color: colors.statTeal,
    },
    {
      label: "Active Users",
      value: stats.activeUsers || 0,
      icon: <PeopleIcon />,
      color: colors.statAmber,
    },
  ];

  const handleDownloadReport = async () => {
    setIsDownloading(true);
    const doc = new jsPDF();
    const chartElement = document.getElementById("salesChartContainer");

    doc.addImage(logo, "PNG", 14, 15, 40, 10);
    doc.setFontSize(20);
    doc.text("Admin Dashboard Report", 60, 22);
    // ... rest of PDF logic remains same ...

    doc.save(`Admin-Report-${new Date().toISOString().slice(0, 10)}.pdf`);
    setIsDownloading(false);
  };
  
  const salesDataForUI = salesOverview.map((item) => ({ name: item.name, Sales: item.sales,}));

  const recentOrdersForUI = recentOrders.map((order) => ({
    id: order._id,
    user: order.user?.name || "Unknown User",
    amount: (order.totalPrice || 0).toLocaleString("en-IN", { style: "currency", currency: "INR" }),
    status: order.orderStatus,
  }));

  if (status === "loading" && !stats.totalSales) {
    return (
      <Box className={classes.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed" && !stats.totalSales) {
    return (
      <Box className={classes.errorContainer}>
        <Typography color="error" variant="h6">Error: {message}</Typography>
        <Typography>Could not load dashboard data. Please try again later.</Typography>
      </Box>
    );
  }

  return (
    <div className={classes.dashboardContainer}>
      <Typography variant="h4" className={classes.welcomeHeader}>
        Welcome back, Admin!
      </Typography>

      {/* STAT CARDS */}
      <Grid container spacing={isMobile ? 2 : 3}>
        {statsDataForUI.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.label}>
            <Card className={classes.statCard}>
              <Box className={classes.iconContainer} style={{ backgroundColor: stat.color }}>
                {stat.icon}
              </Box>
              <Box className={classes.statContent}>
                <Typography variant="h5" className={classes.statValue}>
                  {stat.value}
                </Typography>
                <Typography variant="body1" className={classes.statLabel}>
                  {stat.label}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* CHART & RECENT ORDERS */}
      <Grid container spacing={isMobile ? 2 : 4} style={{ marginTop: theme.spacing(1) }}>
        <Grid item xs={12} lg={8} className={classes.chartCard}>
          <Card className={classes.bottomCard} id="salesChartContainer">
            <Typography variant="h6" className={classes.sectionTitle}>
              Monthly Sales Overview
            </Typography>
            <div className={classes.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesDataForUI}
                  margin={{ top: 5, right: isMobile ? 10 : 20, left: isMobile ? -20 : -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={isMobile ? 10 : 12} />
                  <YAxis fontSize={isMobile ? 10 : 12} />
                  <Tooltip formatter={(value) => value.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}/>
                  <Legend />
                  <Line type="monotone" dataKey="Sales" stroke={colors.primary} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4} className={classes.ordersCard}>
          <Card className={classes.bottomCard}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Recent Orders
            </Typography>
            <List>
              {recentOrdersForUI.map((order) => (
                  <ListItem key={order.id} divider className={classes.orderItem}>
                    {/* On mobile, this content stacks vertically */}
                    <ListItemAvatar>
                      <Avatar className={classes.orderAvatar}>{order.user.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    {/* This Box helps align text and chip on mobile */}
                    <Box className={classes.orderItemContent}>
                      <ListItemText
                        primary={order.user}
                        secondary={`Amount - ${order.amount}`}
                        className={classes.orderText}
                      />
                      <Chip
                        label={order.status}
                        size="small"
                        className={classes.statusChip}
                        style={{
                          backgroundColor: order.status === "Completed" ? colors.statusCompleted : colors.statusPending,
                        }}
                      />
                    </Box>
                  </ListItem>
                ))}
            </List>
          </Card>
        </Grid>
      </Grid>

      {/* QUICK ACTIONS */}
      <Box mt={4}>
        <Typography variant="h6" className={classes.sectionTitle}>
          Quick Actions
        </Typography>
        <Grid container spacing={2} className={classes.quickActionsGrid}>
          <Grid item xs={12} sm={4}>
            <Button component={Link} to="/admin/products/add" variant="contained" className={classes.buttonPrimary} startIcon={<AddIcon />}>
              Add New Product
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button component={Link} to="/admin/orders" variant="outlined" className={classes.buttonSecondary}>
              View All Orders
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" className={classes.downloadButton} startIcon={isDownloading ? <CircularProgress size={20} color="inherit" /> : <GetAppIcon />} onClick={handleDownloadReport} disabled={isDownloading}>
              {isDownloading ? "Generating..." : "Download Report"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdminDashboardPage;
