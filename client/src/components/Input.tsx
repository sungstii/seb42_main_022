import React from "react";
import styled from "styled-components";

type Props = {
  type: string;
  id: string;
  placeholder: string;
  label: string;
};

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

function Input({ type, id, placeholder, label }: Props) {
  return (
    <InputContainer>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputForm type={type} id={id} placeholder={placeholder} />
    </InputContainer>
  );
}

export default Input;
