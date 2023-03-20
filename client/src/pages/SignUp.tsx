import React from "react";
import styled from "styled-components";
import { ReactComponent as LogoImg } from "../icon/main_logo.svg";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { object, string, number, date, InferType } from "yup";

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
  // 이름은 공백이 아니여야 합니다
  email: string;
  // 형식 제한 없음
  phone: string;
  // 휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다
  password: string;
  // 패스워드를 입력해 주세요(최소 8자 최대 12자)
}

const signUpSchema = object({
  name: string().required("이름을 입력해주세요"),
  email: string().email().required("이메일을 입력해주세요"),
  phone: string()
    .test(
      "phone",
      "010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다",
      (val: any) => /^010-\d{3,4}-\d{4}$/.test(val),
    )
    .required("전화번호를 입력해주세요"),
  password: string()
    .test("pw", "숫자 + 영문자 8자 이상 12자 이하입니다", (val: any) =>
      /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,12}$/.test(val),
    )
    .required("비밀번호를 입력해주세요"),
});

const SignUp = () => {
  const navigate = useNavigate();
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
            validationSchema={signUpSchema}
            onSubmit={(values) => {
              alert(JSON.stringify(values));
              axios
                .post("http://3.39.150.26:8080/members", values)
                .then((res) => {
                  alert("회원가입이 완료되었습니다.");
                  navigate("../");
                })
                .catch((e) => {
                  console.log("회원가입 실패", e.response);
                });
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
