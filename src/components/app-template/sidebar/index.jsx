import { useSelector, useDispatch } from "react-redux";
import { useEffect, memo } from "react";
import {
  SidebarContainer,
  SidebarHeader,
  SidebarBody,
  SidebarButton,
  LogoContainer,
  LogoTitle,
} from "./Styles";
import CustomNavItem from "../../../utils/custom-navItem";
import { sidebarMenu } from "../../../constants/sidebarMenu";
import logo from "../../../assets/images/Logo.png";
import { getPermissions } from "../../../store/permissions/action/permissionsActions";

function Sidebar({ isSidebarCollapsed, toggleSidebar }) {
  const dispatch = useDispatch();
  const { permissions, loading } = useSelector((state) => state.permissions);

  const permissionNames = permissions.map((perm) => perm.name);

  useEffect(() => {
    if (permissions.length === 0 && !loading) {
      dispatch(getPermissions());
    }
  }, []);

  return (
    <>
      <SidebarContainer isCollapsed={isSidebarCollapsed} data-testid="sidebar">
        <SidebarHeader isCollapsed={isSidebarCollapsed}>
          <a href="/" className="navbar-brand" aria-label="Home">
            <LogoContainer>
              <img src={logo} alt="PGMS Logo" />
            </LogoContainer>
            {!isSidebarCollapsed && (
              <LogoTitle className="fade">PMGS</LogoTitle>
            )}
          </a>
        </SidebarHeader>
        <SidebarBody isCollapsed={isSidebarCollapsed}>
          <div className="scroll-content">
            <nav className="sidebar-list" aria-label="Main Navigation">
              <ul className="list">
                <CustomNavItem
                  sidebarMenu={sidebarMenu}
                  isCollapsed={isSidebarCollapsed}
                  permissions={permissionNames}
                />
              </ul>
            </nav>
          </div>
        </SidebarBody>
      </SidebarContainer>

      <SidebarButton
        isCollapsed={isSidebarCollapsed}
        onClick={toggleSidebar}
        aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!isSidebarCollapsed}
      >
        <span className="arrow">➔</span>
      </SidebarButton>
    </>
  );
}

export default memo(Sidebar);
