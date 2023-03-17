import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoImg } from "../icon/main_logo.svg";
import { ReactComponent as ProfileIcon } from "../icon/account_circle.svg";
import styled from "styled-components";

const HeaderContainer = styled.div`
  position: sticky;
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
const ProfileLink = styled(Link)``;

const Header = () => {
  return (
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
        <ProfileLink to="./community">
          <ProfileIcon width="35px" height="35px" />
        </ProfileLink>
      </ProfileWrapper>
    </HeaderContainer>
  );
};

export default Header;
