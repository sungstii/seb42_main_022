import React from "react";
import styled from "styled-components";
import Input from "../components/Input";
import { ReactComponent as LogoImg } from "../icon/main_logo.svg";

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
  width: 50%;
  height: 821px;
  background: linear-gradient(#52797a, #365b68);
`;
const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  border: 1px solid black;
`;
const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const SignUp = () => {
  return (
    <InputContainer>
      <LeftContainer>
        <LogoContainer>
          <LogoImg width="60px" height="60px" />
        </LogoContainer>
        <FormContainer>
          <h1>지금 Green Circle에 가입하세요</h1>
          <Input
            type="text"
            id="inputName"
            placeholder="이름을 입력해주세요."
            label="이름"
          />
          <Input
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요."
            label="이메일"
          />
        </FormContainer>
      </LeftContainer>
      <RightContainer></RightContainer>
    </InputContainer>
  );
};

export default SignUp;
