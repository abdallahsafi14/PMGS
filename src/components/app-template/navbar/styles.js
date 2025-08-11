import styled from "styled-components";

export const NavbarContainer = styled.nav`
  margin-left: ${(props) => (props.isSidebarCollapsed ? "60px" : "250px")};
  transition: margin-left 0.3s ease-in-out;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};

  .navbar {
    min-height: 60px;
  }

  .container {
    max-width: 100%;
    padding: 0 2rem;
  }

  @media (max-width: 1020px) {
    margin-left: 0;
  }
`;
