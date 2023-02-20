import { Box, Button, Container, Grid } from "@mui/material";
import React from "react";
import { notFound404 } from "../iconsImports";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const PageNotFound = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const accessToken = authCtx.accessToken;

  return (
    <>
      <Container maxWidth="lg">
        <Box component="div">
          <img alt="404 Not Found" src={notFound404} width="600px" />
        </Box>
        Error page Not Found
        {!accessToken ? (
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login Here
          </Button>
        ) : (
          <Button
            onClick={() => {
              navigate("/admin/dashboard");
            }}
          >
            {user && user ? "Go to DashBoard" : "Go To Landing Page"}
          </Button>
        )}
      </Container>
    </>
  );
};
export default PageNotFound;
