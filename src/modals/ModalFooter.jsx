import React from "react";
import { Box, Divider } from "@mui/material";
import LogoComponent from "../components/LogoComponent";
import MyButton from "../components/MyButton";

const ModalFooter = ({
  form,
  btn,
  request = false,
  disable = false,
  handleClose,
  type = "submit",
  onClick,
  icon = false,
}) => {
  return (
    <>
      <Divider
        sx={{ color: "#000", border: "1px solid black", mt: 3, mb: 2 }}
      />
      <div
        style={{
          width: "100%",
          // mt: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            borderRadius: "12px",
            paddingLeft: 12,
            paddingRight: 12,
            display: "flex",
            alignItems: "center",
          }}
        >
          <LogoComponent width="100px" />
        </div>
        <Box sx={{ position: "relative" }}>
          {!handleClose && (
            <MyButton
              text={btn ? btn : "Save"}
              disabled={request || disable}
              type={type}
              form={form ? form : ""}
              red
              onClick={onClick}
              icon={icon}
            />
          )}
          {/* <Spinner loading={request} size="small" /> */}
          {handleClose && (
            <MyButton text={btn ? btn : "Cancel"} onClick={handleClose} red />
          )}
        </Box>
      </div>
    </>
  );
};

export default ModalFooter;
