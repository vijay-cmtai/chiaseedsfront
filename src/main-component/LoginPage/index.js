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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// FIX: Path corrected from ../ to ../../
import { login, reset, forgotPassword } from "../../features/auth/authSlice";

// --- Styles ---
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
    background: `linear-gradient(to right, ${colors.gradientStart}, ${colors.gradientEnd})`,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
  },
  formCard: {
    width: "50%",
    maxWidth: "600px",
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
    borderRadius: "8px",
    padding: theme.spacing(1.5, 0),
    marginTop: theme.spacing(1),
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
    },
  },
  linkText: {
    color: colors.primary,
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
  },
}));

// --- Main Component ---
const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mode, setMode] = useState("login"); // 'login' or 'forgotPassword'

  const {
    user,
    isLoading,
    isError,
    isLoginSuccess,
    isAuthenticated,
    message,
    isForgotPasswordLoading,
    isForgotPasswordSuccess,
  } = useSelector((state) => state.auth);

  const [loginValue, setLoginValue] = useState({ email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if ((isLoginSuccess || isAuthenticated) && user && !hasNavigated.current) {
      hasNavigated.current = true;
      toast.success("Login Successful!");
      const loggedInUser = user?.user || user;
      if (loggedInUser?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }

    if (isForgotPasswordSuccess) {
      toast.success(message);
      setMode("login");
      dispatch(reset());
    }

    return () => {
      if (isLoginSuccess || isError || isForgotPasswordSuccess) {
        dispatch(reset());
      }
    };
  }, [
    isError,
    isLoginSuccess,
    isAuthenticated,
    isForgotPasswordSuccess,
    message,
    dispatch,
    navigate,
    user,
  ]);

  const handleLoginChange = (e) => {
    setLoginValue({ ...loginValue, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginValue.email || !loginValue.password) {
      toast.error("Please fill in both email and password.");
      return;
    }
    hasNavigated.current = false;
    dispatch(login(loginValue));
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error("Please enter your email address.");
      return;
    }
    dispatch(forgotPassword({ email: forgotEmail }));
  };

  const renderLoginForm = () => (
    <>
      <Typography variant="h4" className={classes.title}>
        Sign In
      </Typography>
      <Typography className={classes.subtitle}>
        Sign in to your account
      </Typography>
      <form onSubmit={handleLoginSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              value={loginValue.email}
              variant="outlined"
              onChange={handleLoginChange}
              className={classes.inputField}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={loginValue.password}
              variant="outlined"
              onChange={handleLoginChange}
              className={classes.inputField}
              required
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              textAlign: "right",
              marginTop: "-16px",
              marginBottom: "8px",
            }}
          >
            <Typography
              variant="body2"
              className={classes.linkText}
              onClick={() => setMode("forgotPassword")}
            >
              Forgot Password?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              className={classes.submitButton}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography className={classes.noteHelp}>
        Don't have an account? <Link to="/register">Create an account</Link>
      </Typography>
    </>
  );

  const renderForgotPasswordForm = () => (
    <>
      <Typography variant="h4" className={classes.title}>
        Reset Password
      </Typography>
      <Typography className={classes.subtitle}>
        Enter your email to receive a reset link
      </Typography>
      <form onSubmit={handleForgotSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              value={forgotEmail}
              variant="outlined"
              onChange={(e) => setForgotEmail(e.target.value)}
              className={classes.inputField}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              className={classes.submitButton}
              type="submit"
              disabled={isForgotPasswordLoading}
            >
              {isForgotPasswordLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography className={classes.noteHelp}>
        <span className={classes.linkText} onClick={() => setMode("login")}>
          Back to Login
        </span>
      </Typography>
    </>
  );

  return (
    <div className={classes.pageWrapper}>
      <Card className={classes.formCard}>
        <CardContent>
          {mode === "login" ? renderLoginForm() : renderForgotPasswordForm()}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
