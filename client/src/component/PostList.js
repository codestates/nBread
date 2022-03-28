import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import logo1 from '../icons/01.png'
import { showPostList } from '../redux/posts/actions';
import { showPostDetail } from '../redux/postList/action';
import PostDetail from './PostDetail';

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
display: flex;
margin-left: 4px;
align-items: center;
width: 98%;
height: 199px;
padding: 30px;
margin-bottom: 8px;
box-shadow: 0 0 4px #737373;
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
  const [click, setClick] = useState(false);

  const dispatch = useDispatch();
  const post = useSelector((state)=> state.postsReducer.posts)

  // useEffect(()=>{
  //   dispatch(showPostList())
  // },[])

  const handlePostList = (contentId) => {
    // console.log(contentId);
    setClick(!click)
    dispatch(showPostDetail(contentId))
  }

  return (
    <>
    {!click ? 
      <PostListMenu> 배달 모집 목록 </PostListMenu>
      : <PostListMenu> 배달 상세보기 </PostListMenu>
    }
    {!click ? 
      post.map((li ,i) => {
        return (
          <Wrapper key={i} onClick={()=>handlePostList(li.id)}>
            <PostListImg src={logo1}/>
            <PostListTextWrapper>
              <PostListText>식당이름: {li.restaurant_name}</PostListText>
              <PostListText>모집인원: {li.recruitment_personnel}</PostListText>
              <PostListText>배달비: {li.delivery_fee}</PostListText>
            </PostListTextWrapper>
          </Wrapper>
        )
      })
    :
      <PostDetail click={click} setClick={setClick}/>
    }

    </>
  );
}

export default PostList;