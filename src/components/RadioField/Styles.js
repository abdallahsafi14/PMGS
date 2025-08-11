import styled from "styled-components";

export const Label = styled.label`
display:flex;
align-items:center;
justify-content: flex-start;
cursor:pointer;
& input{
  accent-color: black;
}

`
export const RadioWrapper = styled.div`
  display:flex;
  flex-direction: column;
  gap:5px;
  `
export const RadioDetails = styled.div`
  margin-inline-start: 8px;
  & h2 {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 2px;
  }
  & p {
    font-size: 1.2rem;
    font-weight: 400;
    color: #5F5F5F;
    font-size: 0.9rem;
    margin-bottom: 0;
  }
  `

    export const Button = styled.button`
  background-color: #37d6ae;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 20px;
  font-size: 25px;
  font-weight: 400;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:disabled {
    background-color: #bfbfbf;
    cursor: not-allowed;
  }
 
  @media(max-width: 374.98px){
    width: 85%;
    margin-left: 10px;
   }
`;