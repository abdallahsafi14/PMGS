import styled from "styled-components";

export const StaticNavItem = styled.li`
  list-style: none;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text}; /* Use theme text color */
  border-left: 4px solid ${({ theme }) => theme.accent}; /* Use theme accent color */
  cursor: default;

  .static-text {
    display: block;
    pointer-events: none;
  }
`;

export const DropdownContainer = styled.div`
  .dropdown-toggle {
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: ${({ theme }) =>
        theme.hover}; /* Use theme hover color */
      color: ${({ theme }) => theme.text}; /* Use theme text color */
    }

    &.active {
      background-color: ${({ theme }) =>
        theme.active}; /* Use theme active color */
      color: ${({ theme }) => theme.text}; /* Use theme text color */
    }

    .icon-container {
      margin-right: 10px;

      .item-icon {
        font-size: 18px;
      }
    }

    .default-text {
      font-size: 16px;
      flex: 1;
      text-align: left;
    }
  }
`;

export const DropdownContent = styled.div`
  overflow: hidden;
  max-height: ${(props) => (props.isOpen ? "500px" : "0")};
  transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
  padding: ${(props) => (props.isOpen ? "10px 15px" : "0 15px")};
  background-color: ${({ theme }) =>
    theme.background}; /* Use theme background color */
  border-left: 2px solid ${({ theme }) => theme.accent}; /* Use theme accent color */

  .dropdown-item {
    padding: 10px 0;
    transition: background-color 0.3s, color 0.3s;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: ${({ theme }) => theme.text}; /* Use theme text color */
      transition: background-color 0.3s, color 0.3s;

      &.active {
        background-color: ${({ theme }) =>
          theme.active + "20"}; /* Use theme active color with opacity */
        color: ${({ theme }) => theme.text}; /* Use theme text color */
        border-radius: 5px;
      }

      .icon-container {
        margin-right: 10px;

        .item-icon {
          font-size: 16px;
        }
      }

      .default-text {
        font-size: 14px;
        text-align: left;
      }

      &:hover {
        background-color: ${({ theme }) =>
          theme.hover + "10"}; /* Use theme hover color with less opacity */
        color: ${({ theme }) => theme.text}; /* Use theme text color */
      }
    }
  }
`;

export const NavItem = styled.li`
  list-style: none;

  .nav-link {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    text-decoration: none;
    color: ${({ theme }) => theme.text}; /* Use theme text color */
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: ${({ theme }) =>
        theme.hover}; /* Use theme hover color */
      color: ${({ theme }) => theme.text}; /* Use theme text color */
    }

    &.active {
      background-color: ${({ theme }) =>
        theme.active}; /* Use theme active color */
      color: ${({ theme }) => theme.text}; /* Use theme text color */
    }

    .icon-container {
      margin-right: 10px;

      .item-icon {
        font-size: 18px;
      }
    }

    .item-name {
      font-size: 16px;
    }
  }
`;
