import React from "react";
import styled from "styled-components";

// import GlobalStyles from "./GlobalStyles";

import ImageSlider from "./ImageSlider";
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
const Application = () => {
  return (
    <>
      {/* <GlobalStyles /> */}
      <div>
        <ImageSlider images={[Chicken,Pizza,Tteokbokki,JapaneseFood,Fastfood,
          LunchBox,Jajangmyeon,Pasta,Bossam,Dessert,KoreanFood,Asianfood,Ramen,
          Curry,Steak,Udon,Hotpot,Shrimp,Ice,Ricebowl,Fried,Champon,Rib,Takoyaki]}>
      
        </ImageSlider>
      </div>
    </>
  );
};

export default Application;
