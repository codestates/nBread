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

const PostListMobile = styled.div`
background-color: #EEEEEE;
display: flex;
align-items: center;
justify-content: space-between;
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
@media (max-width: 768px) {
  /* justify-content:center; */
} 
`;

const PostListImg = styled.img`
`;

const PostListTextWrapper = styled.div`
padding-left: 40px;
`

const PostListText = styled.div`
margin-bottom: 10px;
`

const PostMobileBack = styled.div`
  margin-left: 10px;
@media (min-width: 768px) {
  visibility: hidden;
}  
`

function PostList({openPost, setOpenPost}) {
  const [click, setClick] = useState(false);

  const dispatch = useDispatch();
  const post = useSelector((state)=> state.postsReducer.posts)
  // console.log('post',post)

  // useEffect(()=>{
  //   dispatch(showPostList())
  // },[])

  const handlePostList = (contentId) => {
    setClick(true)
    dispatch(showPostDetail(contentId))
  }

  const postHandleBack = () => {
    setOpenPost(!openPost)
  }

  return (
    <>
    {!post ? 
    <PostListMenu> 배달 목록 0개 </PostListMenu>
      : ( click
          ?  <PostListMenu> 배달 상세보기 </PostListMenu>
          :  
          <PostListMobile> 
            <PostMobileBack>
              <svg onClick={postHandleBack} 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24"
              ><path 
                d="M16.67 0l2.83 2.829-9.339 
                9.175 9.339 9.167-2.83 
                2.829-12.17-11.996z"/>
              </svg>
            </PostMobileBack>
              배달 목록 {post.length}개 
            <div></div>
          </PostListMobile>
        )
    }

    {!post ? '지도를 더 확대해주세요'
      : ( click
        ? <PostDetail click={click} setClick={setClick}/>
        : post.map((li ,i) => {
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
