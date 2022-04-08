import React from 'react';
import styled from 'styled-components';



function Section4() {
  return (
    <div>
      <Wrapper>
      <TextDiv>
      <Text>
      음식값보다 비싼 배달비 ! 
      </Text>
      <Text>
      우리 함께 N빵 해봐요!
      </Text>
      <GoButton>시작하기</GoButton>
      </TextDiv>
      </Wrapper>

      <Footer>
      </Footer>
    </div>
  );
}
export default Section4;

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


export const Footer = styled.div`
  width: 100%;
  height: 140px;
  background-color: #C4C4C4;
  
`;

export const GoButton = styled.button`
  margin-top: 20px;
  width: 180px;
  height: 60px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 50px;
  background-color: #7C0811;
  color: #D9C6AC;
  border: 0;
`;



