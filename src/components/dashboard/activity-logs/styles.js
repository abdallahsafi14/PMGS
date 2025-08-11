import styled from "styled-components";

export const ActivityContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.primary};

  h2 {
    font-size: 24px;
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 2px solid ${({ theme }) => theme.borderColor};
  }
`;
