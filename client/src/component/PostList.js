import React from 'react';
import styled from 'styled-components'
import logo1 from '../icons/01.png'

function PostList(props) {
  const PostListMenu = styled.div`
    background-color: #EEEEEE;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    font-size: 18px;
    font-weight: bold;
    border: 1px solid #C9C9C9;
  `

  const Wrapper = styled.div`
    /* background-color: green; */
    display: flex;
    margin-left: 4px;
    align-items: center;
    width: 98%;
    height: 199px;
    padding: 30px;
    margin-bottom: 8px;
    box-shadow: 0 0 4px #737373;
    /* box-shadow: 0 4px 4px -4px black; */

  `;

  const PostListImg = styled.img`

  `

  const PostListTextWrapper = styled.div`
    padding-left: 40px;
  `
  
  const PostListText = styled.div`
    margin-bottom: 10px;
  `

  return (
    <>
    <PostListMenu> 배달 모집 목록 </PostListMenu>
    <Wrapper>
      <PostListImg src={logo1}/>
        <PostListTextWrapper>
          <PostListText>식당이름: 돈까스 곱하기 배터지는&만두</PostListText>
          <PostListText>모집인원: 2/4 명</PostListText>
          <PostListText>배달비: 4000원</PostListText>
        </PostListTextWrapper>
    </Wrapper>

    <Wrapper>
      <PostListImg src={logo1}/>
        <PostListTextWrapper>
          <PostListText>식당이름: 교촌 치킨</PostListText>
          <PostListText>모집인원: 2/4 명</PostListText>
          <PostListText>배달비: 4000원</PostListText>
        </PostListTextWrapper>
    </Wrapper>

    <Wrapper>
      <PostListImg src={logo1}/>
        <PostListTextWrapper>
          <PostListText>식당이름: 교촌 치킨</PostListText>
          <PostListText>모집인원: 2/4 명</PostListText>
          <PostListText>배달비: 4000원</PostListText>
        </PostListTextWrapper>
    </Wrapper>

    <Wrapper>
      <PostListImg src={logo1}/>
        <PostListTextWrapper>
          <PostListText>식당이름: 교촌 치킨</PostListText>
          <PostListText>모집인원: 2/4 명</PostListText>
          <PostListText>배달비: 4000원</PostListText>
        </PostListTextWrapper>
    </Wrapper>

    <Wrapper>
      <PostListImg src={logo1}/>
        <PostListTextWrapper>
          <PostListText>식당이름: 교촌 치킨</PostListText>
          <PostListText>모집인원: 2/4 명</PostListText>
          <PostListText>배달비: 4000원</PostListText>
        </PostListTextWrapper>
    </Wrapper>
    </>
  );
}

export default PostList;