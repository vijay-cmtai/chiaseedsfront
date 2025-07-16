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

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    padding: theme.spacing(3),
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
      backgroundColor: "#fff",
    },
  },
  welcomeHeader: {
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      marginBottom: theme.spacing(3),
      textAlign: "center",
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
      borderRadius: "10px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1.5),
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.5),
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
      marginRight: 0,
      marginBottom: theme.spacing(1),
      fontSize: "1.2rem",
    },
  },
  statContent: {
    display: "flex",
    flexDirection: "column",
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
    backgroundColor: colors.cardBg,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1.5),
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    },
  },
  chartContainer: {
    height: "350px",
    [theme.breakpoints.down("sm")]: {
      height: "300px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "250px",
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
      marginBottom: theme.spacing(1),
      textAlign: "center",
    },
  },
  quickActionsContainer: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
    },
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: theme.spacing(1.5, 3),
    "&:hover": { backgroundColor: colors.primaryHover },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.2, 2.5),
      fontSize: "0.9rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.85rem",
      padding: theme.spacing(1, 2),
      width: "100%",
      marginBottom: theme.spacing(1),
    },
  },
  buttonSecondary: {
    color: colors.primary,
    borderColor: colors.primary,
    fontWeight: "bold",
    borderRadius: "8px",
    padding: theme.spacing(1.5, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.2, 2.5),
      fontSize: "0.9rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.85rem",
      padding: theme.spacing(1, 2),
      width: "100%",
      marginBottom: theme.spacing(1),
    },
  },
  downloadButton: {
    backgroundColor: colors.statTeal,
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: theme.spacing(1.5, 3),
    "&:hover": { backgroundColor: "#0da89f" },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.2, 2.5),
      fontSize: "0.9rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.85rem",
      padding: theme.spacing(1, 2),
      width: "100%",
    },
  },
  statusChip: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "#fff",
    borderRadius: "16px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7rem",
      padding: theme.spacing(0.5, 1),
    },
  },
  ordersList: {
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  orderItem: {
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1, 0),
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
  orderAvatar: {
    backgroundColor: colors.primary,
    [theme.breakpoints.down("xs")]: {
      width: "32px",
      height: "32px",
      fontSize: "0.9rem",
    },
  },
  orderText: {
    [theme.breakpoints.down("xs")]: {
      "& .MuiListItemText-primary": {
        fontSize: "0.9rem",
      },
      "& .MuiListItemText-secondary": {
        fontSize: "0.8rem",
      },
    },
  },
  quickActionsGrid: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      "& .MuiGrid-item": {
        width: "100%",
        paddingLeft: 0,
        paddingTop: theme.spacing(1),
      },
    },
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    [theme.breakpoints.down("xs")]: {
      height: "60vh",
    },
  },
  errorContainer: {
    padding: theme.spacing(4),
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
  },
  chartCard: {
    [theme.breakpoints.down("xs")]: {
      order: 2,
    },
  },
  ordersCard: {
    [theme.breakpoints.down("xs")]: {
      order: 1,
    },
  },
}));

const AdminDashboardPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
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
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
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
    doc.setTextColor(colors.textDark);
    doc.text("Admin Dashboard Report", 60, 22);
    doc.setFontSize(10);
    doc.setTextColor(colors.textMuted);
    doc.text(`Report Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    let yPos = 45;

    doc.setFontSize(14);
    doc.setTextColor(colors.textDark);
    doc.text("Summary", 14, yPos);
    yPos += 8;

    statsDataForUI.forEach((stat) => {
      doc.setFontSize(12);
      doc.setTextColor(colors.textDark);
      doc.text(`${stat.label}:`, 16, yPos);
      doc.setFontSize(12);
      doc.setTextColor(colors.textMuted);
      doc.text(String(stat.value), 55, yPos);
      yPos += 8;
    });

    if (chartElement) {
      yPos += 5;
      doc.setFontSize(14);
      doc.setTextColor(colors.textDark);
      doc.text("Monthly Sales Overview", 14, yPos);
      yPos += 5;

      const canvas = await html2canvas(chartElement, { backgroundColor: null });
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 14, yPos, 180, 90);
      yPos += 100;
    }

    const recentOrdersForTable = recentOrders.map((order) => ({
      user: order.user?.name || "Unknown User",
      amount: (order.totalPrice || 0).toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      }),
      status: order.orderStatus,
    }));

    if (recentOrdersForTable.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(colors.textDark);
      doc.text("Recent Orders", 14, yPos);

      autoTable(doc, {
        startY: yPos + 5,
        head: [["User", "Amount", "Status"]],
        body: recentOrdersForTable.map((order) => [
          order.user,
          order.amount,
          order.status,
        ]),
        theme: "grid",
        headStyles: { fillColor: colors.primary },
      });
    }

    doc.save(`Admin-Report-${new Date().toISOString().slice(0, 10)}.pdf`);
    setIsDownloading(false);
  };

  const salesDataForUI = salesOverview.map((item) => ({
    name: item.name,
    Sales: item.sales,
  }));

  const recentOrdersForUI = recentOrders.map((order) => ({
    id: order._id,
    user: order.user?.name || "Unknown User",
    amount: (order.totalPrice || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    }),
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
        <Typography color="error" variant="h6">
          Error: {message}
        </Typography>
        <Typography>
          Could not load dashboard data. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <div className={classes.dashboardContainer}>
      <Typography variant="h4" className={classes.welcomeHeader}>
        Welcome back, Admin!
      </Typography>

      <Grid container spacing={isMobile ? 2 : 3}>
        {statsDataForUI.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.label}>
            <Card className={classes.statCard}>
              <Box
                className={classes.iconContainer}
                style={{ backgroundColor: stat.color }}
              >
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

      <Grid container spacing={isMobile ? 2 : 4}>
        <Grid item xs={12} lg={8} className={classes.chartCard}>
          <Card className={classes.bottomCard} id="salesChartContainer">
            <Typography variant="h6" className={classes.sectionTitle}>
              Monthly Sales Overview
            </Typography>
            <div className={classes.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesDataForUI.length > 0 ? salesDataForUI : []}
                  margin={{
                    top: 5,
                    right: isMobile ? 10 : 20,
                    left: isMobile ? -20 : -10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    fontSize={isMobile ? 10 : 12}
                    interval={isMobile ? 1 : 0}
                  />
                  <YAxis fontSize={isMobile ? 10 : 12} />
                  <Tooltip
                    formatter={(value) =>
                      value.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      })
                    }
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Sales"
                    stroke={colors.primary}
                    strokeWidth={isMobile ? 2 : 3}
                  />
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
            <List className={classes.ordersList}>
              {(recentOrdersForUI.length > 0 ? recentOrdersForUI : []).map(
                (order) => (
                  <ListItem
                    key={order.id}
                    divider
                    className={classes.orderItem}
                  >
                    <ListItemAvatar>
                      <Avatar className={classes.orderAvatar}>
                        {order.user.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
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
                          backgroundColor:
                            order.status === "Completed"
                              ? colors.statusCompleted
                              : colors.statusPending,
                        }}
                      />
                    </Box>
                  </ListItem>
                )
              )}
            </List>
          </Card>
        </Grid>
      </Grid>

      <Box className={classes.quickActionsContainer}>
        <Typography variant="h6" className={classes.sectionTitle}>
          Quick Actions
        </Typography>
        <Grid container spacing={2} className={classes.quickActionsGrid}>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              component={Link}
              to="/admin/products/add"
              variant="contained"
              className={classes.buttonPrimary}
              startIcon={<AddIcon />}
              fullWidth={isMobile}
            >
              Add New Product
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              component={Link}
              to="/admin/orders"
              variant="outlined"
              className={classes.buttonSecondary}
              fullWidth={isMobile}
            >
              View All Orders
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              className={classes.downloadButton}
              startIcon={
                isDownloading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <GetAppIcon />
                )
              }
              onClick={handleDownloadReport}
              disabled={isDownloading}
              fullWidth={isMobile}
            >
              {isDownloading ? "Generating..." : "Download Report"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdminDashboardPage;
