// src/pages/projects/create/createProject.styles.js
import styled from "styled-components";
import { Card, Form } from "react-bootstrap";
import Select from "react-select";

export const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;

  .textArea {
    display: flex;
    flex-direction: column;
  }
  .styled-select {
    background-color: red !important;
  }
`;

export const StyledFormControl = styled(Form.Control)`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.hover};

  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 0.6;
  }

  &:focus {
    background-color: ${({ theme }) => theme.background};
    border-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.text};
    box-shadow: none;
  }

  /* Handle Chrome autofill styles */
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.background} inset !important;
    -webkit-text-fill-color: ${({ theme }) => theme.text} !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const StyledFormSelect = styled(Form.Select)`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.hover};

  &:focus {
    background-color: ${({ theme }) => theme.background};
    border-color: ${({ theme }) => theme.secondary};
    box-shadow: none;
  }
  .option:active,
  .option:hover {
    background-color: red !important;
  }
`;

export const StyledReactSelect = styled(Select)`
  .react-select__control {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.hover};
    box-shadow: none;
  }

  .react-select__menu {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  .react-select__option {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};

    &:hover {
      background-color: ${({ theme }) => theme.hover};
    }
  }

  .react-select__multi-value {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.textOnSecondary};
  }

  .react-select__multi-value__label {
    color: ${({ theme }) => theme.textOnSecondary};
  }

  .react-select__multi-value__remove {
    color: ${({ theme }) => theme.textOnSecondary};

    &:hover {
      background-color: ${({ theme }) => theme.active};
      color: white;
    }
  }
`;

export const FileUploadLabel = styled.label`
  display: inline-block;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textOnSecondary};
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-inline-start: 10px;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;
