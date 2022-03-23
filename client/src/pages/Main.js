import React from 'react'
import Navbar from '../component/Navbar'
import styled from 'styled-components'

function Main() {
  const Wrapper = styled.div`
    /* display: flex; */
    overflow:hidden; 
  `;
  const PostListDiv = styled.div`
    float: left;
    background-color: #EEEEEE;
    width: 460px;
    height: calc(100vh - 120px);
  `;

  const MapDiv = styled.div`
    float: left;
    margin-right: -460px;
    padding-right: 460px;
    background-color: #B7CADB;
    width: 100%;
    height: calc(100vh - 120px);
  `;

  const WritingButton = styled.button`
    position: fixed;
    bottom: 160px;
    right: 16px;
    border-radius: 100%;
    border: none;
    width: 90px;
    height: 90px;
    background-color: #D4AA71;
    color: white;
  `;

  const ChattingButton = styled.button`
    position: fixed;
    bottom: 60px;
    right: 16px;
    border-radius: 100%;
    border: none;
    width: 90px;
    height: 90px;
    background-color: #B51D29;
    color: white;
  `;

  return (
    <div>
      <Navbar/>
      <Wrapper>
        <PostListDiv>
          목록
        </PostListDiv>
        <MapDiv>
          http://uxuiz.cafe24.com/wp/archives/4972
          기본적으로 float속성의 특성상 첫번째 고정폭 박스만 float시키고 가변폭은 
          float를 하지 않은 채로 자동으로 폭을 잡도록 하는 것이다. 
          그러나 박스 수평정렬을 위해 우측 박스에도 float를 주게 되면 폭의 크기가 적당한 
          상태로 잡혀 있지 않으므로 우측으로 올라갈 수 없다. 약간의 편법을 이용해 보자.
        </MapDiv>
        <WritingButton>글쓰기</WritingButton>
        <ChattingButton>채팅</ChattingButton>
      </Wrapper>
    </div>
  );
}

export default Main;