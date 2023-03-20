import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 60px;
  border: 1px solid black;
`;
const InputLabel = styled.label`
  display: flex;
  align-items: center;
  width: 92%;
  height: 30%;
  border: 1px solid black;
`;
const InputForm = styled.input`
  padding: 8px;
  width: 90%;
  height: 25%;
  border: 1px solid gray;
  border-radius: 16px;
  box-shadow: 2px 2px gray;
`;

function Input() {
  return (
    <InputContainer>
      <InputLabel htmlFor="inputName">이름</InputLabel>
      <InputForm type="text" id="inputName" placeholder="이름을 입력하세요" />
    </InputContainer>
  );
}

export default Input;
