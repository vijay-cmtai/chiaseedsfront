// src/pages/LoginPage.js

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
import { login, reset } from "../../features/auth/authSlice";

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
}));

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isLoginSuccess, isAuthenticated, message } = useSelector(
    (state) => state.auth
  );

  const [value, setValue] = useState({ email: "", password: "" });
  const hasNavigated = useRef(false); // To avoid redirect loop

  // Handle errors
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
  }, [isError, message, dispatch]);

  // Redirect after login
  useEffect(() => {
    if ((isLoginSuccess || isAuthenticated) && !hasNavigated.current) {
      hasNavigated.current = true;

      toast.success("Logged in successfully!");

      const loggedInUser = user?.user || user; // handle different structures

      if (loggedInUser?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }

      dispatch(reset());
    }
  }, [user, isLoginSuccess, isAuthenticated, navigate, dispatch]);

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!value.email || !value.password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    console.log("Logging in with:", value); // Debug
    dispatch(login(value));
  };

  return (
    <div className={classes.pageWrapper}>
      <Card className={classes.formCard}>
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            Sign In
          </Typography>
          <Typography className={classes.subtitle}>
            Sign in to your account
          </Typography>

          <form onSubmit={submitForm}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  value={value.email}
                  variant="outlined"
                  onChange={changeHandler}
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
                  value={value.password}
                  variant="outlined"
                  onChange={changeHandler}
                  className={classes.inputField}
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
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </Grid>
            </Grid>
          </form>

          <Typography className={classes.noteHelp}>
            Don't have an account? <Link to="/register">Create an account</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
