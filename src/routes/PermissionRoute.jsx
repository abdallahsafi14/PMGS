// src/routes/PermissionRoute.js
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectPermissions, selectUser } from "../store/auth/authSlice";

// eslint-disable-next-line react/prop-types
const PermissionRoute = ({ requiredPermissions }) => {
  const userPermissions = useSelector(selectPermissions);
  console.log(userPermissions);

  // eslint-disable-next-line react/prop-types
  const hasPermission = requiredPermissions.every((perm) =>
    userPermissions.includes(perm)
  );

  return hasPermission ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default PermissionRoute;
