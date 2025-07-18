// src/main-component/SignUpPage/index.js

import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core"; // FIX: Double dash (--) yahan se hata diya gaya hai
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";

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
    maxWidth: "700px",
    minWidth: "350px",
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
  formControl: {
    marginTop: theme.spacing(1),
    "& .MuiFormLabel-root": {
      color: colors.textMuted,
      fontWeight: "bold",
    },
    "& .MuiRadio-root": {
      color: colors.textMuted,
    },
    "& .Mui-checked": {
      color: `${colors.primary} !important`,
    },
  },
}));

// --- Component ---
const SignUpPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isRegisterSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "user",
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isRegisterSuccess) {
      toast.success(
        message || "Registration successful! Please verify your OTP."
      );
      navigate("/verify-otp", { state: { email: value.email } });
    }
    return () => {
      if (isRegisterSuccess || isError) {
        dispatch(reset());
      }
    };
  }, [isError, isRegisterSuccess, message, navigate, dispatch, value.email]);

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (value.password !== value.confirm_password) {
      toast.error("Passwords do not match!");
      return;
    }
    if (value.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!value.name || !value.email || !value.password) {
      toast.error("Please fill all required fields.");
      return;
    }
    const userData = {
      name: value.name.trim(),
      email: value.email.trim(),
      password: value.password,
      role: value.role,
    };
    dispatch(register(userData));
  };

  return (
    <div className={classes.pageWrapper}>
      <Card className={classes.formCard}>
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            Create Account
          </Typography>
          <Typography className={classes.subtitle}>
            Get started with a free account
          </Typography>
          <form onSubmit={submitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Full Name" name="name" value={value.name} variant="outlined" onChange={changeHandler} className={classes.inputField} required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="E-mail" name="email" type="email" value={value.email} variant="outlined" onChange={changeHandler} className={classes.inputField} required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Password" name="password" type="password" value={value.password} variant="outlined" onChange={changeHandler} className={classes.inputField} required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Confirm Password" name="confirm_password" type="password" value={value.confirm_password} variant="outlined" onChange={changeHandler} className={classes.inputField} required />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Register as</FormLabel>
                  <RadioGroup row aria-label="role" name="role" value={value.role} onChange={changeHandler}>
                    <FormControlLabel value="user" control={<Radio />} label="User" />
                    <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth className={classes.submitButton} type="submit" disabled={isLoading}>{isLoading ? "Registering..." : "Sign Up"}</Button>
              </Grid>
            </Grid>
          </form>
          <Typography className={classes.noteHelp}>Already have an account? <Link to="/login">Return to Sign In</Link></Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
