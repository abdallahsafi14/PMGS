import styled from "styled-components";
import DataTable from "react-data-table-component";

export const StyledTable = styled(DataTable)`
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.background};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.hover};
  }
  &::-webkit-scrollbar {
    height: 8px !important;
  }

  /* padding: 16px; */
  background-color: ${({ theme }) => theme.primary};
  border: 1px solid
    ${({ theme }) => (theme.text === "#E0E0E0" ? "#444" : "#ccc")};
  border-radius: 5px;
  overflow: auto;

  @media (max-width: 768px) {
    /* overflow-x: hidden; */
  }

  .rdt_Table {
    background-color: transparent;
    /* width: 100%; */
    min-height: 300px;
    .pagination {
      background-color: red;
    }
  }

  .rdt_TableHeadRow,
  .rdt_TableHeader {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.text};
    font-weight: 600;
    padding: 8px 12px;
  }

  .rdt_TableCol_Sortable {
    text-align: center;
    width: fit-content;
    display: flex;
    padding-inline-start: 0px;
    padding-inline-end: 0px;

    &:hover {
      /* background-color: ${({ theme }) => theme.hover}; */
    }
  }

  .rdt_TableCol {
    justify-content: center;
  }

  .VqDEC {
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
  }

  .rdt_TableRow {
    color: ${({ theme }) => theme.text};

    &:nth-child(even) {
      background-color: ${({ theme }) => theme.primary};
    }

    &:nth-child(odd) {
      background-color: ${({ theme }) => theme.background};
    }

    &:hover {
      background-color: ${({ theme }) => theme.hover} !important;
    }
  }

  .rdt_TableCell {
    padding-inline-start: 10px;
    padding-inline-end: 10px;
    display: flex;
    justify-content: center;
    color: ${({ theme }) => theme.text};
  }
  .dJhWYq div {
    white-space: wrap;
    overflow: visible !important;
    text-overflow: none;
    text-align: center;
  }

  .action-btn {
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.secondary};
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.hover};
      transform: scale(1.1);
    }

    &:active {
      background-color: ${({ theme }) => theme.active};
    }
  }

  .action-btn svg {
    width: 20px;
    height: 20px;
  }

  div[data-column-id="1"] {
    flex-grow: 0;
  }

  div[data-column-id="3"] {
    flex-grow: 0;
    overflow: visible;
  }

  div[data-column-id] {
    overflow: visible;
  }

  .table-container {
    position: relative;
    overflow: visible;
  }

  .custom-dropdown {
    position: relative;
  }

  /* Pagination styles */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 20px;

    li {
      list-style: none;

      a {
        padding: 8px 12px;
        border: 1px solid ${({ theme }) => theme.secondary};
        color: ${({ theme }) => theme.text};
        text-decoration: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background-color: ${({ theme }) => theme.hover};
        }
      }

      &.active a {
        background-color: ${({ theme }) => theme.secondary};
        color: ${({ theme }) => theme.textOnSecondary};
      }
    }
  }
  .table-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const Container = styled.div`
  position: relative;
  overflow: visible;
  /* background-color: ${({ theme }) => theme.background}; */
  color: ${({ theme }) => theme.text};
  /* padding: 20px; */
  border-radius: 8px;
  /* min-height: 100vh; */

  h1 {
    color: ${({ theme }) => theme.text};
    margin-bottom: 20px;
    font-size: 2rem;
    font-weight: 600;
  }

  button {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.textOnSecondary};
    border: none;
    padding: 10px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.hover};
      transform: translateY(-2px);
    }

    &:active {
      background-color: ${({ theme }) => theme.active};
      transform: translateY(0);
    }
  }

  select,
  label {
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.background};
    border: 1px solid
      ${({ theme }) => (theme.text === "#E0E0E0" ? "#444" : "#ccc")};
    padding: 8px;
    border-radius: 4px;
    margin-left: 8px;
  }

  select {
    cursor: pointer;

    &:focus {
      outline: 2px solid ${({ theme }) => theme.secondary};
      outline-offset: 2px;
    }
  }

  @media (max-width: 768px) {
    padding: 10px;

    .nguQA,
    .kXmNri,
    .fGdbkY,
    .dSscLd,
    .dLQcbH,
    .jlLlbj,
    .dbTAVk {
      overflow-x: auto !important;
    }
  }

  .vAjeK {
    /* width: 200px !important; */
    background-color: red !important;
  }

  .table-container div {
    overflow-x: auto;
    /* width: 100%; */
  }

  @media (max-width: 768px) {
    .table-container div {
      overflow-x: auto;
    }
  }

  .image-container {
    background-image: url("https://via.placeholder.com/40");
    border-radius: 50%;
    height: 40px;
    width: 40px;
    border: 2px solid ${({ theme }) => theme.secondary};
  }

  .image-container img {
    background-image: url("https://via.placeholder.com/40");
    border-radius: 50%;
  }

  /* Spinner styling */
  .spinner-border {
    color: ${({ theme }) => theme.secondary};
  }

  /* Error message styling */
  .error-message {
    color: #dc3545;
    background-color: ${({ theme }) =>
      theme.text === "#E0E0E0" ? "#2d1b1b" : "#f8d7da"};
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #dc3545;
  }
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      margin-inline: 5px;
      background-color: ${({ theme }) => theme.secondary};
      border-radius: 5px;
      a {
        display: inline-block;
        width: 25px;
        text-align: center;
        color: ${({ theme }) => theme.textOnSecondary} !important;
      }
    }
    .previous,
    .next {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${({ theme }) => theme.secondary};
      border-radius: 5px;
      padding: 5px;
      a {
        text-decoration: none;
        width: fit-content;
        color: ${({ theme }) => theme.textOnSecondary} !important;
      }
    }

    .break {
      background-color: transparent;
    }
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;

  .form-group {
    flex: 1;
    min-width: 200px;
  }
  .form-label {
    margin-bottom: 1;
    border: none;
  }
  .form-select {
    margin-bottom: 0;
    border: none;
  }
  .form-control {
    background-color: ${({ theme }) => theme.background} !important;
    border: none;
    color: ${({ theme }) => theme.textOnSecondary} !important;
    &::placeholder {
      color: ${({ theme }) => theme.textOnSecondary} !important;
    }
  }
`;
