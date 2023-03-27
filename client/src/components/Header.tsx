import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoImg } from "../icon/main_logo.svg";
import { ReactComponent as ProfileIcon } from "../icon/account_circle.svg";
import styled, { css } from "styled-components";
import useHideHeader from "../utils/useHideHeader";
import useDetectClose from "../utils/useDetectClose";

const Container = styled.div`
  width: 100%;
  height: 70px;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
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
  position: relative;
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
const Menu = styled.div<HTMLDivElement>`
  background: white;
  position: absolute;
  top: 48px;
  left: 5%;
  width: 110px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 5%;
    `};
`;

const Ul = styled.ul`
  & > li:last-of-type {
    margin-bottom: 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  display: flex;
  flex-direction: column;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  &:hover {
    background-color: #e6ffff;
  }
`;

const LinkWrapper = styled(Link)`
  font-size: 16px;
  text-decoration: none;
  color: black;
`;

const Header = () => {
  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);
  if (useHideHeader()) return null;
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
            onClick={myPageHandler}
            ref={myPageRef}
          />
          <Menu<any> isDropped={myPageIsOpen}>
            <Ul>
              <Li>
                <LinkWrapper to="./signin">
                  &nbsp;&nbsp;&nbsp;로그인
                </LinkWrapper>
              </Li>
              <Li>
                <LinkWrapper to="./signup">
                  &nbsp;&nbsp;&nbsp;회원가입
                </LinkWrapper>
              </Li>
            </Ul>
          </Menu>
        </ProfileWrapper>
      </HeaderContainer>
      {/* <ModalContainer>
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
      </ModalContainer> */}
    </Container>
  );
};

export default Header;
