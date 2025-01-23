import React from "react";
import { Navigate } from "react-router-dom";

// Mock authentication check
const isAuth = true;

const PrivateRoute = ({ children }) => {
    return isAuth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
