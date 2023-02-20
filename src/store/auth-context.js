import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  user: "",
  location: "",
  isLoggedIn: false,
  login: (token) => {},
  saveUser: (user) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("access_token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  if (remainingTime <= 6000) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
  };
};
export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData && tokenData.token;
  }
  const initialUser = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);
  const [location, setLocation] = useState(
    JSON.parse(localStorage.getItem("location"))
  );
  const userIsLoggedIn = !!token;

  const userHandler = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  const logOutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("location");
    localStorage.removeItem("user");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("defaultDateFormat");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const setDefaultDateFormat = (format = "DD/MM/YYYY") => {
    localStorage.setItem("defaultDateFormat", format);
  };
  const loginHandler = (usertoken, expirationTime, format) => {
    localStorage.setItem("access_token", usertoken);
    localStorage.setItem("expirationTime", expirationTime);
    setToken(usertoken);
    setDefaultDateFormat();
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logOutHandler, remainingTime);
  };

  const latLongHandler = (lat, long) => {
    setLocation({ lat, long });
    localStorage.setItem("location", JSON.stringify({ lat, long }));
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logOutHandler, tokenData.duration);
    }

    return () => {};
  }, [tokenData, logOutHandler]);

  const contextValue = {
    token: token,
    user: user,
    location: location,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logOutHandler,
    saveUser: userHandler,
    setLocation: latLongHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
