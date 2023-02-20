import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { smLogo } from "../iconsImports";
import { AdminNav, SubAdminNav, UserNav } from "../_nav";
import NavItemComponent from "./NavItemComponent";
import NavItemSubmenu from "./NavItemSubmenu";
import { setTitleFunc } from "../utils/HeaderTitleUtil";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Button, Grid, IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  getActiveColor,
  getHoverInActive,
  getSecondaryColor,
} from "../theme/setThemeColor";
import LogoComponent from "./LogoComponent";
import AuthContext from "../store/auth-context";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const WebAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const WebDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer(props) {
  const navigate = useNavigate();
  const authCtx = React.useContext(AuthContext);
  const user = authCtx.user;
  const [activeIndex, setActiveIndex] = React.useState({
    index: 0,
    subIndex: -1,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const title = setTitleFunc(location.pathname, location.state);
  const [open, setOpen] = React.useState(false);
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    authCtx.logout();
    setAnchorEl(null);
  };

  // profile navigate function...
  const profileNavigate = () => () => {
    if (user && user.role === "Admin") {
      navigate("/admin/my-profile");
    } else if (user && user.role === "Asm") {
      navigate("/asm/my-profile");
    } else if (user && user.role === "Ad") {
      navigate("/ad/my-profile");
    } else if (user && (user.role === "Ret" || user.role === "Dd")) {
      navigate("/customer/my-profile");
    } else {
      navigate("/other/my-profile");
    }
    handleClose();
  };

  // outlet box style
  const outletBox = {
    width: {
      lg:
        user && user.role === "Admin"
          ? "100%"
          : user && user.role === "Asm"
          ? "100%"
          : "100%",
      xs: "100%",
    },
    justifyContent: "start",
    alignContent: "left",
    marginLeft: { md: "1rem", sm: "0.5rem", xs: "0.5rem" },
    marginTop: "1rem",
  };

  const leftNav =
    user && user.role === "Admin"
      ? AdminNav
      : user && user.role === "SubAdmin"
      ? SubAdminNav
      : user && user.role === "User"
      ? UserNav
      : AdminNav;

  const drawer = (
    <div>
      <DrawerHeader sx={{ justifyContent: "center" }}>
        {open && <LogoComponent />}
        {!open && <img src={smLogo} width="40px" alt="c_logo" />}
      </DrawerHeader>
      <Divider />
      <List
        sx={{
          height: { xs: "80vh", sm: "100vh" },
          overflowY: "scroll",
        }}
      >
        {leftNav.map((item, index) => {
          return item && item.submenus ? (
            <NavItemSubmenu
              item={item}
              open={open || mobileOpen}
              setOpen={setOpen}
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              key={index}
            />
          ) : (
            <NavItemComponent
              item={item}
              open={open || mobileOpen}
              setOpen={setOpen}
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
              index={index}
              key={index}
            />
          );
        })}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: "flex", fontFamily: "Poppins" }}>
      <CssBaseline />
      <WebAppBar position="fixed" open={open} sx={webAppBarStyle}>
        <Toolbar sx={webHeaderToolBarStyle} className="nav">
          {/* title section */}
          <Box sx={webHeaderBoxStyle}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: { xs: 0, sm: 3 },
                ...(open && { display: "none" }),
              }}
            ></IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={webMenuIcon}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={headerTitle}>
              {title}
            </Typography>
          </Box>
          {/* user avatar section */}
          <Box sx={webAvatarBox}>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={dividerStyle}
            />
            <Button
              sx={avatarButtonStyle}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Tooltip title="MY Profile" placement="bottom">
                {user && user.profile_image !== "0" ? (
                  <Avatar
                    id="user_img"
                    alt="Remy Sharp"
                    src={user && user.profile_image}
                    sx={{ width: 35, height: 35 }}
                  />
                ) : (
                  <AccountCircle sx={{ fontSize: "36px" }} />
                )}
              </Tooltip>
              <Grid sx={userNameGrid}>
                <Typography
                  component="span"
                  sx={{
                    padding: 1,
                    textTransform: "capitalize",
                  }}
                >
                  {user && user.name}
                </Typography>
              </Grid>
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Box sx={avatarDropdownCard}>
                <MenuItem disableRipple sx={avatarMenu}>
                  {user && user.profile_image !== "0" ? (
                    <Avatar
                      id="user_img"
                      alt="Remy Sharp"
                      src={user && user.profile_image}
                      sx={{ width: 80, height: 80 }}
                    />
                  ) : (
                    <AccountCircle
                      sx={{ fontSize: "80px", color: getSecondaryColor() }}
                    />
                  )}

                  <span
                    style={{
                      fontWeight: "550",
                      fontSize: "0.9rem",
                      marginTop: "0.3rem",
                    }}
                  >
                    {user && user.name}
                  </span>

                  <span
                    onClick={profileNavigate}
                    style={manageProfile}
                    className="simple-hover"
                  >
                    Manage your Profile
                  </span>
                </MenuItem>

                <div className="profile-dropdown-divider-new"></div>
                <MenuItem
                  disableRipple
                  onClick={() => {
                    handleLogout();
                    navigate("/login");
                  }}
                  sx={logoutButton}
                >
                  Logout <LogoutIcon className="ms-2" fontSize="small" />
                </MenuItem>
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </WebAppBar>

      {/* mobile drawer */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={mobileDrawerStyle}
      >
        {drawer}
      </Drawer>

      {/* web drawer */}
      <WebDrawer
        variant="permanent"
        open={open}
        onMouseOver={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        sx={webDrawerStyle}
      >
        {drawer}
      </WebDrawer>

      <Box component="main" sx={mainContainerBox}>
        <DrawerHeader />
        <Box
          className="outlet-bg"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={outletBox}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const webAppBarStyle = {
  paddingRight: "0px !important",
  background: getActiveColor(),
};
const webHeaderToolBarStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  pr: { xs: 0, md: 1 },
};
const webHeaderBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
};
const webMenuIcon = { mr: { md: 2, sm: 0, xs: 0 }, display: { sm: "none" } };
const headerTitle = {
  textAlign: "left",
  fontFamily: "Poppins",
  fontWeight: "bold",
  marginLeft: { md: 3, sm: 2, xs: 1 },
  fontSize: { md: "20px", sm: "15px", xs: "15px" },
};
const webAvatarBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
};
const dividerStyle = { color: "#000", mr: { xs: -2, sm: 0, md: 1 } };
const avatarButtonStyle = {
  borderRadius: "0px",
  py: 1,
  px: 0,
  textAlign: "right",
};
const userNameGrid = { display: { xs: "none", sm: "none", md: "block" } };
const avatarDropdownCard = {
  margin: 0,
  paddingTop: "0rem",
  width: "250px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const avatarMenu = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  marginTop: "-8px",
  "&:hover": { cursor: "default", background: "#fff" },
};
const manageProfile = {
  border: "1px solid #3f3f3f",
  borderRadius: "16px",
  padding: "0.2rem 1rem",
  fontSize: "0.9rem",
  margin: "1rem 0",
};
const logoutButton = {
  width: "100%",
  marginBottom: "-8px",
  textAlign: "center",
  py: 2,
  display: "flex",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: getHoverInActive(),
    color: "#fff",
  },
};
const mobileDrawerStyle = {
  display: { xs: "block", sm: "none" },
  position: "absolute",
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
    borderTopRightRadius: "16px",
    borderBottomRightRadius: "16px",
  },
  zIndex: "10000",
};
const webDrawerStyle = {
  position: "absolute",
  zIndex: "10000",
  display: { xs: "none", sm: "block" },
  "& .MuiDrawer-paper": {
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
    borderTopRightRadius: "16px",
    borderBottomRightRadius: "16px",
  },
};
const mainContainerBox = {
  // flexGrow: 1,
  width: "100%",
  display: "block",
  margin: "0 auto",
  paddingLeft: { xs: "0", sm: "64px", md: "58px" },
  paddingRight: "8px",
};
