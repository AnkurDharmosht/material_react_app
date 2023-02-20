import React from "react";
import { Logo } from "../iconsImports";

const LogoComponent = ({ width = "150px", pl = "" }) => {
  return (
    <img src={Logo} width={width} alt="logo" style={{ paddingLeft: pl }} />
  );
};

export default LogoComponent;
