import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoImg } from "../icon/main_logo.svg";
import { ReactComponent as ProfileIcon } from "../icon/account_circle.svg";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 170px;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  width: 100%;
  height: 50px;
  background-color: white;
  border: 1px solid #f6f6f6;
`;
const TapWrapper = styled.div`
  margin: auto;
  flex-grow: 0.5;
`;
const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  flex-grow: 0.4;
`;
const EmptySpace = styled.div`
  flex-grow: 7;
`;
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0.4;
`;
const LogoLink = styled(Link)`
  display: flex;
`;
const HeaderTap = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 18px;
`;
const ModalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
`;
const ModalWrapper = styled.div`
  margin-right: 12px;
  width: 140px;
  height: 80px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
`;
const LoginText = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 30px;
  margin-top: 10px;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: #eaf9f9;
  }
`;
const SignUpText = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: #eaf9f9;
  }
`;
const Header = () => {
  const [modal, setModal] = useState(false);
  return (
    <Container>
      <HeaderContainer>
        <LogoWrapper>
          <LogoLink to="./">
            <LogoImg width="60px" height="60px" />
          </LogoLink>
        </LogoWrapper>
        <EmptySpace style={{ flexGrow: "0.2" }} />
        <TapWrapper>
          <HeaderTap to="./community">녹색활동</HeaderTap>
        </TapWrapper>
        <TapWrapper>
          <HeaderTap to="./community">친환경 물품후기</HeaderTap>
        </TapWrapper>
        <TapWrapper>
          <HeaderTap to="./community">자유게시판</HeaderTap>
        </TapWrapper>
        <TapWrapper>
          <HeaderTap to="./community">세계환경뉴스</HeaderTap>
        </TapWrapper>
        <TapWrapper>
          <HeaderTap to="./community">환경계산기</HeaderTap>
        </TapWrapper>
        <TapWrapper>
          <HeaderTap to="./community">랭킹</HeaderTap>
        </TapWrapper>
        <EmptySpace />
        <ProfileWrapper>
          <ProfileIcon
            width="35px"
            height="35px"
            style={{ cursor: "pointer" }}
            onClick={() => setModal(!modal)}
          />
        </ProfileWrapper>
      </HeaderContainer>
      <ModalContainer>
        {modal ? (
          <ModalWrapper>
            <LoginText to="./signin">&nbsp;&nbsp;&nbsp;로그인</LoginText>
            <SignUpText to="./signup">&nbsp;&nbsp;&nbsp;회원가입</SignUpText>
          </ModalWrapper>
        ) : null}
      </ModalContainer>
    </Container>
  );
};

export default Header;
