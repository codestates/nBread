import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { showPostDetail } from '../redux/postList/action';
import PostDetail from './PostDetail';


function MyApplyList(props) {
  const dispatch = useDispatch()
  const [click, setClick] = useState(false);

  const post = useSelector((state)=> state.myApplyPostsReducer.posts)

  const handlePostList = (contentId) => {
    setClick(true)
    dispatch(showPostDetail(contentId))
  }

  return (
    <div>
      {
      (function ()  {
        if(!post){
          return (
            <PostNoneDiv>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>           
              <PostNone> 
                신청 목록이 없어요 
              </PostNone>
            </PostNoneDiv>
          )
        } else if(post.length === 0){
          return ( 
            <PostNoneDiv>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>           
              <PostNone> 
                신청 목록이 없어요 
              </PostNone>
            </PostNoneDiv>
          )
        }
          else if (click){
          return (<PostDetail click={click} setClick={setClick}/>)
        } else if( !click ){
          return (
            post.map((li ,i) => {
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
      }
      )()
    }
    </div>
  );
}

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
`;

const PostListTextWrapper = styled.div`
padding-left: 40px;
`

const PostListText = styled.div`
margin-bottom: 10px;
`

const PostNone = styled.div`
  margin-top: 10px;
`

const PostNoneDiv = styled.div`
  transform: translate(0, 400%);
  text-align: center;
`

export default MyApplyList;