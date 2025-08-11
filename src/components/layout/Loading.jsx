import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .spinner {
    background-color: ${({ theme }) => theme.active};
  }
`;
function Loading() {
  return (
    <Container>
      <Spinner size="xlg" animation="grow" className="spinner" />
    </Container>
  );
}

export default Loading;
