import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
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

// const PostListImg = styled.img`
// `;

const PostListImg = styled.img.attrs(props => ({
  // src: `/images/${props}.png`
  // src: `logo${props}`,
  // "/images/11.png"
}))`
`;

const PostListTextWrapper = styled.div`
padding-left: 40px;
`

const PostListText = styled.div`
margin-bottom: 10px;
`

function PostList({}) {
  const [click, setClick] = useState(false);

  const dispatch = useDispatch();
  const post = useSelector((state)=> state.postsReducer.posts)
  // console.log('post',post)

  // useEffect(()=>{
  //   dispatch(showPostList())
  // },[])

  const handlePostList = (contentId) => {
    // console.log(contentId);
    setClick(true)
    // console.log('클릭상태',click)
    dispatch(showPostDetail(contentId))
  }

  return (
    <>
    {!post ? <PostListMenu> 배달 목록 0개 </PostListMenu>
      : ( click
          ?  <PostListMenu> 배달 상세보기 </PostListMenu>
          :  <PostListMenu> 배달 목록 {post.length}개 </PostListMenu>
        )
    }

    {!post ? '지도를 더 확대해주세요'
      : ( click
        ? <PostDetail click={click} setClick={setClick}/>
        : post.map((li ,i) => {
          // console.log('category',li.category_food)
          return (
            <Wrapper key={i} onClick={()=>handlePostList(li.id)}>
              <PostListImg src={`/icon/${li.category_food}.png`}/>
              <PostListTextWrapper>
                <PostListText>식당이름: {li.restaurant_name}</PostListText>
                <PostListText>모집인원: {li.content_count} / {li.recruitment_personnel}명</PostListText>
                <PostListText>배달비: {li.delivery_fee}</PostListText>
              </PostListTextWrapper>
            </Wrapper>
          )
        })
        )
      }
    </>
  );
}

export default PostList;
