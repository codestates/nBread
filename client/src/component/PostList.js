import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import logo1 from '../icons/01.png'
import { showPostList } from '../redux/posts/actions';

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

function PostList() {
  const dispatch = useDispatch();
  const post = useSelector((state)=> state.postsReducer.posts)

  useEffect(()=>{
    dispatch(showPostList())
  },[])

  return (
    <>
      <PostListMenu> 배달 모집 목록 </PostListMenu>

      {post.map((li ,i) => {
        return (
          <Wrapper key={i}>
            <PostListImg src={logo1}/>
            <PostListTextWrapper>
              <PostListText>식당이름: {li.restaurant_name}</PostListText>
              <PostListText>모집인원: {li.recruitment_personnel}</PostListText>
              <PostListText>배달비: {li.delivery_fee}</PostListText>
            </PostListTextWrapper>
          </Wrapper>
        )
      })}
    </>
  );
}

export default PostList;