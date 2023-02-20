import { Button, Typography } from "@mui/material";
import React from "react";
import Spinner from "./Spinner";

const MyButton = ({
  icon,
  endIcon,
  text = "button",
  textColor = "",
  onClick,
  hidden = false,
  mx = 0,
  mr = 0,
  mt = 0,
  mb = 0,
  loading = false,
  form = "",
  type = "",
  disabled = false,
  positionBottom = false,
  size = "medium",
  red = false,
  redOutline = false,
  hoverOrange = false,
  width = "",
}) => {
  return (
    <span hidden={hidden}>
      <Button
        className={`d-flex align-items-center ${disabled || hoverOrange
          ? "otp-hover-orange"
          : red
            ? "button-red"
            : redOutline
              ? "button-red-outline"
              : "otp-hover-purple"
          } ${positionBottom ? "bottom-right-positon" : ""}`}
        onClick={onClick}
        sx={{
          mx: mx && mx,
          mr: mr && mr,
          mt: mt && mt,
          mb: mb && mb,
          color: textColor,
          "&:hover": {
            cursor: disabled && "not-allowed",
          },
          "&:disabled": {
            background: "#d1d1d1",
          },
        }}
        form={form}
        type={type}
        disabled={disabled}
        size={size}
      >
        {<span>{icon && !loading && icon}</span>}
        <span>{icon && loading && <Spinner loading={loading} />}</span>
        <span className="d-flex align-items-center">
          <Typography
            sx={{
              marginLeft: icon ? "8px" : "",
              marginRight: "4px",
              // display: { xs: "none", md: "block" },
              fontSize: "12px",
              textTransform: "capitalize",
            }}
          >
            {text}
          </Typography>
        </span>
        <span>{endIcon && endIcon}</span>
      </Button>
    </span>
  );
};

export default MyButton;
