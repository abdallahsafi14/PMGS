import styled from "styled-components";

export const BoardContainer = styled.div`
  display: flex;
  gap: 20px;
  /* padding: 20px; */
  overflow-x: auto;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.primary};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.theme.secondary + "80"}; /* Semi-transparent secondary color */
    border-radius: 4px;
  }
  p {
    padding: 0.4rem 0;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  background-color: ${({ theme }) => theme.primary};
  border-radius: 12px;
  padding: 15px;
  min-width: 250px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.primary};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.theme.secondary + "80"}; /* Semi-transparent secondary color */
    border-radius: 4px;
  }
`;

export const ColumnHeader = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 10px;
  text-align: center;
`;

export const TaskCard = styled.div`
  background-color: ${({ theme }) => theme.background};
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: ${({ isDragging }) =>
    isDragging ? "0 0 12px rgba(0,0,0,0.2)" : "0 2px 6px rgba(0,0,0,0.05)"};
  transition: all 0.2s ease;
`;

export const TaskTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
  j
`;
export const SubtaskList = styled.ul`
  list-style: none;
  padding-left: 10px;
  margin-top: 10px;
`;

export const SubtaskItem = styled.li`
  font-size: 0.8rem;
  color: ${({ completed }) => (completed ? "green" : "#888")};
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  margin-bottom: 4px;
`;

export const AddTaskButton = styled.button`
  margin-top: 10px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textOnSecondary};
  border: none;
  border-radius: 6px;
  padding: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  align-self: center;
  justify-content: flex-end;

  &:hover {
    background-color: ${({ theme }) => theme.active};
  }
`;

export const AddSubtaskButton = styled.button`
  margin-top: 10px;
  font-size: 0.75rem;
  background: transparent;
  color: ${({ theme }) => theme.secondary};
  border: none;
  cursor: pointer;
  padding: 4px 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.active};
  }
`;
