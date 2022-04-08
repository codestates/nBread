import React from 'react';
import styled, {keyframes} from 'styled-components';
import MapImg from './img/map.png';
import Jajangmyeon from './img/jajangmyeon.png'

function Section2() {
  
  return (
    <div>
      <Wrapper>
      <TextDiv>
      <Text>
      주문 메뉴가 일치한다면 
      </Text>
      <Text>
      신청하기 버튼으로 참여
      </Text>
      </TextDiv>
      <ImageDiv>
        <img src={MapImg} alt="banner" />
      </ImageDiv>
      <FoodImgDiv>
        <img src={Jajangmyeon}/>
      </FoodImgDiv>
      </Wrapper>
    </div>
  );
}

export default Section2;

const slideUp = keyframes`
  from {
      transform: translateX(200px);
  }
`

export const Wrapper = styled.div`
  background-color: #D5B483;
  border-bottom: 1px solid ;
  padding-top: 75px;
  height: 100vh;
  padding: 0 20px;
  align-items: center;
  display: flex;
  
`;

export const TextDiv = styled.div`
  margin-left: 20%;
`;

export const Text = styled.div`
  color: #ffffff;
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 5px;
`;

export const ImageDiv = styled.div`
  width: 40%;
`;

export const FoodImgDiv = styled.div`
  animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-name: ${slideUp};
    animation-fill-mode: forwards;
`;

