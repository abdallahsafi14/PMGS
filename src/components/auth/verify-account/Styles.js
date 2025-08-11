import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100dvh;
`;

export const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  /* overflow: hidden; */
  background-color: var(--bg-color);
`;
export const ReactCodeProps = {
  className: "reactCodeInput",
  inputStyle: {
    MozAppearance: "textfield", // For Firefox
    WebkitAppearance: "none",  // For Webkit-based browsers
    appearance: "none", 
    width: "43px",
    borderRadius: "8px",
    fontSize: "20px",
    height: "43px",
    paddingLeft: "14px",
    color: "black",
    border: "2px solid #282560",
  },
};

export const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  & form {
    display: flex;
    flex-direction: column;
  }
  & .reactCodeInput{
    display: grid !important;
    grid-template-columns: repeat(6,auto);
    gap:25px;
    padding-block:12px;
    @media (max-width:400px){
      grid-template-columns: repeat(3,auto);
      grid-template-rows: repeat(2,auto);
      justify-content: center;

    }
  }
  & .reactCodeInput  input[type="number"]{
    appearance: none;
    border: 2px solid #ccc; /* Apply initial border color here */
    border-radius: 8px;
  }
  & .reactCodeInput input[type="number"]:focus {
    border-color: #4DBFA7 !important; /* Override border color on focus */
  }

  & .reactCodeInput input::-webkit-inner-spin-button,
.reactCodeInput input::-webkit-outer-spin-button {
  -webkit-appearance: none; 
  margin: 0; 
}
`;


export const Logo = styled.img`
  margin: 12px auto;
  width: 150px;
  height: 120;
  @media (max-width: 424.98px) {
    transform: translateX(-10px);
  }
`;

export const Title = styled.h1`
  color: #282560;
  font-size: 1.3rem;
  font-family: "Gothic";
  font-weight: 500;
  margin-bottom: 15px;
  
  @media (max-width: 424.98px) {
    margin-right: 35px;
  }
`;
  

  export const Label = styled.label`
  display:flex;
  align-items:center;
  justify-content: flex-start;
  cursor:pointer;
  & input{
    accent-color: black;
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

  export const ResendText = styled.div`
  font-size: 0.75rem;
  font-weight: bold;
  text-align:center;
  margin-top: 10px;
  & button {
    cursor: pointer;
    color: #4DBFA7;
    border:none;
    font-weight:bold;
    &:disabled{
      color: #bfbfbf;
      cursor: not-allowed;
    }

;
  }
  `

  export const VerifyButton = styled.button`
  background-color:#37d6ae;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 20px;
  font-size: 25px;
  font-weight: 400;
  cursor: pointer;
  width: 100%;
  // margin-top: 10px;

  &:disabled {
    background-color: #bfbfbf;
    cursor: not-allowed;
  }

 
  @media(max-width: 374.98px){
    width: 85%;
    margin-left: 10px;
   }
  `

export const ImageSection = styled.div`
/* position: fixed;
right:0;
top:0; */
flex: 1;
background: url("/src/assets/images/work-08.jpg") no-repeat center center;
background-size: cover;
@media (max-width: 991px) {
  display: none;
}
`;
