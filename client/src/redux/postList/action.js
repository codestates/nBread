import axios from "axios";
import { SHOW_POST_LIST_SUCCESS, SHOW_POST_EDIT_SUCCESS, SHOW_POST_CLOSED_EDIT_SUCCESS, SHOW_POST_RECRUITMENT_SUCCESS, SHOW_POST_CANCEL_RECRUITMENT_SUCCESS } from "./type";
import io from 'socket.io-client';

const socket = io.connect(`${process.env.REACT_APP_API_URL}`);

const showPostDetailSuccess = (post) => {
  return {
    type: SHOW_POST_LIST_SUCCESS,
    payload: post
  }
}

const showPostEditSuccess = (post) => {
  return {
    type: SHOW_POST_EDIT_SUCCESS,
    payload: post
  }
}

const showPostClosedEditSuccess = (post) => {
  return {
    type: SHOW_POST_CLOSED_EDIT_SUCCESS,
    payload: post
  }
}

const showPostRecruitmentSuccess = () => {
  return {
    type: SHOW_POST_RECRUITMENT_SUCCESS,
    payload: null
  }
}

const showPostCancelRecruitmentSuccess = () => {
  return {
    type: SHOW_POST_CANCEL_RECRUITMENT_SUCCESS,
    payload: null
  }
}


// 글 상세페이지 
export const showPostDetail = (id) => {
  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/contents/${id}`, { withCredentials: true })
    .then(post => dispatch(showPostDetailSuccess(post)))
    .catch(err=> console.log(err))
  }
}

// 글 수정 
export const editPostDetail = (id,data)=> {
  return (dispatch) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/contents/${id}`, {
      address: data.address,
      body: data.body,
      delivery_fee: data.delivery_fee,
      recruitment_personnel: data.recruitment_personnel,
      restaurant_name: data.restaurant_name,
    },{withCredentials: true})
    .then(post => {
      if(post.status === 200){
        dispatch(showPostEditSuccess(post))
      }else {
        console.log('글 수정 실패')
      }
    })
    .catch(err=> console.log(err))
  }
}

// 글 마감
export const editPostClosed = (id,data)=> {
  return (dispatch) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/contents/${id}`, {
      closed: 2
    },{withCredentials: true})
    .then(post => {
      if(post.status === 200){
        dispatch(showPostClosedEditSuccess(post))
      }else {
        console.log('글 수정 실패')
      }
    })
    .catch(err=> console.log(err))
  }
}

// 글 신청
export const editPostRecruitment = (id, roomName, nickname)=> {
  
  socket.emit('joinRoom', ({ id, nickname, roomName }))

  return (dispatch) => {
    axios.post(`${process.env.REACT_APP_API_URL}/orders/${id}`,{},{withCredentials: true})
    .then(post => {
      if(post.status === 200){
        dispatch(showPostRecruitmentSuccess())
      }else {
        console.log('글 신청 실패')
      }
    })
    .catch(err=> console.log(err))
  }
}

// 글 신청 취소
export const editPostCancelRecruitment = (id)=> {
  console.log('editPostDetailAction',id)
  return (dispatch) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/orders/${id}`,{withCredentials: true})
    .then(post => {
      console.log('post.status',post)
      if(post.status === 200){
        dispatch(showPostCancelRecruitmentSuccess())
      }else {
        console.log('글 신청 취소 실패')
      }
    })
    .catch(err=> console.log(err))
  }
}


