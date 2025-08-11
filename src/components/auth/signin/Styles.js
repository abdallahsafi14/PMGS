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

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(55, 214, 174, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(55, 214, 174, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(55, 214, 174, 0);
  }
`;

export const PageOverlay = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.background};
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  position: relative;
`;

export const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: ${(props) => props.theme.background};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
`;

export const FormSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.6s ease-in-out;
`;

export const FormCard = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 576px) {
    padding: 1.5rem;
    border-radius: 12px;
  }
`;

export const FormProgressBar = styled.div`
  height: 100%;
  width: ${(props) => props.width};
  background-color: ${(props) => props.theme.secondary};
  transition: width 0.3s ease;
`;

export const Logo = styled.img`
  width: 150px;
  height: auto;
  object-fit: contain;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
`;

export const NameFieldsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
  margin-bottom: 0.5rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

export const PhoneFieldWrapper = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const PhoneLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.textSecondary};
  display: block;
  margin-bottom: 8px;
`;

export const PhoneInputContainer = styled.div`
  position: relative;

  .phone-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${(props) => props.theme.iconColor};
    font-size: 18px;
    z-index: 1;
  }

  .phone-input {
    width: 100%;
    height: 50px;
    padding: 12px 12px 12px 40px;
    font-size: 16px;
    border: 1px solid
      ${(props) => (props.hasError ? "#e53935" : props.theme.borderColor)};
    border-radius: 8px;
    background-color: ${(props) => props.theme.inputBackground};
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${(props) =>
        props.hasError ? "#e53935" : props.theme.secondary};
      box-shadow: 0 0 0 2px
        ${(props) =>
          props.hasError
            ? "rgba(229, 57, 53, 0.2)"
            : "rgba(55, 214, 174, 0.2)"};
    }
  }

  /* Custom styles for the phone input component */
  .PhoneInputCountry {
    margin-right: 10px;
  }

  .PhoneInputCountrySelect {
    opacity: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  .PhoneInputCountryIcon {
    width: 24px;
    height: 18px;
    border-radius: 3px;
    overflow: hidden;
  }
`;

export const ErrorText = styled.div`
  color: #e53935;
  font-size: 12px;
  margin-top: 6px;
  font-weight: 500;
  display: flex;
  align-items: center;

  &::before {
    content: "⚠";
    margin-right: 6px;
    font-size: 12px;
  }
`;

export const CheckPrivacy = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 1.5rem 0;
  font-weight: 500;

  label {
    margin-left: 12px;
    font-size: 14px;
    line-height: 1.5;
    color: ${(props) => props.theme.textSecondary};
    user-select: none;
    cursor: pointer;
  }

  .privacy-checkbox {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid ${(props) => props.theme.borderColor};
    border-radius: 4px;
    margin: 0;
    cursor: pointer;
    position: relative;
    top: 2px;
    transition: all 0.2s ease;

    &:checked {
      background-color: ${(props) => props.theme.secondary};
      border-color: ${(props) => props.theme.secondary};
    }

    &:checked::after {
      content: "";
      position: absolute;
      top: 2px;
      left: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
`;

export const PrivacyLink = styled.span`
  color: ${(props) => props.theme.secondary};
  cursor: pointer;
  text-decoration: none;
  position: relative;
  transition: all 0.2s ease;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -1px;
    left: 0;
    background-color: ${(props) => props.theme.secondary};
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.secondary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.secondaryHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(55, 214, 174, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    background-color: #bfbfbf;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &:focus {
    outline: none;
    animation: ${pulse} 1.5s infinite;
  }
`;

export const StyledSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner-border {
    width: 1.5rem;
    height: 1.5rem;
    border-width: 0.2em;
  }
`;

export const HaveAccount = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-weight: 500;
  color: ${(props) => props.theme.textSecondary};
  font-size: 14px;

  a {
    color: ${(props) => props.theme.secondary};
    text-decoration: none;
    font-weight: 600;
    margin-left: 5px;
    transition: all 0.2s ease;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: -1px;
      left: 0;
      background-color: ${(props) => props.theme.secondary};
      transform: scaleX(0);
      transform-origin: bottom right;
      transition: transform 0.3s ease;
    }

    &:hover:after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
`;

export const FormErrorMessage = styled.div`
  background-color: rgba(239, 83, 80, 0.1);
  color: #e53935;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 10px;
  width: 100%;
  border-left: 3px solid #e53935;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const ImageSection = styled.div`
  flex: 1.2;
  background: url("/src/assets/images/work-08.jpg") no-repeat center center;
  background-size: cover;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      rgba(40, 37, 96, 0.7),
      rgba(55, 214, 174, 0.4)
    );
  }

  @media (max-width: 991px) {
    display: none;
  }
`;
