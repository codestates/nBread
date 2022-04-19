import axios from "axios";
import { SHOW_POST_LIST_SUCCESS, 
        SHOW_POST_EDIT_SUCCESS, 
        SHOW_POST_CLOSED_EDIT_SUCCESS, 
        SHOW_POST_RECRUITMENT_SUCCESS, 
        SHOW_POST_CANCEL_RECRUITMENT_SUCCESS,
        SHOW_POST_LIST_FAIL,
        SHOW_POST_EDIT_FAIL,
        SHOW_POST_CLOSED_EDIT_FAIL,
        SHOW_POST_RECRUITMENT_FAIL,
        SHOW_POST_CANCEL_RECRUITMENT_FAIL
} from "./type";
import io from 'socket.io-client';

const socket = io.connect(`${process.env.REACT_APP_API_URL}`);

const showPostDetailSuccess = (post) => {
  return {
    type: SHOW_POST_LIST_SUCCESS,
    payload: post
  }
}

const showPostDetailFail = () => {
  return {
    type: SHOW_POST_LIST_FAIL,
  }
}

const showPostEditSuccess = (post) => {
  return {
    type: SHOW_POST_EDIT_SUCCESS,
    payload: post
  }
}

const showPostEditFail = () => {
  return {
    type: SHOW_POST_EDIT_FAIL,
  }
}

const showPostClosedEditSuccess = (post) => {
  return {
    type: SHOW_POST_CLOSED_EDIT_SUCCESS,
    payload: post
  }
}

const showPostClosedEditFail = (post) => {
  return {
    type: SHOW_POST_CLOSED_EDIT_FAIL,
    payload: post
  }
}

const showPostRecruitmentSuccess = () => {
  return {
    type: SHOW_POST_RECRUITMENT_SUCCESS,
    payload: null
  }
}

const showPostRecruitmentFail = () => {
  return {
    type: SHOW_POST_RECRUITMENT_FAIL,
    payload: null
  }
}

const showPostCancelRecruitmentSuccess = () => {
  return {
    type: SHOW_POST_CANCEL_RECRUITMENT_SUCCESS,
    payload: null
  }
}

const showPostCancelRecruitmentFail = () => {
  return {
    type: SHOW_POST_CANCEL_RECRUITMENT_FAIL,
    payload: null
  }
}

// 글 상세페이지 
export const showPostDetail = (id) => {
  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/contents/${id}`, { withCredentials: true })
    .then(post => {
      if(post.status === 200){
        dispatch(showPostDetailSuccess(post))
      }else {
        dispatch(showPostDetailFail())
      }
    })
    .catch()
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
        dispatch(showPostEditFail())
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
        dispatch(showPostClosedEditFail())
      }
    })
    .catch(err=> console.log(err))
  }
}

// 글 신청
export const editPostRecruitment = (personal, id, roomName, nickname, categoryFood)=> {
  
  socket.emit('joinRoom', ({ id, nickname, roomName, categoryFood }));

  return (dispatch) => {
    axios.post(`${process.env.REACT_APP_API_URL}/orders/${id}`,{recruitment_personnel:personal},{withCredentials: true})
    .then(post => {
      if(post.status === 200){
        dispatch(showPostRecruitmentSuccess())
      }else {
        dispatch(showPostRecruitmentFail())
      }
    })
    .catch(err=> console.log(err))
  }
}

// 글 신청 취소
export const editPostCancelRecruitment = (id, nickname)=> {

  let roomId = id
  
  socket.emit('leaveRoom', ({ roomId, nickname }));

  return (dispatch) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/orders/${id}`,{withCredentials: true})
    .then(post => {
      console.log('post.status',post)
      if(post.status === 200){
        dispatch(showPostCancelRecruitmentSuccess())
      }else {
        dispatch(showPostCancelRecruitmentFail())
      }
    })
    .catch(err=> console.log(err))
  }
}


