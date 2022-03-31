import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MyOpenList(props) {
  const post = useSelector((state)=> state.myPostsReducer)
  // console.log('post',post.posts)
  return (
    <div>
      개설 목록
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
    </div>
  );
}

export default MyOpenList;