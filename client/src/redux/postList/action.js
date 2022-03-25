import axios from "axios";
import { SHOW_POST_LIST_SUCCESS } from "./type";

const showPostDetailSuccess = (post) => {
  return {
    type: SHOW_POST_LIST_SUCCESS,
    payload: post
  }
}

export const showPostDetail = (id) => {
  // console.log(id)
  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/contents/${id}`)
    .then(post => dispatch(showPostDetailSuccess(post)))
    .catch(err=> console.log(err))
  }
}