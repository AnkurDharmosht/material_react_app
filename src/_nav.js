import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

// admin navigation
export const AdminNav = [
  {
    title: "Dashboard",
    icon: <HomeOutlinedIcon />,
    to: "/admin/dashboard",
  },
  {
    title: "Users",
    icon: <PersonOutlineOutlinedIcon />,
    to: "/admin/users",
  },
  {
    title: "Sales",
    icon: <TrendingUpOutlinedIcon />,
    to: "/admin/sales",
  },
  {
    title: "Purchases",
    icon: <ShoppingCartOutlinedIcon />,
    to: "/admin/purchases",
  },
  {
    title: "Cards",
    icon: <CreditCardOutlinedIcon />,
    to: "/admin/cards",
  },
  {
    title: "GV",
    icon: <AccountTreeOutlinedIcon />,
    to: "/admin/gv",
  },
  {
    title: "Locations",
    icon: <FmdGoodOutlinedIcon />,
    to: "/admin/locations",
  },
];

// sub admin navigation
export const SubAdminNav = [
  {
    title: "Dashboard",
    icon: <HomeOutlinedIcon />,
    to: "/admin/dashboard",
  },
];

// user navigation
export const UserNav = [
  {
    title: "Dashboard",
    icon: <HomeOutlinedIcon />,
    to: "/user/dashboard",
  },
];
