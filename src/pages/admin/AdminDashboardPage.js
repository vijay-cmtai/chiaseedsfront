// src/pages/admin/AdminDashboardPage.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAdminDashboardStats,
  getSalesOverview,
  getRecentAdminOrders,
} from "../../features/admin/adminSlice";

// --- UI ke saare imports waise hi rahenge ---
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
} from "@material-ui/core"; // <--- THIS LINE IS NOW CORRECTED
import { Link } from "react-router-dom";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import AddIcon from "@material-ui/icons/Add";
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

// --- Color theme aur styles waise hi rahenge ---
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
  welcomeHeader: {
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(4),
  },
  statCard: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3),
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
    height: "100%",
  },
  iconContainer: {
    padding: theme.spacing(2),
    borderRadius: "50%",
    marginRight: theme.spacing(3),
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: { fontWeight: "bold", color: colors.textDark, lineHeight: 1.2 },
  statLabel: { color: colors.textMuted, fontSize: "0.9rem" },
  bottomCard: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    backgroundColor: colors.cardBg,
  },
  chartContainer: { height: "350px" },
  sectionTitle: {
    fontWeight: 600,
    color: colors.textDark,
    marginBottom: theme.spacing(2),
  },
  quickActionsContainer: { marginTop: theme.spacing(4) },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "8px",
    "&:hover": { backgroundColor: colors.primaryHover },
  },
  buttonSecondary: {
    color: colors.primary,
    borderColor: colors.primary,
    fontWeight: "bold",
    borderRadius: "8px",
  },
  statusChip: { fontWeight: "bold", fontSize: "0.75rem", color: "#fff" },
}));

const AdminDashboardPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Use a default value to avoid destructuring undefined
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
      value: stats.newOrders || "0",
      icon: <ShoppingCartIcon />,
      color: colors.statTeal,
    },
    {
      label: "Active Users",
      value: stats.activeUsers || "0",
      icon: <PeopleIcon />,
      color: colors.statAmber,
    },
  ];

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

  if (status === "failed" && !stats.totalSales) {
    return (
      <Box p={4}>
        <Typography color="error">Error: {message}</Typography>
        <Typography>
          Could not load dashboard data. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h4" className={classes.welcomeHeader}>
        Welcome back, Admin!
      </Typography>

      <Grid container spacing={3}>
        {statsDataForUI.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.label}>
            <Card className={classes.statCard}>
              <Box
                className={classes.iconContainer}
                style={{ backgroundColor: stat.color }}
              >
                {stat.icon}
              </Box>
              <Box>
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

      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Card className={classes.bottomCard}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Monthly Sales Overview
            </Typography>
            <div className={classes.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesDataForUI.length > 0 ? salesDataForUI : []}
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
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
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card className={classes.bottomCard}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Recent Orders
            </Typography>
            <List>
              {(recentOrdersForUI.length > 0 ? recentOrdersForUI : []).map(
                (order) => (
                  <ListItem key={order.id} divider>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: colors.primary }}>
                        {order.user.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={order.user}
                      secondary={`Amount - ${order.amount}`}
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
        <Grid container spacing={2}>
          <Grid item>
            <Button
              component={Link}
              to="/admin/products/add"
              variant="contained"
              className={classes.buttonPrimary}
              startIcon={<AddIcon />}
            >
              Add New Product
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="/admin/orders"
              variant="outlined"
              className={classes.buttonSecondary}
            >
              View All Orders
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdminDashboardPage;
