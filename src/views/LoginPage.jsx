import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  InputAdornment,
  Divider,
  Typography,
} from "@mui/material";
import { get, getAxios, postJsonData } from "../networks/ApiController";
import { apiErrorToast, okErrorToast } from "../utils/ToastUtil";
import ApiEndpoints from "../networks/ApiEndpoints";
import ForgotPass from "../modals/ForgotPass";
import { getGeoLocation } from "../utils/GeoLocationUtil";
import { useEffect } from "react";
import { PATTERNS } from "../utils/ValidationUtil";
import Spinner from "../components/Spinner";
import AuthContext from "../store/auth-context";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { expirationTime } from "../utils/Constants";
import LogoComponent from "../components/LogoComponent";
import { getSecondaryColor } from "../theme/setThemeColor";

const LoginPage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginRequest, setLoginRequest] = useState(false);
  const [showPass, setShowPass] = useState(0);
  const [userRequest, setUserRequest] = useState(false);
  const [isMobv, setIsMobv] = useState(true);

  const locationVal = getGeoLocation(
    (lat, long) => {
      authCtx.setLocation(lat, long);
      return [lat, long];
    },
    (err) => {
      okErrorToast("Location", err);
    }
  );
  const handleClick = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      username: form.username.value,
      password: form.password.value,
    };
    // if (authCtx.location && authCtx.location) {
    //   apiErrorToast("User Denied Geolocation");
    // } else {
    postJsonData(
      ApiEndpoints.SIGN_IN,
      data,
      setLoginRequest,
      (res) => {
        if (
          res &&
          res.data &&
          res.data.message &&
          res.data.message.toLowerCase() === "ask for mpin"
        ) {
        }
        if (
          res &&
          res.data &&
          res.data.message &&
          res.data.message.toLowerCase() === "ask for otp"
        ) {
        } else if (res && res.data && res.data.access_token) {
          const access = res?.data?.access_token;
          authCtx.login(access, expirationTime);
          get(
            ApiEndpoints.GET_ME_USER,
            "",
            setUserRequest,
            (res) => {
              getAxios(access);
              const user = res.data.data;
              authCtx.saveUser(user);
              navigate("/admin/dashboard");
            },
            (error) => {
              apiErrorToast(error);
              authCtx.logout();
            }
          );
        }
      },
      (error) => {
        apiErrorToast(error);
      }
    );
    // }
  };

  useEffect(() => {
    locationVal();
    return () => {};
  }, []);

  return (
    <Grid container className="login-page position-relative" sx={{ p: 2 }}>
      <Spinner loading={loginRequest || userRequest} circleBlue />
      <Grid
        className="glass-card"
        sx={{ background: "#fff", p: 6, width: { lg: "45%", xs: "100%" } }}
      >
        <Grid
          component="form"
          id="loginForm"
          onSubmit={handleClick}
          container
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid item md={12} xs={12}>
            <Box
              sx={{
                ml: { lg: 1, md: 1, sm: 1, xs: 0 },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LogoComponent width="250rem" />
            </Box>
            <Box>
              <Typography
                variant="h4"
                component="h4"
                sx={{
                  color: getSecondaryColor(),
                  fontWeight: "bold",
                  fontSize: "2.5rem",
                  mb: 2,
                  mt: 2,
                }}
              >
                Login
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  color: getSecondaryColor(),
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  mb: 2,
                }}
              >
                Sign in to your account
              </Typography>
            </Box>
          </Grid>
          <Grid item md={12} xs={12} sx={{ mt: 4 }}>
            <FormControl
              md={12}
              sx={{ width: "100%", background: "white", color: "#1692ff" }}
            >
              <TextField
                label="Phone Number"
                id="username"
                size="small"
                type="number"
                required
                error={!isMobv}
                helperText={!isMobv ? "Enter valid Mobile" : ""}
                onChange={(e) => {
                  setIsMobv(PATTERNS.MOBILE.test(e.target.value));
                  if (e.target.value === "") setIsMobv(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "+" || e.key === "-") e.preventDefault();
                  if (
                    e.target.value.length === 10 &&
                    e.key.toLowerCase() !== "tab"
                  ) {
                    if (e.key.toLowerCase() !== "backspace") e.preventDefault();
                    if (e.key.toLowerCase() === "backspace") {
                    }
                  }
                }}
                onFocus={(e) =>
                  e.target.addEventListener(
                    "wheel",
                    function (e) {
                      e.preventDefault();
                    },
                    { passive: false }
                  )
                }
              />
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12} sx={{ mt: 4 }}>
            <FormControl sx={{ width: "100%", background: "white" }}>
              <TextField
                label="Password"
                id="password"
                size="small"
                type={showPass === 0 ? "password" : "text"}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPass === 0 ? (
                        <RemoveRedEyeIcon
                          onClick={() => {
                            setShowPass(1);
                          }}
                        />
                      ) : (
                        <VisibilityOffIcon
                          onClick={() => {
                            setShowPass(0);
                          }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid md={12} xs={12} sx={{ mt: 2 }}>
          <FormControl sx={{ width: "100%", textAlign: "end" }}>
            <ForgotPass />
          </FormControl>
        </Grid>
        <Grid
          md={12}
          xs={12}
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            form="loginForm"
            type="submit"
            className="primary-button"
            sx={{ width: "80%", textTransform: "capitalize" }}
          >
            Sign in
          </Button>

          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", sm: "row" },
              justifyContent: "space-between",

              mt: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography>Don't have an account? </Typography>
              <Button
                className="otp-hover-purple"
                sx={{
                  color: "#6059C9",
                  fontSize: "13px !important",
                  ml: 0.3,
                  textTransform: "capitalize",
                  padding: "2px 8px",
                }}
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Register Here
              </Button>
            </Box>

            <Divider orientation="vertical" flexItem />
            {/* <Button
              className="otp-hover-purple"
              sx={{
                color: "#6059C9",
                fontSize: "13px !important",
                textTransform: "capitalize",
                padding: "2px 8px",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Back to home
            </Button> */}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
