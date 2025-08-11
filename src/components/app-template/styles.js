import styled from "styled-components";

export const Styles = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};

  .main-data {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    transition: margin-left 0.3s ease-in-out;
    width: 100%;
  }

  @media (max-width: 1020px) {
    .main-data {
      margin-left: ${(props) => (!props.isSidebarCollapsed ? "0px" : "250px")};
    }
  }

  .children-content {
    display: inline-block;
    margin-left: ${(props) => (props.isSidebarCollapsed ? "0px" : "250px")};
    transition: margin-left 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    .main-data,
    .children-content {
      margin-left: 0;
    }
  }
`;

export const ChildrenContent = styled.div`
  display: inline-block;
  margin-left: ${(props) => (props.isSidebarCollapsed ? "60px" : "250px")};
  transition: margin-left 0.3s ease-in-out;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};

  @media (max-width: 1020px) {
    margin-left: ${(props) => (props.isSidebarCollapsed ? "0px" : "250px")};
  }
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;
