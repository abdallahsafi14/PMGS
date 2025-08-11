import styled from "styled-components";

export const SidebarContainer = styled.aside`
  padding: 0px !important;
  width: ${(props) => (props.isCollapsed ? "60px" : "250px")};
  background-color: ${(props) =>
    props.theme.background}; /* Use primary color for sidebar background */
  color: ${(props) => props.theme.text}; /* Use text color for readability */
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(
    ${(props) =>
      props.isCollapsed && window.innerWidth < 1020 ? "-100%" : "0"}
  );
  transition: width 0.3s ease-in-out, transform 0.3s ease-in-out;
  z-index: 1000;
  box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1);
  overflow-x: hidden;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #f56600;
    border-radius: 4px;
  }

  @media (max-width: 1020px) {
    transform: translateX(${(props) => (props.isCollapsed ? "-100%" : "0")});
  }

  .fade {
    transition: opacity 0.3s ease-in-out;
    opacity: ${(props) => (props.isCollapsed ? 0 : 1)};
    visibility: ${(props) => (props.isCollapsed ? "hidden" : "visible")};
  }
`;

export const SidebarHeader = styled.div`
  padding: ${(props) => (props.isCollapsed ? "10px 0" : "0px 10px")};
  height: 40px;
  display: flex;
  align-items: center;
  margin-top: 13px;

  .navbar-brand {
    display: flex;
    align-items: center;
    padding: 10px 0;
    padding-inline-start: ${(props) => (props.isCollapsed ? "10.5px" : "0px")};
    text-decoration: none;
    color: ${(props) =>
      props.theme.text}; /* White text for orange background */
    width: 100%;
  }
`;

export const LogoContainer = styled.div`
  min-width: 40px;
  display: flex;
  justify-content: center;

  img {
    width: 40px;
    height: auto;
    object-fit: contain;
  }
`;

export const LogoTitle = styled.h4`
  margin-left: 10px;
  font-size: 24px;
  font-weight: bold;
  white-space: nowrap;
  margin-bottom: 0;
  color: ${(props) => props.theme.text}; /* White text for orange background */
`;

export const SidebarBody = styled.div`
  .dropdown-toggle::after {
    margin-left: -0.255em;
    margin-top: 0.255em;
  }
  flex: 1;
  height: calc(100vh - 60px);

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.theme.secondary + "80"}; /* Semi-transparent secondary color */
    border-radius: 4px;
  }

  .scroll-content {
    padding: ${(props) => (props.isCollapsed ? "10px 5px" : "10px")};
  }

  .sidebar-list {
    .list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .nav-item {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px ${(props) => (props.isCollapsed ? "10px" : "15px")};
      margin-bottom: 5px;
      border-radius: 4px;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: ${(props) => props.theme.hover}; /* Use hover color */
      }

      .nav-link {
        color: ${(props) => props.theme.text}; /* Use text color */
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;

        &:hover {
          color: ${(props) =>
            props.theme.secondary}; /* Use secondary color for hover */
        }

        &.active {
          color: ${(props) => props.theme.active}; /* Use active color */
          font-weight: bold;
        }
      }
    }
  }
`;

export const SidebarButton = styled.button`
  width: 32px;
  height: 32px;
  position: fixed;
  top: 15px;
  left: ${(props) => (props.isCollapsed ? "70px" : "200px")};
  cursor: pointer;
  font-size: 18px;
  background-color: ${(props) =>
    props.theme.secondary}; /* Use secondary color for button */
  color: ${(props) =>
    props.theme.textOnSecondary}; /* White text for orange background */
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.3s ease-in-out, background-color 0.2s ease;
  z-index: 1001;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    left: ${(props) => (props.isCollapsed ? "10px" : "260px")};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${(props) => props.theme.active + "40"};
  }

  .arrow {
    transform: ${(props) =>
      props.isCollapsed ? "rotate(0deg)" : "rotate(-180deg)"};
    transition: transform 0.3s ease-in-out;
    display: inline-block;
  }

  @media (max-width: 1020px) {
    left: ${(props) => (props.isCollapsed ? "15px" : "200px")};
    transform: ${(props) =>
      props.isCollapsed ? "translateX(0)" : "translateX(0)"};
  }
`;
