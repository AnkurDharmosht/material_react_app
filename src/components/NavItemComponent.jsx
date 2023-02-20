import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SideBarContext from "../store/sidebar-context";
import {
  getActiveColor,
  getHoverActive,
  getHoverInActive,
} from "../theme/setThemeColor";

const NavItemComponent = ({
  item,
  open,
  index,
  setOpen,
  handleDrawerToggle,
  mobileOpen,
}) => {
  const sidebarCtx = useContext(SideBarContext);
  const setActiveIndex = sidebarCtx.setActiveIndex;
  const location = useLocation();
  const currentPath = location.pathname;
  let isCurrentActive = currentPath === item.to;

  if (
    currentPath.includes("/admin/accountStatement") &&
    item.to === "/admin/accounts"
  ) {
    isCurrentActive = true;
  } else if (
    currentPath.includes("/admin/bankStatement") &&
    item.to === "/admin/banks"
  ) {
    isCurrentActive = true;
  }

  return (
    <div>
      <ListItem
        key={item.title}
        disablePadding
        sx={{ display: "block" }}
        onClick={() => {
          setActiveIndex({
            index: index,
            subIndex: -1,
          });
          if (mobileOpen) {
            handleDrawerToggle();
          } else setOpen(false);
        }}
      >
        <NavLink
          to={item.to}
          key={item.to}
          style={({ isActive }) => {
            return {
              display: "block",
              margin: "0.2rem 0",
              color: isActive ? "#1e845a" : "black",
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: "none",
              padding: open ? "0px 18px 0px 18px" : "0px 8px 0px 8px",
            };
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              backgroundColor: isCurrentActive ? getActiveColor() : "",
              "&:hover": {
                backgroundColor: isCurrentActive
                  ? getHoverActive()
                  : getHoverInActive(),
              },
              borderRadius: "8px",
              boxShadow: isCurrentActive
                ? "0px 8px 37.5px rgba(55, 69, 87, 0.1)"
                : "#fff",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 1.5 : "auto",
                justifyContent: "center",
                color: isCurrentActive ? "#fff" : "#000",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.title}
              sx={{
                opacity: open ? 1 : 0,
                color: isCurrentActive ? "#fff" : "#000",
              }}
              className="font-navbar"
            />
          </ListItemButton>
        </NavLink>
      </ListItem>
    </div>
  );
};

export default NavItemComponent;
