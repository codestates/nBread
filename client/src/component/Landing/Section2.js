import React, { useEffect, useState } from 'react'
import styled, {keyframes} from 'styled-components';
import MapImg from './img/map.png';
import Chicken from './img/1.png';
import Pizza from './img/2.png';
import Tteokbokki from './img/3.png';
import JapaneseFood from './img/4.png';
import Fastfood from './img/5.png';
import LunchBox from './img/6.png';
import Jajangmyeon from './img/7.png';
import Pasta from './img/8.png';
import Bossam from './img/9.png';
import Dessert from './img/10.png';
import KoreanFood from './img/11.png';
import Asianfood from './img/12.png';
import Ramen from './img/13.png';
import Curry from './img/14.png';
import Steak from './img/15.png';
import Udon from './img/16.png';
import Hotpot from './img/17.png';
import Shrimp from './img/18.png';
import Ice from './img/19.png';
import Ricebowl from './img/20.png';
import Fried from './img/21.png';
import Champon from './img/22.png';
import Rib from './img/23.png';
import Takoyaki from './img/24.png';


function Section2() {
  const Foodlist = [
    {image : Chicken},
    {image : Pizza},
    {image : Tteokbokki},
    {image : JapaneseFood},
    {image : Fastfood},
    {image : LunchBox},
    {image : Jajangmyeon},
    {image : Pasta},
    {image : Bossam},
    {image : Dessert},
    {image : KoreanFood},
    {image : Asianfood},
    {image : Ramen},
    {image : Curry},
    {image : Steak},
    {image : Udon},
    {image : Hotpot},
    {image : Shrimp},
    {image : Ice},
    {image : Ricebowl},
    {image : Fried},
    {image : Champon},
    {image : Rib},
    {image : Takoyaki}
  ];
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    
  });
  

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
      </Wrapper>
      <FoodDiv>
      <FoodImgDiv>
        {Foodlist.map(el => <Img src={el.image} />)}
      </FoodImgDiv>
      </FoodDiv>


      
    
    </div>
  );
}

export default Section2;

const slideUp = keyframes`
  from {
      transform: translateX(100%);
  }
  to {
      transform: translateX(-100%);
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

export const FoodDiv = styled.div`
  background-color: #D5B483;
`;

export const ImageDiv = styled.div`
  width: 40%;
`;

export const FoodImgDiv = styled.div`
  background-color: #D5B483;
  width: 100%;
  height:100% ;
  animation-duration: 25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
  
`;

export const Img = styled.img`
  width: 80px;
  margin-left: 30px;
`;