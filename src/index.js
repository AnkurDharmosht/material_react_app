import "./index.css";
import "./scss/style.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { SideBarContextProvider } from "./store/sidebar-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SideBarContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </SideBarContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
