import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, reset } from "../../features/auth/authSlice";

// --- Theme Colors and Styles Definition ---
const colors = {
  primary: "#878fba",
  primaryHover: "#6c749d",
  textDark: "#3d2b56",
  textMuted: "#6c749d",
  gradientStart: "#fde7c9",
  gradientEnd: "#e0c3fc",
  cardBg: "rgba(255, 255, 255, 0.9)",
  borderColor: "rgba(61, 43, 86, 0.2)",
};

const useStyles = makeStyles((theme) => ({
  pageWrapper: {
    background: `linear-gradient(to right, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4, 2),
  },
  formCard: {
    width: "50%",
    maxWidth: "500px",
    minWidth: "320px",
    padding: theme.spacing(3),
    borderRadius: "16px",
    backgroundColor: colors.cardBg,
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    textAlign: "center",
    color: colors.textMuted,
    marginBottom: theme.spacing(4),
  },
  inputField: {
    "& label.Mui-focused": { color: colors.primary },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: colors.borderColor },
      "&:hover fieldset": { borderColor: colors.primary },
      "&.Mui-focused fieldset": { borderColor: colors.primary },
    },
  },
  submitButton: {
    backgroundColor: colors.primary,
    color: "#ffffff",
    fontWeight: "bold",
    borderRadius: "8px", // Fixed typo from borderpink
    padding: theme.spacing(1.5, 0),
    marginTop: theme.spacing(2),
    "&:hover": { backgroundColor: colors.primaryHover },
  },
  noteHelp: {
    textAlign: "center",
    marginTop: theme.spacing(3),
    fontSize: "14px",
    color: colors.textMuted,
    "& a": {
      color: colors.primary,
      fontWeight: "bold",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
}));

const OtpVerificationPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isFirstVerification = useRef(true); // Track first-time verification

  const { isLoading, isError, isOtpVerifySuccess, message } = useSelector(
    (state) => state.auth
  );

  const email = location.state?.email;
  const [otp, setOtp] = useState("");

  // Handle missing email
  useEffect(() => {
    if (!email) {
      toast.error("No email found. Please register first.");
      navigate("/register");
    }
  }, [email, navigate]);

  // Handle OTP verification status
  useEffect(() => {
    if (isError && message) {
      toast.error(message);
      dispatch(reset());
    }

    if (isOtpVerifySuccess) {
      if (isFirstVerification.current) {
        toast.success("OTP verified");
        isFirstVerification.current = false; // Prevent repeated notifications
      }
      navigate("/login"); // Redirect to login page (or change to /dashboard if needed)
      dispatch(reset());
    }
  }, [isError, isOtpVerifySuccess, message, navigate, dispatch]);

  const submitForm = (e) => {
    e.preventDefault();

    // Validation
    if (!otp || otp.trim() === "") {
      toast.error("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    // Dispatch OTP verification
    const otpData = {
      email: email,
      otp: otp.trim(),
    };

    console.log("Submitting OTP data:", otpData); // Debug log
    dispatch(verifyOtp(otpData));
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow numeric input and limit to 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  if (!email) {
    return (
      <div className={classes.pageWrapper}>
        <Card className={classes.formCard}>
          <CardContent>
            <Typography variant="h4" className={classes.title}>
              Error
            </Typography>
            <Typography className={classes.subtitle}>
              No email found. Please register first.
            </Typography>
            <Link to="/register">
              <Button fullWidth className={classes.submitButton}>
                Go to Register
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={classes.pageWrapper}>
      <Card className={classes.formCard}>
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            Verify Account
          </Typography>
          <Typography className={classes.subtitle}>
            An OTP has been sent to <strong>{email}</strong>. Please enter it
            below.
          </Typography>
          <form onSubmit={submitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="6-Digit OTP"
                  name="otp"
                  value={otp}
                  variant="outlined"
                  onChange={handleOtpChange}
                  className={classes.inputField}
                  inputProps={{
                    maxLength: 6,
                    style: {
                      textAlign: "center",
                      fontSize: "1.2rem",
                      letterSpacing: "0.5rem",
                    },
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify Account"}
                </Button>
              </Grid>
            </Grid>
          </form>
          <Typography className={classes.noteHelp}>
            Didn't receive an OTP? <Link to="/register">Register again</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default OtpVerificationPage;
