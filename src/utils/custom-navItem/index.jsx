import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  DropdownContainer,
  DropdownContent,
  StaticNavItem,
  NavItem,
} from "./Styles";

export default function CustomNavItem(props) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  // Helper function to render icon consistently
  const renderIcon = (icon) => {
    if (React.isValidElement(icon)) {
      return icon;
    } else if (typeof icon === "string") {
      return <i className={`item-icon ${icon}`}>{}</i>;
    } else {
      return null;
    }
  };

  // Helper function to check if user has permission
  const hasPermission = (requiredPermission) => {
    if (!requiredPermission) return true; // No permission required
    if (!props.permissions || !Array.isArray(props.permissions)) return false;
    return props.permissions.includes(requiredPermission);
  };

  // Helper function to check if dropdown has any visible children
  const hasVisibleChildren = (children) => {
    if (!children || !Array.isArray(children)) return false;
    // If any child has no permission requirement, or user has the required permission, show dropdown
    return children.some(
      (child) => !child.permission || hasPermission(child.permission)
    );
  };

  return props.sidebarMenu.map((menu, index) => {
    if (menu?.static) {
      // Static category item
      return (
        <React.Fragment key={`static-${menu.name}-${index}`}>
          <span></span>
          {!props.isCollapsed && (
            <StaticNavItem>
              <span className="static-text fade">{menu.name}</span>
            </StaticNavItem>
          )}
        </React.Fragment>
      );
    } else if (menu?.children) {
      // Dropdown menu - show if no permission required OR user has permission AND has visible children
      const menuPermissionCheck =
        !menu.permission || hasPermission(menu.permission);
      const canShowDropdown =
        menuPermissionCheck && hasVisibleChildren(menu.children);

      if (!canShowDropdown) return null;

      return (
        <DropdownContainer
          key={`dropdown-${menu.name}-${index}`}
          isSidebarCollapsed={props.isCollapsed}
        >
          <div
            className={`dropdown-toggle ${
              openDropdown === index ? "active" : ""
            }`}
            onClick={() => handleDropdownToggle(index)}
          >
            <div className="icon-container">{renderIcon(menu.icon)}</div>
            {!props.isCollapsed && (
              <span className="default-text fade">{menu.name}</span>
            )}
          </div>
          <DropdownContent isOpen={openDropdown === index}>
            {menu.children
              .filter(
                (child) => !child.permission || hasPermission(child.permission)
              )
              .map((child, childIndex) => (
                <div
                  className="dropdown-item"
                  key={`child-${child.name}-${childIndex}`}
                >
                  <NavLink
                    to={child.link}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    {child?.icon && (
                      <div className="icon-container">
                        {renderIcon(child.icon)}
                      </div>
                    )}
                    {!props.isCollapsed && (
                      <span className="default-text fade">{child.name}</span>
                    )}
                  </NavLink>
                </div>
              ))}
          </DropdownContent>
        </DropdownContainer>
      );
    } else if (hasPermission(menu.permission)) {
      // Regular clickable item - only show if user has permission
      return (
        <NavItem
          isSidebarCollapsed={props.isCollapsed}
          key={`nav-${menu.name}-${index}`}
        >
          <NavLink
            to={menu.link}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <div className="icon-container">{renderIcon(menu.icon)}</div>
            {!props.isCollapsed && (
              <span className="item-name fade">{menu.name}</span>
            )}
          </NavLink>
        </NavItem>
      );
    }

    return null; // Return null for items that don't match any condition
  });
}
