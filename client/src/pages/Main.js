import React from 'react';
import Navbar from '../component/Navbar';
import styled from 'styled-components'

function Main(props) {
  const Wrapper = styled.div`
  display: flex;

  `;
  const PostListDiv = styled.div`

    background-color: #888;
    width: 460px;
    height: 800px;
  `;

  const MapDiv = styled.div`
    /* display: flex;
    justify-content: flex-end; */
    background-color: bisque;
    width: 100%;
    height: 800px;
  `;

  const Button = styled.button`
    border-radius: 100%;
    width: 90px;
    height: 90px;
    
  `;

  return (
    <div>
      <Navbar/>
      <Wrapper>
        <PostListDiv>
          목록
        </PostListDiv>
        <MapDiv>
          지도
          <Button>채팅</Button>
        </MapDiv>
      </Wrapper>
    </div>
  );
}

export default Main;