import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 821px;
  background: linear-gradient(#52797a, #365b68);
`;

const SignIn = () => {
  return (
    <InputContainer>
      <LeftContainer></LeftContainer>
      <RightContainer></RightContainer>
    </InputContainer>
  );
};

export default SignIn;
