import styled from "styled-components";

export const TaskContainer = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
`;

export const TaskHeader = styled.h2`
  color: ${({ theme }) => theme.secondary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const TaskMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

export const TaskSection = styled.section`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.secondary};
`;

export const SubtaskList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

export const SubtaskItem = styled.li`
  padding: 0.5rem;
  background-color: ${({ completed, theme }) =>
    completed ? theme.hover : theme.background};
  border-left: 4px solid ${({ completed }) => (completed ? "green" : "gray")};
  margin-bottom: 0.5rem;
  border-radius: 6px;
`;

export const SubmissionBox = styled.div`
  font-size: 0.9rem;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.background};
  border-left: 4px solid ${({ theme }) => theme.secondary};
  margin-bottom: 0.6rem;
  border-radius: 6px;
`;

export const CommentBox = styled.div`
  font-size: 0.9rem;
  padding: 0.6rem;
  margin-bottom: 0.5rem;
  border-left: 3px solid ${({ theme }) => theme.active};
  background-color: ${({ theme }) => theme.background};
  border-radius: 4px;
`;
export const SubmitSection = styled.div`
  background-color: ${({ theme }) => theme.primary};
  padding: 20px 0;
  border-radius: 10px;
  margin-top: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

export const SubmitForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const SubmitField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubmitLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.text};
`;

export const SubmitInput = styled.input`
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textOnSecondary};
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9em;
`;
