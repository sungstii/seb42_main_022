import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import ShortcutCard from "../components/ShortcutCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: auto;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 0px 60px 0px;
`;
const MiddleText = styled.div`
  font-size: 40px;
  font-weight: 600;
  color: #646464;
  margin: 0px 0px 20px 0px;
`;

const Main = () => {
  return (
    <Container>
      {/* <Header /> */}
      <Carousel />
      <TextContainer>
        <MiddleText>탄소배출감소를 위해 커뮤니티에서 활동하고</MiddleText>
        <MiddleText>친환경 물품들을 사용해 보세요</MiddleText>
      </TextContainer>
      <ShortcutCard />
      <Footer />
    </Container>
  );
};

export default Main;
