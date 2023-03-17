import React from "react";
import { Reset } from "styled-reset";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Carousel from '../components/Carousel';
import ShortcutCard from '../components/ShortcutCard';

const Main = () => {
  return (
    <>
      <Reset />
      <Header />
      <Carousel/>
      <ShortcutCard/>
      <Footer />
    </>
  );
};

export default Main;
