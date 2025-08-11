// src/pages/attachments/styles.js
import styled from "styled-components";

export const Container = styled.div`
  padding: 25px;
`;

export const FilterRow = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.secondary};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

export const Select = styled.select`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.secondary};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  appearance: none;
`;

export const FileCard = styled.div`
  background: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const FileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FileInfo = styled.div`
  font-weight: bold;
`;

export const FileNote = styled.p`
  margin: 10px 0;
`;

export const FileFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
