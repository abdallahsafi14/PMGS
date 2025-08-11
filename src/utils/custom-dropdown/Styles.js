import styled from "styled-components";

export const DropdownTrigger = styled.button`
  position: relative;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 6px;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid #ddd; /* You can also apply theme.borderColor if you want */
  border-radius: 6px;
  list-style: none;
  padding: 0;
  min-width: 160px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

export const DropdownItem = styled.li`
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }

  color: ${({ theme }) => theme.text};
`;
