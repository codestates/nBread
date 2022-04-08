import React from 'react';
import styled, {keyframes} from 'styled-components';
import waffles from './img/waffles.jpg'
import { useHistory } from 'react-router-dom'

function Section1() {
  const history = useHistory()

  

  const handleMain = () => {
    history.push('/')
}

  return (
    <div>
      <Div>
      <Wrapper>
      <TextDiv>
      <Text data-text="음식값보다 비싼 배달비 ! ">
      음식값보다 비싼 배달비 ! 
      </Text>
      <Text>
      부담되지 않으셨나요?
      </Text>
      <Text>
      우리 함께 N빵 해봐요!
      </Text>
      <GoButton onClick={handleMain}>바로시작</GoButton>
      </TextDiv>
      </Wrapper>
      </Div>
    </div>
  );
}

export default Section1;



export const Div = styled.div`
width: 100vw;
height: 100%;
background-image: url(${waffles});
background-repeat: no-repeat;
background-size: cover;
`

export const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.41);
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
  position: relative;
  
`;

export const GoButton = styled.button`
  margin-top: 20px;
  width: 180px;
  height: 60px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 50px;
  //background-color: #7C0811;
  background-color: #D9C6AC;
  color: #7A5728;
  //7C0811  B51D29 
  //color: #D9C6AC;
  border: 0;
`;


