import React from "react";
import styled, { keyframes } from "styled-components";
import ChattImg from "./img/nBreadChatt.png";
import { Slide, Zoom } from "react-awesome-reveal";
import Takoyaki from "./img/24.png";

function Section3() {
  return (
    <div>
      <Wrapper>
        <TextDiv>
          <Zoom triggerOnce={false} duration={1500}>
            <Text>채팅방에서 정산한 뒤</Text>
            <Text>모집자가 배달음식 주문</Text>
            {/* <FoodImgDiv>
            <Img src={Takoyaki} />
          </FoodImgDiv> */}
          </Zoom>
        </TextDiv>
        {/* <Div> */}
        <ImageDiv>
          <Slide triggerOnce={false} direction={"right"} duration={1500}>
            <ChattImage src={ChattImg} alt="banner" />
          </Slide>
        </ImageDiv>
        {/* </Div> */}
      </Wrapper>
    </div>
  );
}

export default Section3;

const slideUp = keyframes`
  0% {
      transform: translateX(0%);
  }
  10% {
      transform: translateX(10%);
      transform: translateY(10%);
  }
  20% {
      transform: translateX(20%);
      transform: translateY(20%);
  }
  50% {
      transform: translateX(50%);
     
  }
  75% {
      transform: translateX(75%);
    
  }
  100% {
      transform: translateX(100%);
      
  }
`;

export const Wrapper = styled.div`
  background-color: #b51d29;
  /* border-bottom: 1px solid; */
  padding-top: 75px;
  height: 100vh;
  padding: 0 20px;
  align-items: center;
  display: flex;
  @media (max-width: 710px) {
    display: block;
  }
  @media (max-width: 576px) {
    display: block;
  }
  @media (max-width: 400px) {
    display: block;
  }
`;

export const TextDiv = styled.div`
  margin-left: 20%;
  @media (max-width: 710px) {
    margin-left: -100px;
  }
  @media (max-width: 576px) {
    margin-left: 17%;
  }
  @media (max-width: 400px) {
    margin-left: 14%;
  }
`;

export const Text = styled.div`
  color: #ffffff;
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 5px;
  @media (max-width: 710px) {
    font-size: 3rem;
  }
  @media (max-width: 576px) {
    font-size: 1.7rem;
    padding-top: 10px;
  }
  @media (max-width: 400px) {
    font-size: 1.7rem;
    padding-top: 10px;
  }
`;

export const ImageDiv = styled.div`
  @media (max-width: 710px) {
  }
  @media (max-width: 576px) {
  }
  @media (max-width: 400px) {
  }
`;

export const ChattImage = styled.img`
  margin-left: 180px;
  @media (max-width: 1100px) {
    margin-left: 10px;
  }
  @media (max-width: 770px) {
    margin-left: 10px;
    display: block;
  }
  @media (max-width: 576px) {
    margin-left: 2px;
    display: block;
  }
  @media (max-width: 400px) {
    margin-left: 7px;
    width: 85vw;
  }
`;

export const FoodImgDiv = styled.div`
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
`;

export const Img = styled.img`
  position: relative;
`;

export const Div = styled.div``;
