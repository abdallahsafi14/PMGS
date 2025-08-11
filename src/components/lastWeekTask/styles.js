import styled from "styled-components";

export const WeekContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 16px;
`;

export const WeekHeader = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 3px;
  margin-bottom: 8px;
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 3px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.primary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.hover};
  }
`;

export const CheckboxContainer = styled.div`
  margin-right: 12px;
  padding-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: max-content;
`;

export const Checkbox = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid ${({ theme }) => theme.secondary}; /* Use secondary color for border */
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.secondary};

  background-color: ${(props) =>
    props.checked
      ? "transparent"
      : "transparent"}; /* Default unchecked state */

  &:hover {
    background-color: ${({ theme }) => theme.hover}; /* Hover effect */
  }

  &.checked {
    background-color: ${({ theme }) =>
      theme.secondary}; /* Checked state uses secondary color */
  }
`;
export const Content = styled.div`
  flex: 1;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  margin-bottom: 4px;
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  background: ${({ theme }) => theme.secondary};
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 3px;
  margin-right: 8px;
`;

export const Description = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
  font-size: 12px;
  gap: 8px;
`;

export const Icon = styled.span`
  display: inline-flex;
  margin-right: 4px;
`;

export const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
  gap: 8px;
`;

export const Status = styled.div`
  color: ${({ theme }) => theme.text};

  font-size: 12px;
  padding-inline-end: 20px;
`;

export const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: bold;
`;

export const LoadMoreButton = styled.button`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 3px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 12px;
  text-align: center;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.hover};
  }
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #dfe1e6;
  margin-bottom: 16px;
`;

export const Tab = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#0052cc" : "#42526e")};
  font-weight: ${(props) => (props.active ? "600" : "normal")};
  border-bottom: 2px solid
    ${(props) => (props.active ? "#0052cc" : "transparent")};

  &:hover {
    color: ${({ theme }) => theme.hover};
  }
`;
