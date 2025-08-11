import React, { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavbarContainer } from "./styles";
import { IoMdSettings } from "react-icons/io";
import CustomDropdown from "../../../utils/custom-dropdown";
import Drawer from "../../../utils/custom-drawer";
import { Themes } from "../../../context/themes/themes";
import { themesColor } from "../../../utils/themes/themes";
import NotificationDropdown from "../../dashboard/notifications/NotificationDropdown";
import { useDispatch } from "react-redux";
import { getPermissions } from "../../../store/permissions/action/permissionsActions";
import { fetchUsers } from "../../../store/users/action/usersActions";
import { fetchProjects } from "../../../store/projects/action/projectsActions";

const SiteNavbar = ({ isSidebarCollapsed }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjects({}));
    dispatch(getPermissions());
    dispatch(fetchUsers());
  }, []);
  const [drawerState, setDrawerState] = useState(false);
  const { setTheme } = useContext(Themes);

  const handleThemeSelect = (value) => {
    setTheme(themesColor[value]);
    localStorage.setItem("theme", value);
  };

  const drawerContent = (
    <div>
      <h3>Theme Mode</h3>
      <div onClick={() => handleThemeSelect("light")}>🌞 Light Mode</div>
      <div onClick={() => handleThemeSelect("dark")}>🌙 Dark Mode</div>
    </div>
  );

  const dropdownOptions = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Projects", value: "projects" },
    { label: "Settings", value: "settings" },
  ];

  return (
    <>
      <Drawer open={drawerState} onClose={() => setDrawerState(false)}>
        {drawerContent}
      </Drawer>

      <NavbarContainer isSidebarCollapsed={isSidebarCollapsed}>
        <Navbar expand="lg" className="py-2 px-3">
          <Container fluid className="justify-content-end gap-3">
            <div className="d-flex align-items-center gap-3">
              <CustomDropdown
                label="Navigation"
                options={dropdownOptions}
                onSelect={(value) => console.log("Selected:", value)}
              />
              <CustomDropdown
                label="Theme"
                options={[
                  { label: "Light", value: "light" },
                  { label: "Dark", value: "dark" },
                ]}
                onSelect={handleThemeSelect}
              />
              <NotificationDropdown />
            </div>

            <div
              className="d-flex align-items-center cursor-pointer"
              onClick={() => setDrawerState(true)}
              title="Settings"
            >
              <IoMdSettings size={24} />
            </div>
          </Container>
        </Navbar>
      </NavbarContainer>
    </>
  );
};

export default SiteNavbar;
