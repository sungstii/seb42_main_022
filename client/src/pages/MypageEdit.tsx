import React from "react";
import styled from "styled-components";
import { useState } from "react";

type MypageState = {
  name: string;
  password: string;
  intro: string;
};
const Container = styled.div`
  display: flex;
  /* width: 100vh;
  height: 100vh; */
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 50px;
  border: 1px solid #f6f6f6;
`;
const Edit_Button = styled.div`
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
  textarea {
    width: 90%;
    height: 80%;
    border: none;
    outline: none;
    background: transparent;
    resize: none;
  }
`;

const Profile_wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 130px;
  border: 0.5px solid red;
`;
const Profile_box = styled.div``;
const Name_wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;
const Pass_wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  margin-top: 50px;
`;
const Intro_wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  margin-top: 50px;
  ${Input_Component} {
    min-height: 150px;
  }
`;

function MypageEdit() {
  const [state, setState] = useState<MypageState>({
    name: "",
    password: "",
    intro: "",
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength = 20;
    const input = event.target.value;

    if (input.length > maxLength) {
      setState((prevState) => ({
        ...prevState,
        name: input.slice(0, maxLength),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        name: input,
      }));
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength = 20;
    const input = event.target.value;

    if (input.length > maxLength) {
      setState((prevState) => ({
        ...prevState,
        password: input.slice(0, maxLength),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        password: input,
      }));
    }
  };

  const handleIntroChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const maxLength = 100;
    const input = event.target.value;

    if (input.length > maxLength) {
      setState((prevState) => ({
        ...prevState,
        intro: input.slice(0, maxLength),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        intro: input,
      }));
    }
  };
  return (
    <Container>
      <Header>
        <Edit_Button>
          <span>완료</span>
        </Edit_Button>
      </Header>
      <Body>
        <Wrapper>
          <Profile_wrapper></Profile_wrapper>
          <Name_wrapper>
            <Head_Component>
              <Head_Left>
                <span>이름</span>
                <p>*</p>
              </Head_Left>
              <Head_Right>{state.name.length}/20</Head_Right>
            </Head_Component>
            <Input_Component>
              <input
                placeholder="이름을 입력하세요"
                value={state.name}
                onChange={handleNameChange}
              />
            </Input_Component>
          </Name_wrapper>
          <Pass_wrapper>
            <Head_Component>
              <Head_Left>
                <span>비밀번호</span>
                <p>*</p>
              </Head_Left>
              <Head_Right>{state.password.length}/20</Head_Right>
            </Head_Component>
            <Input_Component>
              <input
                placeholder="비밀번호를 입력하세요"
                value={state.password}
                onChange={handlePasswordChange}
              />
            </Input_Component>
          </Pass_wrapper>
          <Intro_wrapper>
            <Head_Component>
              <Head_Left>
                <span>자기소개</span>
              </Head_Left>
              <Head_Right>{state.intro.length}/100</Head_Right>
            </Head_Component>
            <Input_Component>
              <textarea
                placeholder="나를 소개해주세요"
                value={state.intro}
                onChange={handleIntroChange}
              />
            </Input_Component>
          </Intro_wrapper>
        </Wrapper>
      </Body>
    </Container>
  );
}

export default MypageEdit;
