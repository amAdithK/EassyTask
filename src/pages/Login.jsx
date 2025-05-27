import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  CssBaseline,
  Grid,
  FormControlLabel,
  Checkbox,
  Link,
  Button,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../services/login";
import { useAppStore } from "../store/AppStore";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../constants/messages";
import logo from "../images/logo-c.png";
import "./Login.css";
import { updateFcmToken } from "../services/fcmTokenService";

const Login = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [, dispatch] = useAppStore();

  useEffect(() => {
    const updateTokenAndNavigate = async () => {
      if (submitted) {
        const fcmToken = localStorage.getItem("FCMTokenKey");
        if (fcmToken) {
          await updateFcmToken(fcmToken);
        }
        navigate("/tasklist", { replace: true });
      }
    };

    updateTokenAndNavigate();
  }, [submitted, navigate]);

  const validationSchema = Yup.object({
    username: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleFormSubmit = async (values, { setErrors, setSubmitting }) => {
    const responseData = await login(values.username, values.password);

    if (responseData.error) {
      setErrors(responseData.data.errors);
      toast.error(ERROR_MESSAGES.LOGIN_FAILED || "Login failed.");
    } else {
      toast.success(SUCCESS_MESSAGES.LOGIN_SUCCESS || "Login successful.");
      localStorage.setItem("access_token", responseData.data.token);

      dispatch({
        type: "LOG_IN",
        payload: {
          userDetail: responseData.data.userDetail,
        },
      });

      setSubmitted(true);
    }

    setSubmitting(false);
  };

  return (
    <Box className="loginBg">
      <div className="loginOverlay"></div>
      <Box className="loginContainer">
        <div className="loginLogo">
          <img src={logo} alt="P. N. Pai & Co." title="P. N. Pai & Co." />
        </div>
        <h1>Sign In</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
              >
                {/* <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      sx={{
                        color: 'white',
                        '&.Mui-checked': {
                          color: 'white',
                        },
                        '& .MuiSvgIcon-root': {
                          borderRadius: '4px',
                        },
                      }}
                    />
                  }
                  label="Remember me"
                  sx={{ color: 'white' }}
                /> */}

                <Link
                  variant="body2"
                  sx={{ color: "white", cursor: "pointer" }}
                  onClick={() => toast.error("Try In WebPage")}
                >
                  Forgot password?
                </Link>
              </Box>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                color="primary"
                disabled={isSubmitting}
                fullWidth
                sx={{
                  borderRadius: "30px",
                  py: 1.5,
                }}
              >
                Sign In
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
