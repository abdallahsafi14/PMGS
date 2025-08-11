// src/context/permissions/permissions.js
import React, { createContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPermissions } from "../../store/permissions/action/permissionsActions";

export const UserPermissions = createContext();

export const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { permissions, loading, error } = useSelector(
    (state) => state.permissions
  );

  // Extract permission names for easier checking
  const permissionNames = permissions.map((perm) => perm.name);

  // Fetch permissions on mount if not already loaded
  useEffect(() => {
    if (permissions.length === 0 && !loading && localStorage.getItem("token")) {
      dispatch(getPermissions());
    }
  }, []);

  return (
    <UserPermissions.Provider
      value={{
        permissions: permissionNames, // Array of permission names
        fullPermissions: permissions, // Full permission objects
        loading,
        error,
      }}
    >
      {children}
    </UserPermissions.Provider>
  );
};
