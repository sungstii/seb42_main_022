import React from "react";
import Trees from "../image/trees.png";
import Cow from "../image/cow.png";
import Earth from "../image/earth.png";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import arrowfront from "../icon/arrowforward.svg";
import arrowback from "../icon/arrowback.svg";

const Container = styled.div`
  width: 100%;
  /* overflow: hidden; */
  margin: 0 0 0;
  @media screen and (max-width: 1200px) {
    height: 100%;
  }
`;
const SliderContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 480px;
  display: flex;
  @media screen and (max-width: 1200px) {
    height: 100%;
  }
`;
const Img = styled.img`
  display: flex;

  align-items: flex-start;

  width: 100%;
  height: 480px;
  object-fit: cover;
  @media screen and (max-width: 1200px) {
    object-fit: cover;
    width: 100%;

    height: 100%;
  }
`;
const Controller = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  bottom: 50px;
  justify-content: center;
  @media screen and (max-width: 1200px) {
    bottom: 40px;
  }
  @media screen and (max-width: 819px) {
    bottom: 30px;
  }
  @media screen and (max-width: 768px) {
    bottom: 20px;
  }
`;
const CarouselBack = styled.img`
  position: relative;
  z-index: 1;
  cursor: pointer;
  width: 50px;
  height: 50px;
  @media screen and (max-width: 1200px) {
    width: 40px;
    height: 40px;
  }
  @media screen and (max-width: 819px) {
    width: 30px;
    height: 30px;
  }
  @media screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;
const CarouselFront = styled.img`
  position: relative;
  z-index: 1;
  cursor: pointer;
  padding: 0px 0px 0px 10px;
  width: 50px;
  height: 50px;
  @media screen and (max-width: 1200px) {
    width: 40px;
    height: 40px;
  }
  @media screen and (max-width: 819px) {
    width: 30px;
    height: 30px;
  }
  @media screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;
const InputContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  cursor: pointer;
  appearance: none;
  background-color: ${(props) =>
    props.checked === true
      ? "rgba(88, 84, 84, 0.55)"
      : "rgba(177, 166, 166, 0.55)"};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  @media screen and (max-width: 1200px) {
    width: 15px;
    height: 15px;
  }
  @media screen and (max-width: 819px) {
    width: 12px;
    height: 12px;
  }
  @media screen and (max-width: 768px) {
    width: 10px;
    height: 10px;
  }
`;

function Carousel() {
  const TOTAL_SLIDES = 2;
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  const handle = (e: number) => {
    setCurrentSlide(e);
  };
  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    }
  }, [currentSlide]);
  useEffect(() => {
    const timer = setInterval(() => {
      // console.log(currentSlide);
      nextSlide();
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <>
      <Container>
        <SliderContainer ref={slideRef}>
          <Img src={Earth} />
          <Img src={Trees} />
          <Img src={Cow} />
        </SliderContainer>
        <Controller>
          <CarouselBack src={arrowback} onClick={prevSlide} />
          <InputContainer>
            <Input
              onClick={(e) => handle(0)}
              type="radio"
              checked={currentSlide === 0 ? true : false}
              name="slider"
              id="slider1"
            />
            <Input
              onClick={(e) => handle(1)}
              type="radio"
              checked={currentSlide === 1 ? true : false}
              name="slider"
              id="slider2"
            />
            <Input
              onClick={(e) => handle(2)}
              type="radio"
              checked={currentSlide === 2 ? true : false}
              name="slider"
              id="slider3"
            />
        </InputContainer>
        <CarouselFront src={arrowfront} onClick={nextSlide} />
      </Controller>
      </Container>
      
    </>
  );
}

export default Carousel;
