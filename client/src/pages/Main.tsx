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

const Main = () => {
  return (
    <Container>
      {/* <Header /> */}
      <Carousel />
      <ShortcutCard />
      <Footer />
    </Container>
  );
};

export default Main;
