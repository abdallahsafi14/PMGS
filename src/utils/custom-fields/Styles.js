import { Field } from "formik";
import styled, { css, keyframes } from "styled-components";

const focusAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(77, 191, 167, 0.1); }
  70% { box-shadow: 0 0 0 5px rgba(77, 191, 167, 0.1); }
  100% { box-shadow: 0 0 0 0 rgba(77, 191, 167, 0.1); }
`;

const errorShake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

export const FieldWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 6px;

  ${(props) =>
    props.hasError &&
    css`
      animation: ${errorShake} 0.4s ease-in-out;
    `}
`;

export const LabelWrapper = styled.span`
  text-wrap: nowrap;
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${(theme) => theme.text};
  display: block;
  margin-bottom: 4px;
  transition: color 0.2s ease;
`;

export const StyledField = styled(Field)`
  width: 100%;
  height: 50px;
  padding: ${(props) => (props.hasIcon ? "12px 12px 12px 40px" : "12px")};
  padding-right: ${(props) => (props.hasEyeIcon ? "40px" : "12px")};
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  background-color: ${(props) => props.theme.background};
  transition: all 0.3s ease;
  font-family: "Alexandria", sans-serif;
  color: ${(props) => props.theme.text};

  /* &:focus {
    outline: none;
    border-color: ${(props) => props.theme.secondary};
    animation: ${focusAnimation} 0.5s ease-in-out;
    box-shadow: 0 0 0 2px rgba(77, 191, 167, 0.2);
  } */

  &::placeholder {
    color: ${(props) => props.theme.placeholderColor};
    font-size: 14px;
    opacity: 0.8;
  }

  &:hover:not(:focus) {
    border-color: ${(props) => props.theme.borderHoverColor};
  }

  /* Autofill styles */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${(props) => props.theme.text};
    -webkit-box-shadow: 0 0 0px 1000px ${(props) => props.theme.background}
      inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const ErrorMessage = styled.div`
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

  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  font-size: 18px;
  color: ${(props) => props.theme.iconColor};
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
`;

export const EyeIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  font-size: 18px;
  color: ${(props) => props.theme.iconColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  padding: 5px;
  border-radius: 50%;

  &:hover {
    color: ${(props) => props.theme.secondary};
    background-color: rgba(77, 191, 167, 0.1);
  }
`;

export const RememberMe = styled.div`
  margin-left: 8px;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.textSecondary};
  user-select: none;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  cursor: pointer;
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  position: relative;
  margin: 0;
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
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(77, 191, 167, 0.2);
  }
`;

export const PasswordStrengthIndicator = styled.div`
  margin-top: 6px;
  height: 4px;
  border-radius: 2px;
  width: 100%;
  background-color: #e0e0e0;
  overflow: hidden;

  &::before {
    content: "";
    display: block;
    height: 100%;
    width: ${(props) => props.strength || "0%"};
    background-color: ${(props) => {
      if (props.strength < 33) return "#e53935";
      if (props.strength < 66) return "#ffb300";
      return "#4caf50";
    }};
    transition: width 0.3s ease, background-color 0.3s ease;
  }
`;
