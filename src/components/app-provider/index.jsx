import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";

const AppProvider = ({ children }) => {
  return (
    <SkeletonTheme baseColor="#d8d8d8" highlightColor="#f5f5f5">
      {children}
    </SkeletonTheme>
  );
};

export default AppProvider;
