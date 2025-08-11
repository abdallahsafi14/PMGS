// src/routes/PrivateRoutesComponent.js
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PathConstants from "./pathConstants";

import { useLocation } from "react-router-dom";
import { selectIsAuthenticated, selectRole } from "../store/auth/authSlice";

const PrivateRoutesComponent = () => {
  const isAuthorized = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectRole);
  const location = useLocation();

  const allowedRoles = location.state?.allowedRoles;

  if (!isAuthorized) return <Navigate to={PathConstants.Login} replace />;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutesComponent;
