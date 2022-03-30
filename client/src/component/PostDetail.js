import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { showPostDetail } from '../redux/postList/action';
import { showPostUserDelete } from '../redux/posts/actions';
import { useHistory } from 'react-router-dom';
import { editPostDetail } from '../redux/postList/action';


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

function PostDetail({click, setClick}) {
  const history = useHistory();
  const dispatch = useDispatch()
  const list = useSelector((state)=> state.postsDetailReducer)
  // console.log('list====',list)
  const listUserId = list.user_id // 글 쓴 유저의 id
  const postId = list.id // 글의 id
  // console.log('현재postId',postId)
  
  const userInfo = useSelector((state)=> state.loginReducer.data)   // 로그인한 유저의 id
  // 데이터 날짜 변경
  const changeDate = new Date(list.created_at) 
  const newChangeDate = changeDate.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"}) 

  const [editText, setEditText] = useState(false)
  const [postEditInfo, setPostEditInfo] = useState({
    restaurant_name: list.restaurant_name,
    recruitment_personnel: list.recruitment_personnel,
    delivery_fee: list.delivery_fee,
    address: list.address,
    body: list.body,
  })
  
  const handleBack = () => {
    setClick(!click)
  }

  const handelPostDelete = () => {
    alert('삭제하시겠습니까?')
    dispatch(showPostUserDelete(postId))
    window.location.replace("/") 
  }

  const handelPostEdit = () => {
    setEditText(!editText)
  }

  const handelPostEditComplete = () => {
    // console.log('클릭시 id',list.id)
    setEditText(!editText)
    dispatch(editPostDetail(list.id,postEditInfo))
    alert('글 수정 성공')
    // history.push('/')
    window.location.replace("/") 
  }
  

  const handleInputValue = (key) => (e) => {
    setPostEditInfo({ ...postEditInfo, [key]: e.target.value })
  }

  return (
    <div>
      {/* <PostListMenu> 배달 상세보기</PostListMenu> */}
      <PostWrapper>
        <PostIconWrapper>
          <svg onClick={handleBack} 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24"
          ><path 
            d="M16.67 0l2.83 2.829-9.339 
            9.175 9.339 9.167-2.83 
            2.829-12.17-11.996z"/>
          </svg>
          {!userInfo ? null
            :( userInfo.id === listUserId && !editText
              ? <PostUpdateDelete>
                  <PostUpdate onClick={handelPostEdit}> 수정 </PostUpdate>
                  <PostDelete onClick={handelPostDelete}> 삭제 </PostDelete>
                </PostUpdateDelete>
              : ( userInfo.id === listUserId && editText
                  ?  <PostUpdateDelete>
                        <PostUpdate onClick={handelPostEditComplete}> 수정 완료 </PostUpdate>
                        <PostDelete onClick={handelPostDelete}> 삭제 </PostDelete>
                    </PostUpdateDelete>
                  : null
              )
            )
          }
        </PostIconWrapper>

        {!editText
          ? <>  
              <Wrapper>
                <PostListImg src={`/icon/${list.category_food}.png`}/>
                <PostListTextWrapper>
                  <PostListText>식당이름: {list.restaurant_name}</PostListText>
                  <PostListText>모집인원: {list.recruitment_personnel}명</PostListText>
                  <PostListText>배달비: {list.delivery_fee}원</PostListText>
                </PostListTextWrapper>
              </Wrapper>
                <PostListText>{newChangeDate}</PostListText>
                <PostListText>주소: {list.address}</PostListText>
                <PostListText>설명글</PostListText>
                <PostListDetailText>
                  {list.body}
                </PostListDetailText>
            </>
          :  <>  
              <Wrapper>
                <PostListImg src={`/icon/${list.category_food}.png`}/>
                <PostListTextWrapper>
                  <PostListText>식당이름: </PostListText> 
                    <input defaultValue={list.restaurant_name} onChange={handleInputValue('restaurant_name')} />
                  <PostListText>모집인원: 명</PostListText>
                    <input type='number' defaultValue={list.recruitment_personnel} onChange={handleInputValue('recruitment_personnel')} />
                  <PostListText>배달비: 원</PostListText>
                    <input type='number' defaultValue={list.delivery_fee} onChange={handleInputValue('delivery_fee')} />
                </PostListTextWrapper>
              </Wrapper>
                <PostListText>{newChangeDate}</PostListText>
                <PostListText>주소: </PostListText>
                  <input defaultValue={list.address} onChange={handleInputValue('address')} />
                <PostListText>설명글</PostListText>
                  <input defaultValue={list.body} onChange={handleInputValue('body')} />
                {/* <PostListDetailText>
                  
                </PostListDetailText> */}
            </>
        }  
      </PostWrapper>
      {!userInfo ? null
        :( userInfo.id === listUserId 
          ? <PostButton> 마감하기 </PostButton>
          : <PostButton> 신청하기 </PostButton> )
      }
    </div>
  );
}

export default PostDetail;