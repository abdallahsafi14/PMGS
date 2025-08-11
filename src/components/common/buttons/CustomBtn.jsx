import i18next from "i18next";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import styled from "styled-components";
const Styles = styled.div`
  button {
    text-transform: capitalize;
    height: 100%;
    width: ${({ width }) => width && width};
    background: ${({ firstColor, secondColor, bgColor }) =>
      firstColor && secondColor
        ? `linear-gradient(${firstColor}, ${secondColor})`
        : bgColor
        ? bgColor
        : `linear-gradient(var(--main-color), var(--main-color))`};
    color: ${({ textColor }) => (textColor ? textColor : "white")};
    padding-top: ${({ paddingTop, isAr }) =>
      paddingTop ? paddingTop : isAr ? "0.3rem" : "0.5rem"};
    padding-bottom: ${({ paddingBottom, isAr }) =>
      paddingBottom ? paddingBottom : isAr ? "0.5rem" : "0.3rem"};
    padding-left: 1rem;
    padding-right: 1rem;
    border: 1px solid
      ${({ borderColor }) => (borderColor ? borderColor : "var(--main-color)")};
    border-radius: ${({ borderRadius }) =>
      borderRadius ? borderRadius : "7px !important"};
    font-size: ${({ fontSize }) => (fontSize ? fontSize : "16px")};
    &:disabled,
    &[disabled] {
      border-color: var(--main-color);
      filter: brightness(.8);
    }
  }
  button:hover {
    background: ${({ firstColor, secondColor, bgColor }) =>
      firstColor && secondColor
        ? `linear-gradient(${firstColor}, ${secondColor})`
        : bgColor
        ? bgColor
        : `linear-gradient(var(--main-color), var(--main-color))`};
    color: ${({ textColor }) => (textColor ? textColor : "white")};
    border: 1px solid
      ${({ borderColor }) => (borderColor ? borderColor : "var(--main-color)")};
    transition: all 0.3s cubic-bezier(0.4, 0, 1, 1) 0s;
    filter: brightness(0.85);
  }
  /* ---- MOBILE ---- */
  /* @media (max-width: 576px) {
    button {
      background-color: ${(props) => (props.color ? props.color : "#000")};
      color: ${(props) => (props.textColor ? props.textColor : "white")};
      font-size: 0.7rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-left: 1rem;
      padding-right: 1rem;
      border: 1px solid ${(props) => (props.color ? props.color : "#000")};
    }
  } */
`;
const CustomBtn = (props) => {
  const {
    text,
    // button type
    onClickFn,
    link,
    isExternal,
    id,
    // button props
    isDisabled,
    type,
    // design props
    width,
    firstColor,
    secondColor,
    bgColor,
    textColor,
    borderColor,
    paddingTop,
    paddingBottom,
    fontSize,
    borderRadius,
  } = props;

  const isAr = i18next.language === "ar";

  return (
    <Styles
      firstColor={firstColor}
      secondColor={secondColor}
      textColor={textColor}
      borderColor={borderColor}
      width={width}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      fontSize={fontSize}
      bgColor={bgColor}
      borderRadius={borderRadius}
      isAr={isAr}
    >
      {link ? (
        isExternal ? (
          <a href={link} target={"_blank"}>
            <Button>{text}</Button>
          </a>
        ) : (
          <Link id={id} to={link}>
            <Button>{text}</Button>
          </Link>
        )
      ) : (
        <Button id={id} onClick={onClickFn} disabled={isDisabled} type={type}>
          {text}
        </Button>
      )}
    </Styles>
  );
};

export default CustomBtn;
