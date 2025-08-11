import styled from "styled-components";

export const LogContainer = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
`;

export const LogTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.secondary};
`;

export const Section = styled.div`
  margin-bottom: 2.5rem;
`;

export const InfoRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: baseline;
`;

export const Label = styled.div`
  font-weight: bold;
  width: 150px;
  color: ${({ theme }) => theme.text};
`;

export const Value = styled.div`
  color: ${({ theme }) => theme.text};
  flex: 1;
`;

export const Badge = styled.span`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textOnSecondary || "#fff"};
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  text-transform: capitalize;
`;

export const Divider = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.secondary};
  padding-bottom: 5px;
  color: ${({ theme }) => theme.secondary};
`;

export const BackButton = styled.button`
  background: none;
  color: ${({ theme }) => theme.secondary};
  border: none;
  margin-bottom: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;
