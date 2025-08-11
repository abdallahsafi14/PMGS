import React from "react";
import { Field, ErrorMessage as FormikErrorMessage } from "formik";
import {
  FieldWrapper,
  IconWrapper,
  Label,
  StyledField,
  ErrorMessage,
  EyeIconWrapper,
  FieldContainer,
} from "./Styles";

const CustomField = ({
  label,
  placeholder,
  name,
  icon,
  onClick,
  eyeIcon,
  value,
  type = "text",
  as = "input",
  error,
  ...props
}) => {
  return (
    <FieldContainer>
      <Label htmlFor={name}>{label}</Label>
      <FieldWrapper hasError={!!error}>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledField
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          as={as}
          hasIcon={!!icon}
          hasEyeIcon={!!eyeIcon}
          {...props}
          value={value}
        />
        {eyeIcon && (
          <EyeIconWrapper
            onClick={onClick}
            aria-label={type === "password" ? "Show password" : "Hide password"}
          >
            {eyeIcon}
          </EyeIconWrapper>
        )}
      </FieldWrapper>
      <FormikErrorMessage name={name} component={ErrorMessage} />
    </FieldContainer>
  );
};

export default CustomField;
