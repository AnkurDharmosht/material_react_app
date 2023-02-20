export const setTitleFunc = (path, states) => {
  return path === "/admin/dashboard"
    ? "Dashboard"
    : path === "/admin/users"
    ? "Users"
    : path === "/admin/sales"
    ? "Sales"
    : path === "/admin/purchases"
    ? "Purchases"
    : path === "/admin/cards"
    ? "Cards"
    : path === "/admin/gv"
    ? "GV"
    : path === "/admin/locations"
    ? "Location"
    : "";
};
