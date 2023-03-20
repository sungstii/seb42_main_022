import React from "react";
import styled from "styled-components";
import { ReactComponent as LogoImg } from "../icon/main_logo.svg";
import { Formik } from "formik";

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

interface FormModel {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const SignUp = () => {
  return (
    <InputContainer>
      <LeftContainer>
        <LogoContainer>
          <LogoImg width="60px" height="60px" />
        </LogoContainer>
        <FormContainer>
          <Formik<FormModel>
            initialValues={{
              name: "",
              email: "",
              phone: "",
              password: "",
            }}
            onSubmit={(values) => {
              alert(JSON.stringify(values));
            }}
          >
            {({ handleSubmit, values, handleChange }) => (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="name">이름</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="이름을 입력해주세요."
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="email">이메일</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="이메일을 입력해주세요."
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="phone">전화번호</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="전화번호를 입력해주세요."
                    value={values.phone}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="password">비밀번호</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력해주세요."
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit">회원가입</button>
              </form>
            )}
          </Formik>
        </FormContainer>
      </LeftContainer>
      <RightContainer>
        <span style={{ fontSize: "60px", color: "white" }}>Go green,</span>
        <span style={{ fontSize: "60px", color: "white" }}>
          make a difference
        </span>
        <LogoImg width="380px" height="380px" />
      </RightContainer>
    </InputContainer>
  );
};

export default SignUp;
