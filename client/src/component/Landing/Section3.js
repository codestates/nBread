import React from 'react';
import styled from 'styled-components';
import ChattImg from './img/chatt.png';

function Section3() {
  return (
    <div>
      <Wrapper>
      <TextDiv>
      <Text>
      채팅방에서 정산한 뒤 
      </Text>
      <Text>
      모집자가 배달음식 주문
      </Text>
      </TextDiv>
      <ImageDiv>
        <img src={ChattImg} alt="banner" />
      </ImageDiv>
      </Wrapper>
    </div>
  );
}

export default Section3;

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
  
`;