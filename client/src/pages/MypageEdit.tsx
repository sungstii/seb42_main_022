import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { object, string, ref } from "yup";
import { Formik } from "formik";
import axios from "axios";
import accountCircle from "../icon/account_circle.svg";

type MypageState = {
  name: string;
  password: string;
  phone: string;
};

interface FormModel {
  // 이름은 공백이 아니여야 합니다.
  name: string;
  /**
   * 휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.
   */
  phone: string;
  /**
   * 영문자와 숫자, !@#$%^&*()_+-=만 사용 가능합니다.
   */
  password: string;
}

const editSchema = object({
  name: string().required("이름을 입력해주세요"),
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

const Container = styled.div`
  display: flex;
  /* width: 100vh;
  height: 100vh; */
  flex-direction: column;
  align-items: center;
  form {
    width: 100%;
  }
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 12px;
  padding: 2px;
  margin-top: 2px;
`;

const RadiusInput = styled.input`
  border-radius: 12px;
  padding: 6px;
`;

const Header = styled.header`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 50px;
  border: 1px solid #f6f6f6;
`;
const Edit_Button = styled.button`
  height: 40px;
  width: 60px;
  margin-right: 30px;
  background: #609966;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border: none;
  cursor: pointer;
  border-radius: 15px;
  span {
    background: transparent;
  }
`;
const Body = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 700px;
  margin: 40px auto;
`;
//공통 사용 컴포넌트
const Head_Component = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-between;
`;
const Head_Left = styled.div`
  display: flex;
  align-items: center;
  height: 90%;
  margin: auto 0;
  font-size: 18px;
  p {
    margin-left: 10px;
    color: red;
  }
`;
const Head_Right = styled.div`
  display: flex;
  align-items: center;
  height: 90%;
  margin: auto 0;
  color: #808080;
  font-size: 13px;
`;

const Input_Component = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  background: #d9d9d9;
  border-radius: 15px;
  input {
    width: 90%;
    height: 70%;
    border: none;
    outline: none;
    background: transparent;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 130px;
`;

const TopItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;
const ItemBox = styled(TopItemBox)`
  margin-top: 50px;
`;

function MypageEdit() {
  const [userdata, setUserdata] = useState<MypageState>({
    name: "",
    password: "",
    phone: "",
  });
  console.log(userdata);
  const token = localStorage.token;
  const memberid = localStorage.memberid;
  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength = 20;
    const input = event.target.value;

    if (input.length > maxLength) {
      setUserdata((prevState) => ({
        ...prevState,
        name: input.slice(0, maxLength),
      }));
    } else {
      setUserdata((prevState) => ({
        ...prevState,
        name: input,
      }));
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength = 12;
    const input = event.target.value;

    if (input.length > maxLength) {
      setUserdata((prevState) => ({
        ...prevState,
        password: input.slice(0, maxLength),
      }));
    } else {
      setUserdata((prevState) => ({
        ...prevState,
        password: input,
      }));
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength = 13;
    const input = event.target.value;

    if (input.length > maxLength) {
      setUserdata((prevState) => ({
        ...prevState,
        phone: input.slice(0, maxLength),
      }));
    } else {
      setUserdata((prevState) => ({
        ...prevState,
        phone: input,
      }));
    }
  };

  // 토큰이 없는경우 보여질 화면
  if (!token) {
    return <div>로그인 해주세요</div>;
  }

  return (
    <Container>
      <Formik<FormModel>
        initialValues={{
          name: "",
          phone: "",
          password: "",
        }}
        validationSchema={editSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const url = `http://3.39.150.26:8080/members/${memberid}`;
          const headers = { Authorization: token };
          const body = {
            phone: values.phone,
            name: values.name,
            password: values.password,
          };

          try {
            const response = await axios.patch(url, body, { headers });
            alert("회원정보가 변경되었습니다.");
            localStorage.removeItem("token");
            localStorage.removeItem("ref");
            localStorage.removeItem("memberid");
            alert("회원정보가 변경되었습니다. 다시 로그인 해 주세요!");
            navigate("../signin");
          } catch (error) {
            console.error("회원정보 변경 실패:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit, values, handleChange, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Header>
              <Edit_Button type="submit">
                <span>완료</span>
              </Edit_Button>
            </Header>
            <Body>
              <Wrapper>
                <ProfileBox>
                  <img
                    src={accountCircle}
                    style={{ width: "120px", height: "120px" }}
                  />
                </ProfileBox>

                <TopItemBox>
                  <Head_Component>
                    <Head_Left>
                      <span>이름</span>
                      <p>*</p>
                    </Head_Left>
                    <Head_Right>{userdata.name.length}/20</Head_Right>
                  </Head_Component>
                  <Input_Component>
                    <input
                      type="text"
                      id="name"
                      placeholder="이름을 입력하세요"
                      value={userdata.name}
                      onChange={(e) => {
                        handleChange(e);
                        handleNameChange(e);
                      }}
                    />
                  </Input_Component>
                  {touched.name && errors.name ? (
                    <ErrorMsg
                      style={{ color: "red", fontSize: "12px", padding: "2px" }}
                    >
                      {errors.name}
                    </ErrorMsg>
                  ) : null}
                </TopItemBox>
                <ItemBox>
                  <Head_Component>
                    <Head_Left>
                      <span>비밀번호</span>
                      <p>*</p>
                    </Head_Left>
                    <Head_Right>{userdata.password.length}/12</Head_Right>
                  </Head_Component>
                  <Input_Component>
                    <input
                      type="password"
                      id="password"
                      placeholder="비밀번호를 입력해주세요."
                      value={userdata.password}
                      onChange={(e) => {
                        handleChange(e);
                        handlePasswordChange(e);
                      }}
                    />
                  </Input_Component>
                  {touched.password && errors.password ? (
                    <ErrorMsg
                      style={{ color: "red", fontSize: "12px", padding: "2px" }}
                    >
                      {errors.password}
                    </ErrorMsg>
                  ) : null}
                </ItemBox>
                <ItemBox>
                  <Head_Component>
                    <Head_Left>
                      <span>전화번호</span>
                    </Head_Left>
                    <Head_Right>{userdata.phone.length}/13</Head_Right>
                  </Head_Component>
                  <Input_Component>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="전화번호를 입력해주세요."
                      value={userdata.phone}
                      onChange={(e) => {
                        handleChange(e);
                        handlePhoneChange(e);
                      }}
                    />
                  </Input_Component>
                  {touched.phone && errors.phone ? (
                    <ErrorMsg
                      style={{ color: "red", fontSize: "12px", padding: "2px" }}
                    >
                      {errors.phone}
                    </ErrorMsg>
                  ) : null}
                </ItemBox>
              </Wrapper>
            </Body>
          </form>
        )}
      </Formik>
    </Container>
  );
}

export default MypageEdit;
