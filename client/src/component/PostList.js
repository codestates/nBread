import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { showPostList } from '../redux/posts/actions';
import { showPostDetail } from '../redux/postList/action';
import PostDetail from './PostDetail';
// import { PostListLoader } from '../contentLoader/PostListLoader';
import  PostListLoader  from '../contentLoader/PostListLoader';

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
font-family: var(--main-font);
font-size: 20px;
background-color: #EEEEEE;
display: flex;
align-items: center;
justify-content: space-between;
height: 70px;
font-size: 18px;
font-weight: bold;
border: 1px solid #C9C9C9;
`




const PostListImg = styled.img`
`;



const PostMobileBack = styled.div`
  margin-left: 10px;
@media (min-width: 576px) {
  visibility: hidden;
}  
`

const PostNone = styled.div`
  margin-top: 10px;
`

const PostNoneDiv = styled.div`
  transform: translate(0, 400%);
  text-align: center;
`

const Hidden = styled.div`
  visibility: hidden;
`



function PostList({ openPost, setOpenPost}) {
  const [loading, setLoading] = useState(true);
	useEffect(() => {
		const timeout = setTimeout(() => setLoading((loading) => !loading), 500);
		return () => clearTimeout(timeout);
	}, [setLoading]);
  

  const [click, setClick] = useState(false);

  const dispatch = useDispatch();
  const post = useSelector((state)=> state.postsReducer.posts)

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
        배달 목록 0개
      <Hidden>
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
      </Hidden>
    </PostListMobile> 
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
            <Hidden>
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
            </Hidden>
          </PostListMobile>
        )
    }

    {
      (function ()  {
        if(!post){
          return (
            <PostNoneDiv>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 2v9h9v2h-9v9h-2v-9h-9v-2h9v-9h2zm2-2h-6v9h-9v6h9v9h6v-9h9v-6h-9v-9z"/></svg>
              <PostNone> 
                지도를 더 확대해주세요
              </PostNone>
            </PostNoneDiv>
          )
        } else if(post.length === 0){
          return ( 
            <PostNoneDiv>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>           
              <PostNone> 
                배달 목록이 없어요 
              </PostNone>
            </PostNoneDiv>
          )
        }else if (click){
          return (<PostDetail click={click} setClick={setClick}/>)
        }else if( !click ){
          return (
            post.map((li ,i) => {
              return (<Wrapper key={i} onClick={()=>handlePostList(li.id)}>
                    <PostListImg src={`/icon/${li.category_food}.png`}/>
                    <PostListTextWrapper>
                      <PostTextDiv>
                        <PostListText>식당이름 :</PostListText>
                        <PostListTextRight> {li.restaurant_name} </PostListTextRight>
                      </PostTextDiv>
                      <PostTextDiv>
                        <PostListText>모집인원 :</PostListText>
                        <PostListTextRight> {li.content_count} / {li.recruitment_personnel}명 </PostListTextRight>
                      </PostTextDiv>
                      <PostTextDiv>
                        <PostListText>배달비 :</PostListText>
                        <PostListTextRight> {li.delivery_fee} 원</PostListTextRight>
                      </PostTextDiv>
                      <PostTextDiv>
                        <PostListText>N빵 :</PostListText>
                        <PostListTextRight> {parseInt(li.delivery_fee / li.recruitment_personnel)} 원</PostListTextRight>
                      </PostTextDiv>
{/* 
                      <PostListText>모집인원 : {li.content_count} / {li.recruitment_personnel}명</PostListText>
                      <PostListText>배달비 : {li.delivery_fee}</PostListText>
                      <PostListText>N빵 : {parseInt(li.delivery_fee / li.recruitment_personnel)}</PostListText> */}
                    </PostListTextWrapper>
                  </Wrapper>)
            })
          )
        }
      }
      )()
    }
    </>
  );
}

const PostListTextWrapper = styled.div`
  margin-top: 10px;
  padding-left: 35px;
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
&:hover{  
  cursor: pointer;
}
@media (max-width: 768px) {
  /* justify-content:center; */
} 
`;

const PostTextDiv = styled.div`
  display: flex;
  
`

const PostListTextRight = styled.div`
  font-weight: bold;
  margin-left: 10px;
  text-overflow: ellipsis;
`
const PostListText = styled.div`
  margin-bottom: 10px;
  white-space:nowrap;
`


export default PostList;

// post.map((li ,i) => {
//   return (
//     <Wrapper key={i} onClick={()=>handlePostList(li.id)}>
//       <PostListImg src={`/icon/${li.category_food}.png`}/>
//       <PostListTextWrapper>
//         <PostListText>식당이름: {li.restaurant_name}</PostListText>
//         <PostListText>모집인원: {li.content_count} / {li.recruitment_personnel}명</PostListText>
//         <PostListText>배달비: {li.delivery_fee}</PostListText>
//       </PostListTextWrapper>
//     </Wrapper>
//   )
// })

// post.map((li ,i) => {
//   return (!loading) ? (
//     <Wrapper key={i} onClick={()=>handlePostList(li.id)}>
//       <PostListImg src={`/icon/${li.category_food}.png`}/>
//       <PostListTextWrapper>
//         <PostListText>식당이름 : {li.restaurant_name}</PostListText>
//         <PostListText>모집인원 : {li.content_count} / {li.recruitment_personnel}명</PostListText>
//         <PostListText>배달비 : {li.delivery_fee}</PostListText>
//         <PostListText>N빵 : {parseInt(li.delivery_fee / li.recruitment_personnel)}</PostListText>
//       </PostListTextWrapper>
//     </Wrapper>
//   ): ( <PostListLoader key={i}/>)
// })

