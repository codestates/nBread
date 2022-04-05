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
  background-color: #EEEEEE;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  font-size: 18px;
  font-weight: bold;
  border: 1px solid #C9C9C9;
  width: 50%;
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

function MyPagePost(props) {
  const [click, setClick] = useState(false);
  const [listClick, setListClick] = useState(true);
  const dispatch = useDispatch();
  const post = useSelector((state)=> state.postsReducer.posts)
  // console.log('post',post)

  const userInfo = useSelector((state)=> state.loginReducer.data)   // 로그인한 유저의 id
  
  // useEffect(()=>{
  //   dispatch(showPostList())
  // },[])

  const handlePostList = (contentId) => {
    // console.log(contentId);
    setClick(true)
    // console.log('클릭상태',click)
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
    // 신청목록에서 보내줘야 할 건? 
    setListClick(false)
    dispatch(showMyPageApplyList())
    // dispatch()
  }

  return (
    <>
    <PostButtonDiv>
      <PostButton onClick={handleOpenList}>개설목록</PostButton>
      <PostButton onClick={handleApplyList}>신청목록</PostButton>
    </PostButtonDiv>
    {listClick 
      ?  <MyOpenList/>
      :  <MyApplyList/>
    }

    {/* {!post ? '목록이 없어요!'
      : ( click
        ? <PostDetail click={click} setClick={setClick}/>
        : post.map((li ,i) => {
          return (
            <Wrapper key={i} onClick={()=>handlePostList(li.id)}>
              <PostListImg src={`/icon/${li.category_food}.png`}/>
              <PostListTextWrapper>
                <PostListText>식당이름: {li.restaurant_name}</PostListText>
                <PostListText>모집인원: {li.recruitment_personnel}</PostListText>
                <PostListText>배달비: {li.delivery_fee}</PostListText>
              </PostListTextWrapper>
            </Wrapper>
          )
        })
        )
      } */}
    </>
  );
}

export default MyPagePost;



