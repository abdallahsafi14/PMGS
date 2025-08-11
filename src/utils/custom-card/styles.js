import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const CardContainer = styled.div`
  background: ${({ theme }) => theme.background};
  border-radius: 16px;
  padding: 24px;
  margin: 15px;
  width: calc(33.333% - 30px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 8px 20px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.07), 0 12px 24px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  @media (max-width: 768px) {
    width: calc(50% - 30px);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const CardHeader = styled.div`
  margin-bottom: 12px;
`;

export const CardTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.secondary};
  margin: 0;
`;

export const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

export const CardText = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
  margin: 0;
  line-height: 1.4;
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const Badge = styled.span`
  background-color: ${({ type }) =>
    type === "High"
      ? "#ff4d4f"
      : type === "Medium"
      ? "#fa8c16"
      : type === "Low"
      ? "#52c41a"
      : type === "Active"
      ? "#1890ff"
      : type === "Completed"
      ? "#13c2c2"
      : type === "Planning"
      ? "#722ed1"
      : "#999"};
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const CardFooter = styled.button`
  padding: 10px 20px;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textOnSecondary};
  font-weight: 600;
  border: none;
  border-radius: 10px;
  text-align: center;
  width: fit-content;
  align-self: flex-start;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.active};
  }
`;
