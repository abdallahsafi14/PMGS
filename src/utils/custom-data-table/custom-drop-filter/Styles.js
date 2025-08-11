import { Dropdown } from "react-bootstrap";
import styled from "styled-components";

export const StyledDropdown = styled(Dropdown)`
  position: relative; /* Ensure dropdown positions correctly */

  .dropdown-toggle {
    /* position: relative;
    top: -50px; */
    background-color: ${({ theme }) => theme.secondary};
    /* Use theme background */
    color: ${({ theme }) => theme.text}; /* Use theme text color */
    border-radius: 5px;
    font-size: 14px;
    padding: 0;
    transition: all 0.3s ease;

    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.secondary}; /* Hover effect */
      border-color: ${({ theme }) => theme.secondary};
      color: ${({ theme }) => theme.text};
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 20px !important; /* Position below the toggle */
    left: 0 !important;
    background-color: ${({ theme }) =>
      theme.background}; /* Use theme background */
    border: 1px solid ${({ theme }) => theme.secondary}; /* Border with secondary color */
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    z-index: 9999; /* Ensure it appears above table content */
    padding: 15px;
    min-width: 250px; /* Set a minimum width for the dropdown */
    max-height: 300px; /* Limit height for long forms */
    overflow-y: auto; /* Enable scrolling if content overflows */
  }

  .dropdown-menu form {
    display: flex;
    flex-direction: column;
    gap: 10px; /* Space between form elements */
  }

  .dropdown-menu button {
    background-color: ${({ theme }) =>
      theme.secondary}; /* Secondary color for button */
    color: ${({ theme }) => theme.textOnSecondary}; /* White text on button */
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.active}; /* Active state color */
    }
  }

  /* Focus styles for accessibility */
  .dropdown-menu:focus-within {
    outline: 2px solid ${({ theme }) => theme.secondary};
  }
`;
