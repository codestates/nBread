import React from 'react';
import styled from 'styled-components';

function Section1() {
  return (
    <div>
      <Wrapper>
      <TextDiv>
      <Text>
      음식값보다 비싼 배달비 ! 
      </Text>
      <Text>
      부담되지 않으셨나요?
      </Text>
      <Text>
      우리 함께 N빵 해봐요!
      </Text>
      <GoButton>시작하기</GoButton>
      </TextDiv>
      </Wrapper>
    </div>
  );
}

export default Section1;



export const Wrapper = styled.div`
  border-bottom: 1px solid ;
  padding-top: 75px;
  height: 100vh;
  padding: 0 20px;
  align-items: center;
  display: flex;
  
`;

export const TextDiv = styled.div`
  
`;


export const Text = styled.div`
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 5px;
`;

export const GoButton = styled.button`
  width: 200px;
  font-size: 36px;
  padding: 10px;
  border-radius: 20px;
  
`;


