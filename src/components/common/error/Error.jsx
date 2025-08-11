import React from "react";
import styled from "styled-components";
const Styles = styled.div`
  background-color: ${(props) => props.backgroundColor};
  .main-container {
    height: ${(props) => props.height || "calc(100vh - 20vh)"};
    padding-top: ${(props) => props.paddingTop};
    padding-bottom: ${(props) => props.paddingBottom};
    color: ${(props) => (props.color ? props.color : "var(--secondary-color)")};
    font-size: ${(props) => (props.fontSize ? props.fontSize : "1.3rem")};
  }
`;
const Error = (props) => {
  const {
    color,
    backgroundColor,
    height,
    paddingTop,
    paddingBottom,
    message,
    notCenter,
    fontSize,
  } = props;
  return (
    <Styles
      backgroundColor={backgroundColor}
      height={height}
      paddingTop={paddingTop}
      color={color}
      fontSize={fontSize}
      paddingBottom={paddingBottom}
    >
      <div className={`error main-container ${!notCenter && "text-center"}`}>
        {message}
      </div>
    </Styles>
  );
};

export default Error;
