import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { showPostList } from '../redux/posts/actions';
import { showPostDetail } from '../redux/postList/action';
import PostDetail from './PostDetail';
import MyOpenList from './MyOpenList';
import MyApplyList from './MyApplyList';
import { showMyPageOpenList } from '../redux/myposts/action';
import { showMyPageApplyList } from '../redux/myApplyList/action'

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
const PostButtonDiv = styled.div`
  display: flex;
`

const PostButton = styled.div`
  font-family: var(--main-font);
  background-color: #EEEEEE;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  font-size: 18px;
  font-weight: bold;
  border: 1px solid #C9C9C9;
  width: 50%;
  &:hover{  
  cursor: pointer;
}
`
const PostOpenButton = styled.div`
  font-family: var(--main-font);
  background-color: #EEEEEE;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  font-size: 18px;
  font-weight: bold;
  border: 1px solid #C9C9C9;
  width: 50%;
  &:hover{  
  cursor: pointer;
}
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

const PostMobileBack = styled.div`
  margin-left: 10px;
  margin-top: 5px;
@media (min-width: 576px) {
  visibility: hidden;
}  
`

const Hidden = styled.div`
  visibility: hidden;
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

function MyPagePost({openPost, setOpenPost}) {
  const [click, setClick] = useState(false);
  const [listClick, setListClick] = useState(true);
  const dispatch = useDispatch();
  const post = useSelector((state)=> state.postsReducer.posts)
  const userInfo = useSelector((state)=> state.loginReducer.data)   // 로그인한 유저의 id
  

  const handlePostList = (contentId) => {
    setClick(true)
    dispatch(showPostDetail(contentId))
  }

  useEffect(() => {
    handleOpenList()
  }, [])

  const handleOpenList = () => {
    setListClick(true)
    dispatch(showMyPageOpenList())
  }

  const handleApplyList = () => {
    setListClick(false)
    dispatch(showMyPageApplyList())
  }

  const myPagePostHandleBack = () => {
    console.log('cdcdcd')
    setOpenPost(!openPost)
  }

  return (
    <>
    <PostButtonDiv>
      <PostOpenButton onClick={handleOpenList}>
      <PostMobileBack>
        <svg onClick={myPagePostHandleBack}
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
        개설목록
        <Hidden>
        <svg 
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
      </PostOpenButton>
        
      <PostButton onClick={handleApplyList}>신청목록</PostButton>
    </PostButtonDiv>
    {listClick 
      ?  <MyOpenList/>
      :  <MyApplyList/>
    }
    </>
  );
}

export default MyPagePost;



