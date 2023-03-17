import React from "react";
import { Reset } from "styled-reset";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
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
      <Reset />
      <Header />
      <Carousel />
      <ShortcutCard />
      <Footer />
    </Container>
  );
};

export default Main;
