import styled from "styled-components";

export const FormWrapper = styled.div`
  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    gap: 20px;
    overflow-x: auto;
    /* @media (max-width:767px){
      display: grid;
      grid-template-columns: auto auto ;
      grid-template-rows: auto auto;
      row-gap: 12px;
    } */
  }
  .inputSearch{
    border:none;
    background-color: transparent;
    &:focus{
      outline: none;
    }
    & svg {
      width: 22px;
      height: 22px;
      color: #4dbfa7;
    }
  }
`;
export const InputWrapper = styled.div`
  width: fit-content;

  .tableInput {
    padding: 10px;
    border: 1px solid #4dbfa7;
    border-radius: 8px;
    color: #4dbfa7;
    width: fit-content;
    background-color: transparent;
  }
  /* For most browsers */
  .no-arrows::-webkit-inner-spin-button,
  .no-arrows::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .no-arrows {
    -moz-appearance: textfield; /* For Firefox */
  }

  .tableInput::placeholder {
    color: #4dbfa7;
    font-family: "Alexandria";
    font-weight: 400;
    font-size: 1rem;
  }
  .tableInput:focus {
    outline: none;
  }
  .tableInput i svg {
    width:22px;
    height:22px;
  }
  .react-datepicker-wrapper input{
    width:163px;
  }
  

`;
