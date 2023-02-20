import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import SideNav from "./components/SideNav";
import PageNotFound from "./components/PageNotFound";
import LandingPage from "./views/LandingPage";
import LoginPage from "./views/LoginPage";
import Dashboard from "./views/Dashboard";
import Users from "./views/Users";
import Sales from "./views/Sales";
import Purchases from "./views/Purchases";
import Cards from "./views/Cards";
import Gv from "./views/Gv";
import Locations from "./views/Locations";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route>
            {isLoggedIn && (
              <Route path="admin" element={<SideNav />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="sales" element={<Sales />} />
                <Route path="purchases" element={<Purchases />} />
                <Route path="cards" element={<Cards />} />
                <Route path="gv" element={<Gv />} />
                <Route path="locations" element={<Locations />} />
              </Route>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
