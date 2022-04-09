import React, { useState, useEffect } from "react";
import styled, {keyframes} from 'styled-components';

const ImageSlider = ({
  images = [],
  autoPlayTime = 1000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  function nextSlide(slideIndex = currentSlide + 1) {
    const newSlideIndex = slideIndex >= images.length ? 0 : slideIndex;

    setCurrentSlide(newSlideIndex);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, autoPlayTime);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <FoodDiv>
      <FoodImgDiv>
    <Wrapper>
      {images.map((imageUrl, index) => (
        <Img
          key={index}
          style={{
            backgroundImage: `url(${imageUrl})`,
            // marginLeft: index === 0 ? `-${currentSlide * 10}%` : undefined,
          }}
        ></Img>
      ))}
    </Wrapper>
    </FoodImgDiv>
    </FoodDiv>
  );
};
const slideUp = keyframes`
  from {
      transform: translateX(100%);
  }
  to {
      transform: translateX(-100%);
  }
`
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  
  /* position: relative; */
`;
export const FoodDiv = styled.div`
  background-color: #D5B483;
  
`;

export const FoodImgDiv = styled.div`
  background-color: #D5B483;
  animation-duration: 25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
  
`;

const Img = styled.img`
  height: 100px;
  width: 100px;
  flex-shrink: 0;
  /* object-fit: cover;
  white-space: pre-wrap; */
  transition: 0.5s all ease-in-out;
  width: 80px;
  margin-left: 30px;
  flex-wrap: nowrap;
  overflow-x: hidden;
`;

export default ImageSlider;
