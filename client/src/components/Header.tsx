import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as LogoImg } from "../icon/main_logo.svg";
import { ReactComponent as ProfileIcon } from "../icon/account_circle.svg";
import styled from "styled-components";
import HideHeader from "../utils/hideHeader";

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
const MoveLoginPage = styled(Link)`
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
const MoveSignUpPage = styled(Link)`
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
const MoveMyPage = styled(Link)`
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
const LogoutBtn = styled.div`
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
  const navigate = useNavigate();
  const modalWrapperRef = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState<boolean>(false);
  const token = localStorage.token;
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ref");
    navigate("./");
    alert("로그아웃이 완료되었습니다.");
  };
  const handleClickOutside = (e: any) => {
    if (
      modalWrapperRef.current &&
      modalWrapperRef &&
      !modalWrapperRef.current.contains(e.target)
    ) {
      console.log("false");
      console.log(e.target);
      setModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [modalWrapperRef]);
  if (HideHeader()) return null;
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
          <HeaderTap to="./greenact">녹색활동</HeaderTap>
        </TapWrapper>
        <TapWrapper>
          <HeaderTap to="./review">친환경 물품후기</HeaderTap>
        </TapWrapper>
        <TapWrapper>
          <HeaderTap to="./community">자유게시판</HeaderTap>
        </TapWrapper>
        <TapWrapper>
          <HeaderTap to="./news">세계환경뉴스</HeaderTap>
        </TapWrapper>
        <TapWrapper>
          <HeaderTap to="./greencal">환경계산기</HeaderTap>
        </TapWrapper>
        <TapWrapper>
          <HeaderTap to="./ranking">랭킹</HeaderTap>
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
        {token ? (
          modal ? (
            <ModalWrapper ref={modalWrapperRef}>
              <MoveMyPage to="./mypage">
                &nbsp;&nbsp;&nbsp;마이페이지
              </MoveMyPage>
              <LogoutBtn onClick={logout}>&nbsp;&nbsp;&nbsp;로그아웃</LogoutBtn>
            </ModalWrapper>
          ) : null
        ) : modal ? (
          <ModalWrapper ref={modalWrapperRef}>
            <MoveLoginPage to="./signin">
              &nbsp;&nbsp;&nbsp;로그인
            </MoveLoginPage>
            <MoveSignUpPage to="./signup">
              &nbsp;&nbsp;&nbsp;회원가입
            </MoveSignUpPage>
          </ModalWrapper>
        ) : null}
      </ModalContainer>
    </Container>
  );
};

export default Header;
