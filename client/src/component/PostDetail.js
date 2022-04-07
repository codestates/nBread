import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { showPostDetail } from '../redux/postList/action';
import { showPostUserDelete } from '../redux/posts/actions';
import { useHistory } from 'react-router-dom';
import Select from 'react-select'
import { editPostDetail, editPostClosed, editPostRecruitment, editPostCancelRecruitment } from '../redux/postList/action';
import Swal from 'sweetalert2'
import io from 'socket.io-client';


const socket = io.connect(`${process.env.REACT_APP_API_URL}`);


function PostDetail({click, setClick}) {
  const history = useHistory();
  const dispatch = useDispatch()
  const list = useSelector((state)=> state.postsDetailReducer)
  const listUserId = list.user_id // 글 쓴 유저의 id
  const postId = list.id // 글의 id  
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

  useEffect(()=>{
    if(userInfo){
      let nickname = userInfo.nickname;

      socket.emit('joinServer', ({ nickname }));
      setPostEditInfo({
        restaurant_name: list.restaurant_name,
        recruitment_personnel: list.recruitment_personnel,
        delivery_fee: list.delivery_fee,
        address: list.address,
        body: list.body,
      })

      return () => {
        socket.off();
      }
    }
  },[list])

  const handleBack = () => {
    setClick(!click)
  }

  const handleInput = (e) => {
    const { value } = e.target;
    if (value.length >= 5) {
      e.preventDefault();
      return;
    }
  };

  const handleNumberInput = (e) => {
    const { value } = e.target;
    if (value.length >= 2) {
      e.preventDefault();
      return;
    }
  };

  const handelPostDelete = () => {
    Swal.fire({
      title: '삭제하시겠습니까?',
      padding: '1.5em',
      height: 700,
      showCancelButton: true,
      confirmButtonColor: '#D4AA71',
      cancelButtonColor: '#B51D29',
      confirmButtonText: '확인',
      cancelButtonText: '취소'
		}).then((result) => {
      if (result.value) {
        dispatch(showPostUserDelete(postId))
        window.location.replace("/") 
      }else{
      }
		})
  }

  const handelPostEdit = () => {
    setEditText(!editText)
  }

  const handelPostEditComplete = () => {
    Swal.fire({
      title: '수정하시겠습니까?',
      padding: '1.5em',
      showCancelButton: true,
      confirmButtonColor: '#D4AA71',
      cancelButtonColor: '#B51D29',
      confirmButtonText: '확인',
      cancelButtonText: '취소'
		}).then((result) => {
      if (result.value) {
        dispatch(editPostDetail(list.id,postEditInfo))
        setEditText(!editText)
        window.location.replace("/") 
      }else{
        setEditText(!editText)
      }
		})
  }
  

  const handleInputValue = (key) => (e) => {
    setPostEditInfo({ ...postEditInfo, [key]: e.target.value })
  }

  const handlePostClosed = () => {
    Swal.fire({
      title: '마감하시겠습니까?',
      padding: '1.5em',
      showCancelButton: true,
      confirmButtonColor: '#D4AA71',
      cancelButtonColor: '#B51D29',
      confirmButtonText: '확인',
      cancelButtonText: '취소'
		}).then((result) => {
      if (result.value) {
        dispatch(editPostClosed(list.id))
        window.location.replace("/") 
      }else{
      }
		})
  }

  const handlePostRecruitment = () => {
    Swal.fire({
      title: '신청하시겠습니까?',
      padding: '1.5em',
      showCancelButton: true,
      confirmButtonColor: '#D4AA71',
      cancelButtonColor: '#B51D29',
      confirmButtonText: '확인',
      cancelButtonText: '취소'
		}).then((result) => {
      if (result.value) {
        dispatch(editPostRecruitment(list.id, list.restaurant_name, userInfo.nickname, list.category_food))
        window.location.replace("/") 
      }else{
      }
		})
  }

  const handlePostCancelRecruitment = () => {
    Swal.fire({
      title: '취소하시겠습니까?',
      padding: '1.5em',
      showCancelButton: true,
      confirmButtonColor: '#D4AA71',
      cancelButtonColor: '#B51D29',
      confirmButtonText: '확인',
      cancelButtonText: '취소'
		}).then((result) => {
      if (result.value) {
        dispatch(editPostCancelRecruitment(list.id))
        window.location.replace("/") 
      }else{
      }
		}) 
  }

  return (
    <div>
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
          <WrapperDiv>
              <Wrapper>
                <PostListImg src={`/icon/${list.category_food}.png`}/>
                <PostListTextWrapper>
                  <PostListText>식당이름: {list.restaurant_name}</PostListText>
                  <PostListText>모집인원: {list.content_count} / {list.recruitment_personnel}명</PostListText>
                  <PostListText>배달비: {list.delivery_fee}원</PostListText>
                </PostListTextWrapper>
              </Wrapper>
              
                <div>
                  <PostListText>{newChangeDate}</PostListText>
                  <PostListText>주소: {list.address}</PostListText>
                  <PostListText>설명글</PostListText>
                  <PostListDetailText>
                    {list.body}
                  </PostListDetailText>
                </div>
          </WrapperDiv>
            </>
          :  <>  
            <WrapperDiv>
              <Wrapper>
                <PostListImg src={`/icon/${list.category_food}.png`}/>
                <PostListTextWrapper>
                  <PostListText>식당이름: <PostEditString  defaultValue={list.restaurant_name} onChange={handleInputValue('restaurant_name')} /></PostListText> 
                  <PostListText>모집인원: 
                    <PostEditNumber 
                      onKeyPress={handleNumberInput} 
                      type='number' 
                      onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()} 
                      defaultValue={list.recruitment_personnel} 
                      onChange={handleInputValue('recruitment_personnel')} /> 
                  명</PostListText>
                  <PostListText>배달비: 
                    <PostEditNumber 
                      onKeyPress={handleInput} 
                      type='number' 
                      onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()} 
                      defaultValue={list.delivery_fee} 
                      onChange={handleInputValue('delivery_fee')} /> 
                  원</PostListText>
                </PostListTextWrapper>
              </Wrapper>
              <div>
                <PostListText>{newChangeDate}</PostListText>
                <PostListText>주소: {list.address}</PostListText>
                <PostListText>설명글</PostListText>
                <PostEditDiv defaultValue={list.body} onChange={handleInputValue('body')} />

              </div>
            </WrapperDiv>
            </>
        }  
      </PostWrapper>
        {
          (function ()  {
            if(!userInfo){
              return (null)
            } else if (list.closed === 2){
              return (<PostButton> 신청마감 </PostButton>)
            } else if( userInfo.id === listUserId){
              return (<PostButton onClick={handlePostClosed}> 마감하기 </PostButton>)
            } else if( list.rel === ''){
              return (<PostButton onClick={handlePostRecruitment}> 신청하기 </PostButton>)
            } else if( list.rel === '신청자'){
              return (<PostButton onClick={handlePostCancelRecruitment}> 신청취소 </PostButton>)
            }
          }
          )()
        }
    </div>
  );
}

