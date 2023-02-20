import React from "react";
import { Typography } from "@mui/material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { getActiveColor } from "../theme/setThemeColor";

const ModalHeader = ({ title = "Heading", handleClose }) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Poppins",
            fontSize: "20px",
            fontWeight: "550",
            display: "flex",
            alignItems: "center",
            color: getActiveColor(),
            width: "90%",
            justifyContent: "center",
            paddingLeft: "10%",
            marginTop: "24px",
            marginBottom: "16px",
          }}
        >
          {/* <KeyboardBackspaceIcon
            className="me-1 otp-hover-purple"
            onClick={handleClose}
          /> */}
          {title}
        </Typography>
        <span style={{ width: "10%", textAlign: "right" }}>
          <HighlightOffRoundedIcon
            className="hover-red"
            onClick={handleClose}
          />
        </span>
      </div>
      {/* <Divider sx={{ color: "#000", border: "1px solid black", mt: 1 }} /> */}
    </>
  );
};

export default ModalHeader;
