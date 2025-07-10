// src/pages/user/AddressPage.js (FINAL REDESIGNED CODE)

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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

// --- PROFESSIONAL COLOR THEME (from your layout) ---
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
    padding: theme.spacing(4),
    backgroundColor: colors.background,
    minHeight: "100vh",
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
  },
  defaultChip: {
    backgroundColor: colors.primary,
    color: "white",
    fontWeight: "bold",
    height: "24px",
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0.5, 1),
  },
  addAddressCard: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    cursor: "pointer",
    border: `2px dashed ${colors.secondaryText}`,
    backgroundColor: "transparent",
    boxShadow: "none",
    transition: "background-color 0.3s, border-color 0.3s",
    minHeight: "200px",
    "&:hover": {
      backgroundColor: theme.palette.grey[50],
      borderColor: colors.primary,
      color: colors.primary,
    },
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

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  const handleOpenModal = (address = null) => {
    setCurrentAddress(
      address || {
        name: "",
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
    if (currentAddress._id) {
      await dispatch(updateAddress(currentAddress));
    } else {
      await dispatch(addAddress(currentAddress));
    }
    handleCloseModal();
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
      <Grid container spacing={3}>
        {addresses.map((addr) => (
          <Grid item xs={12} sm={6} md={4} key={addr._id}>
            <Card
              className={`${classes.addressCard} ${addr.isDefault ? classes.defaultCard : ""}`}
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
                    {addr.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ marginTop: "4px" }}
                  >
                    Phone: {addr.phone}
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
        {/* "Add New" button card ko hata diya gaya hai, upar ek dedicated button hai */}
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
                  name="name"
                  fullWidth
                  label="Full Name"
                  value={currentAddress?.name || ""}
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
        </div>
      </Modal>
    </div>
  );
};

export default AddressPage;