const Wrapper = styled.div`
overflow: auto; 
display: flex;
margin-left: 4px;
align-items: center;
width: 98%;
height: 199px;
margin-bottom: 8px;
overFlow : auto;
@media (max-width: 576px) {
  justify-content:center;
} 
`;

const WrapperDiv = styled.div`
@media (max-width: 576px) {
  /* justify-content:center; */
  display: flex;
  align-items: center;
  flex-direction: column;
} 
@media (min-height: 1200px) {
  /* height: 30vh */
  margin-top: 4vh;
} 
`;

const PostWrapper = styled.div`
padding-left: 30px ;
padding-right: 30px ;
padding-top: 10px;
@media (max-width: 768px) {
  
} 
`

const PostListImg = styled.img`

`

const PostListTextWrapper = styled.div`
padding-left: 40px;
/* display: flex; */
/* flex-direction: row; */
`

const PostIconWrapper = styled.div`
display: flex;
justify-content: space-between;
margin-top: 10px;
@media (max-width: 768px) {
  
} 
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
/* margin-bottom: 10px; */
margin-bottom: 2vh;

`

const PostListDetailText = styled.div`
border: 1px solid #D2D1D1;
width: 340px;
height: 20vh;
padding: 5px;
overFlow : auto;
@media (min-height: 768px) {
  height: 30vh
} 

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
@media (max-width: 768px) {
  width: 100%;
} 
`

const PostEditString = styled.input`
  font-size: 16px;
  width: 120px;
  border: none;
  margin-left: 5px;
  padding-left: 5px;
  border-bottom: 1px solid #CCC;
  &:focus {
    outline: none;    
    border-bottom: 1px solid dodgerblue;
  }
`

const PostEditNumber = styled.input`
  ::-webkit-inner-spin-button{
      -webkit-appearance: none; 
      margin: 0; 
  }
  ::-webkit-outer-spin-button{
      -webkit-appearance: none; 
      margin: 0; 
  }  
  font-size: 16px;
  width: 60px;
  border: none;
  margin-left: 5px;
  padding-left: 5px;
  border-bottom: 1px solid #CCC;
  &:focus {
    outline: none;    
    border-bottom: 1px solid dodgerblue;
  }
`

const PostEditDiv = styled.textarea`
  font-size: 16px;
  width: 340px;
  height: 20vh;
  border: none;
  flex-wrap: wrap;
  padding-left: 5px;
  border-bottom: 1px solid #CCC;
  &:focus {
    outline: none;   
    border-bottom: 1px solid dodgerblue; 
  }
  @media (max-width: 576px) {
  height: 25vh;
} 
@media (min-height: 576px) {
  height: 30vh
} 
`

export default PostDetail;