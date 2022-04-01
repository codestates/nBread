import axios from "axios";
import { SHOW_POST_LIST_SUCCESS, SHOW_POST_EDIT_SUCCESS, SHOW_POST_CLOSED_EDIT_SUCCESS } from "./type";

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


export const showPostDetail = (id) => {
  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/contents/${id}`)
    .then(post => dispatch(showPostDetailSuccess(post)))
    .catch(err=> console.log(err))
  }
}

export const editPostDetail = (id,data)=> {
  // console.log('editPostDetailAction',id)
  // console.log('datadatadatadatadata',data)
  return (dispatch) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/contents/${id}`, {
      address: data.address,
      body: data.body,
      delivery_fee: data.delivery_fee,
      recruitment_personnel: data.recruitment_personnel,
      restaurant_name: data.restaurant_name,
    },{withCredentials: true})
    // .then(post=> console.log('-----p',post))
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

export const editPostClosed = (id,data)=> {
  // console.log('editPostDetailAction',id)
  // console.log('datadatadatadatadata',data)
  return (dispatch) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/contents/${id}`, {
      closed: 2
    },{withCredentials: true})
    .then(post=> console.log('-----p',post))
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
