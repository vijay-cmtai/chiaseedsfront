import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../../features/user/userSlice";

// --- Material-UI Imports ---
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  IconButton,
  Chip,
  Divider,
  Modal,
  TextField,
  Button,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

// --- PROFESSIONAL COLOR THEME ---
const colors = {
  background: "#fdfaf6",
  paper: "#ffffff",
  primary: "#878fba",
  primaryText: "#3d2b56",
  secondaryText: "#6c749d",
  error: "#dc3545",
  defaultBorder: "#878fba",
  borderColor: "#e0e0e0",
};

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: theme.spacing(2),
    backgroundColor: colors.background,
    minHeight: "100vh",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4),
    },
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  pageTitle: {
    fontWeight: "bold",
    color: colors.primaryText,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  addressCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    border: `1px solid ${colors.borderColor}`,
    borderRadius: "12px",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme.shadows[4],
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "200px",
    },
  },
  defaultCard: {
    border: `2px solid ${colors.defaultBorder}`,
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1.5),
  },
  addressType: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    fontWeight: 600,
    color: colors.primaryText,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
  defaultChip: {
    backgroundColor: colors.primary,
    color: "white",
    fontWeight: "bold",
    height: "24px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.7rem",
    },
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0.5, 1),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    backgroundColor: colors.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "12px",
    outline: "none",
    width: "100%",
    maxWidth: "500px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "90%",
      padding: theme.spacing(1, 2, 2),
    },
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: "white",
    "&:hover": {
      backgroundColor: colors.primaryText,
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 2),
      fontSize: "0.875rem",
    },
  },
  notification: {
    position: "fixed",
    bottom: theme.spacing(2),
    left: "50%",
    transform: "translateX(-50%)",
    padding: theme.spacing(1.5, 3),
    backgroundColor: (props) =>
      props.severity === "error" ? colors.error : colors.primary,
    color: "white",
    borderRadius: theme.shape.borderRadius,
    fontWeight: 500,
    zIndex: 1000,
    display: (props) => (props.open ? "block" : "none"),
  },
}));

const AddressPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    addresses = [],
    status = "idle",
    message = "",
  } = useSelector((state) => state.user || {});

  const [openModal, setOpenModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (message && (status === "failed" || status === "succeeded")) {
      setNotification({
        open: true,
        message: message,
        severity: status === "failed" ? "error" : "success",
      });
      const timer = setTimeout(() => {
        setNotification({ ...notification, open: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, status]);

  const handleOpenModal = (address = null) => {
    setCurrentAddress(
      address || {
        fullName: "",
        phone: "",
        type: "Home",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
      }
    );
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentAddress(null);
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      dispatch(deleteAddress(addressId));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress({ ...currentAddress, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !currentAddress.fullName ||
      !currentAddress.phone ||
      !currentAddress.street ||
      !currentAddress.city ||
      !currentAddress.state ||
      !currentAddress.postalCode
    ) {
      setNotification({
        open: true,
        message: "Please fill all required fields.",
        severity: "error",
      });
      return;
    }

    let action;
    if (currentAddress._id) {
      action = updateAddress({
        addressId: currentAddress._id,
        addressData: currentAddress,
      });
    } else {
      action = addAddress(currentAddress);
    }

    const result = await dispatch(action);

    if (result.type.endsWith("/fulfilled")) {
      handleCloseModal();
    }
  };

  if (status === "loading" && addresses.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={classes.pageContainer}>
      <Box className={classes.headerContainer}>
        <Typography variant="h4" className={classes.pageTitle}>
          My Addresses
        </Typography>
        <Button
          variant="contained"
          className={classes.buttonPrimary}
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
        >
          Add New Address
        </Button>
      </Box>
      <Grid container spacing={2}>
        {addresses.map((addr) => (
          <Grid item xs={12} sm={6} md={4} key={addr._id}>
            <Card
              className={`${classes.addressCard} ${
                addr.isDefault ? classes.defaultCard : ""
              }`}
            >
              <CardContent className={classes.cardContent}>
                <Box className={classes.cardHeader}>
                  <Typography variant="h6" className={classes.addressType}>
                    {addr.type === "Home" ? <HomeIcon /> : <WorkIcon />}
                    {addr.type}
                  </Typography>
                  {addr.isDefault && (
                    <Chip
                      label="Default"
                      size="small"
                      className={classes.defaultChip}
                    />
                  )}
                </Box>
                <Divider style={{ marginBottom: "12px" }} />
                <Box>
                  <Typography variant="body1" style={{ fontWeight: 500 }}>
                    {addr.fullName || "No Name"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ marginTop: "4px" }}
                  >
                    Phone: {addr.phone || "N/A"}
                  </Typography>
                </Box>
              </CardContent>
              <Box className={classes.cardActions}>
                <IconButton size="small" onClick={() => handleOpenModal(addr)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  style={{ color: colors.error }}
                  onClick={() => handleDeleteAddress(addr._id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className={classes.modal}
      >
        <div className={classes.modalPaper}>
          <Box className={classes.modalHeader}>
            <Typography
              variant="h6"
              style={{ color: colors.primaryText, fontWeight: "bold" }}
            >
              {currentAddress?._id ? "Edit Address" : "Add New Address"}
            </Typography>
            <IconButton onClick={handleCloseModal} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2} style={{ marginTop: "8px" }}>
              <Grid item xs={12}>
                <TextField
                  name="fullName"
                  fullWidth
                  label="Full Name"
                  value={currentAddress?.fullName || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  fullWidth
                  label="Phone Number"
                  value={currentAddress?.phone || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="street"
                  fullWidth
                  label="Street Address"
                  value={currentAddress?.street || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="city"
                  fullWidth
                  label="City"
                  value={currentAddress?.city || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="state"
                  fullWidth
                  label="State"
                  value={currentAddress?.state || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="postalCode"
                  fullWidth
                  label="Postal Code"
                  value={currentAddress?.postalCode || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RadioGroup
                  row
                  name="type"
                  value={currentAddress?.type || "Home"}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="Home"
                    control={<Radio color="primary" />}
                    label="Home"
                  />
                  <FormControlLabel
                    value="Work"
                    control={<Radio color="primary" />}
                    label="Work"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.buttonPrimary}
                  disabled={status === "loading"}
                  style={{ padding: "12px 0" }}
                >
                  {status === "loading" ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : currentAddress?._id ? (
                    "Save Changes"
                  ) : (
                    "Add Address"
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
          <Paper
            className={classes.notification}
            elevation={6}
            severity={notification.severity}
            open={notification.open}
          >
            <Typography variant="body2">{notification.message}</Typography>
          </Paper>
        </div>
      </Modal>
    </div>
  );
};

export default AddressPage;
