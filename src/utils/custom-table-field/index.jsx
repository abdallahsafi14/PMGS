import React from "react";
import { Field } from "formik";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import { InputWrapper } from "./Styles";

function TableInputField({
  type,
  placeholder,
  name,
  icon,
  value,
  onChange,
  onClick,
  styles,
}) {
  return (
    <InputWrapper>
      {icon ? (
        <button className="tableInput" type={type} onClick={onClick || undefined}>
          <i className={icon}>{icon}</i>
        </button>
      ) : type === "date" ? (
        <DatePicker
          selected={value}
          onChange={onChange} 
          placeholderText={placeholder}
          className="tableInput"
          style={styles}
        />
      ) : (
        <Field
          style={styles}
          type={type}
          placeholder={placeholder}
          name={name}
          className={`tableInput ${type === "number" ? "no-arrows" : ""}`}
        />
      )}
    </InputWrapper>
  );
}

export default TableInputField;
