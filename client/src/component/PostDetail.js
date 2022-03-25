import React from 'react';
import styled from 'styled-components';
import logo1 from '../icons/01.png'

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
height: 150px;
margin-bottom: 8px;
overFlow : auto;
`;

const PostWrapper = styled.div`
padding-left: 30px ;
padding-right: 30px ;
padding-top: 10px;
`

const PostListImg = styled.img`

`

const PostListTextWrapper = styled.div`
padding-left: 40px;
`

const PostIconWrapper = styled.div`
display: flex;
justify-content: space-between;
margin-top: 10px;
`

const PostUpdateDelete = styled.div`
display: flex;
`

const PostUpdate = styled.div`
font-size: 14px;
color: #B1B1B1;
`
const PostDelete = styled.div`
font-size: 14px;
color: #B1B1B1;
margin-left: 4px;
`
const PostListText = styled.div`
margin-bottom: 10px;
`

const PostListDetailText = styled.div`
border: 1px solid;
width: 340px;
height: 200px;
overFlow : auto;
`

const PostButton = styled.button`
position: fixed;
bottom: 0px;
border: none;
background-color: #B51D29;
color: white;
width: 400px;
height: 56px;
text-align: center;
`

function PostDetail() {

  return (
    <div>
      <PostListMenu> 배달 상세보기</PostListMenu>
      <PostWrapper>
        <PostIconWrapper>
          <svg xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24"
          ><path 
            d="M16.67 0l2.83 2.829-9.339 
            9.175 9.339 9.167-2.83 
            2.829-12.17-11.996z"/>
          </svg>
          <PostUpdateDelete>
            <PostUpdate> 수정 </PostUpdate>
            <PostDelete> 삭제 </PostDelete>
          </PostUpdateDelete>
        </PostIconWrapper>

        <Wrapper>
          <PostListImg src={logo1}/>
          <PostListTextWrapper>
            <PostListText>식당이름: 교촌 치킨</PostListText>
            <PostListText>모집인원: 2/4 명</PostListText>
            <PostListText>배달비: 4000원</PostListText>
          </PostListTextWrapper>
        </Wrapper>
          <PostListText>2022 / 03 / 22</PostListText>
          <PostListText>주소: 서울특별시 동작구 강남초등2길</PostListText>
          <PostListText>설명글</PostListText>
          <PostListDetailText>
            오늘 저녁에 돈까스 시켜드실분 찾습니다 
            인원이 다 모이면 채팅으로 소통해요!
            배달비 아낄 수 있는 N빵 짱
            오늘 저녁에 돈까스 시켜드실분 찾습니다 
            인원이 다 모이면 채팅으로 소통해요!
            배달비 아낄 수 있는 N빵 짱            
            오늘 저녁에 돈까스 시켜드실분 찾습니다 
            인원이 다 모이면 채팅으로 소통해요!
            배달비 아낄 수 있는 N빵 짱            
            오늘 저녁에 돈까스 시켜드실분 찾습니다 
            인원이 다 모이면 채팅으로 소통해요!
            배달비 아낄 수 있는 N빵 짱            
            오늘 저녁에 돈까스 시켜드실분 찾습니다 
            인원이 다 모이면 채팅으로 소통해요!
            배달비 아낄 수 있는 N빵 짱            
            오늘 저녁에 돈까스 시켜드실분 찾습니다 
            인원이 다 모이면 채팅으로 소통해요!
            배달비 아낄 수 있는 N빵 짱            
            오늘 저녁에 돈까스 시켜드실분 찾습니다 
            인원이 다 모이면 채팅으로 소통해요!
            배달비 아낄 수 있는 N빵 짱
          </PostListDetailText>
      </PostWrapper>
      <PostButton> 신청하기 </PostButton>
    </div>
  );
}

export default PostDetail;