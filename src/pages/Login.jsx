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
import { sessionStorageSet } from "../utilities/sessionStorage";
import { useAppStore } from "../store/AppStore";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../constants/messages";

const Login = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [, dispatch] = useAppStore();

  useEffect(() => {
    if (submitted) {
      navigate("/tasklist", { replace: true });
    }
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
      sessionStorageSet("access_token", responseData.data.token);

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
    <Box
      sx={{
        display: "flex",
        height: "99vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6d7fba",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Grid container>
          <CssBaseline />
          <Grid
            component={Paper}
            elevation={6}
            square
            sx={{
              width: "100%",
              mx: "auto",
              padding: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  width: "100%",
                  padding: "5px",
                }}
              >
                <Box sx={{ textAlign: "left", maxWidth: "50%" }}>
                  <img
                    src="/images/logo-c.png"
                    alt="P. N. Pai & Co."
                    title="P. N. Pai & Co."
                    style={{ borderRadius: "5px", maxWidth: "100%" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    textAlign: "right",
                    paddingRight: "5px",
                  }}
                >
                  <Typography sx={{ fontSize: "1.2rem" }}>Sign In</Typography>
                </Box>
              </Box>

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
                        alignItems: "flex-end",
                        width: "100%",
                        mt: 2,
                      }}
                    >
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                      >
                        Sign In
                      </Button>
                    </Box>

                    <Grid container sx={{ mt: 1 }}>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
