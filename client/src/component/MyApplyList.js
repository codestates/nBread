import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { showPostDetail } from '../redux/postList/action';
import PostDetail from './PostDetail';


function MyApplyList(props) {
  const dispatch = useDispatch()
  const [click, setClick] = useState(false);

  const post = useSelector((state)=> state.myApplyPostsReducer.posts)
  // console.log('post',post)

  const handlePostList = (contentId) => {
    // console.log(contentId);
    setClick(true)
    // console.log('클릭상태',click)
    dispatch(showPostDetail(contentId))
  }

  return (
    <div>
      {!post ? '목록이 없어요!'
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
      }
    </div>
  );
}

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

export default MyApplyList;