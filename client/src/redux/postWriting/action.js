import axios from 'axios';
import { WRITING_POST_SUCCESS, WRITING_POST_FAILURE } from "./types";


const writingPostSuccess = (post) => {
  return {
    type : WRITING_POST_SUCCESS,
    payload : post
  }
}

const writingPostFailure = (error) => {
  return {
    type: 'WRITING_POST_FAILURE',
    error,
  }
};

export const writingPost = (post) => {
  console.log('actionpost',post)
  return (dispatch) => {
    axios.post(`${process.env.REACT_APP_API_URL}/contents`, {
      address: post.address,
      body: post.body,
      category_food: post.category_food,
      delivery_fee: post.delivery_fee,
      recruitment_personnel: post.delivery_fee,
      restaurant_name: post.restaurant_name
    }, { withCredentials: true })
    .then(res => console.log('ressss',res))
    .then(post => dispatch(writingPostSuccess(post)))
    .catch(err=> dispatch(writingPostFailure(err)))
  }
}