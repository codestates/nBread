import React from 'react';
import styled from 'styled-components';
import MapImg from './img/map.png';

function Section2() {
  return (
    <div>
      <Wrapper>
      <TextDiv>
      <Text>
      주문하고 싶은 메뉴가 일치한다면 
      </Text>
      <Text>
      신청하기 버튼을 눌러서 참여
      </Text>
      </TextDiv>
      <ImageDiv>
        <img src={MapImg} alt="banner" />
      </ImageDiv>
      </Wrapper>
    </div>
  );
}

export default Section2;

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

export const ImageDiv = styled.div`
  
`;