import axios from 'axios';
import { SHOW_POST_LIST } from "./types";

const showPostSuccess = (post) => {
  const posts = post.data.data
  // console.log('posts',post.data.data)
  return {
    type : SHOW_POST_LIST,
    payload : posts,
  }
}

export const showPostList = () => {
  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/contents`)
    .then(post => dispatch(showPostSuccess(post)))
    .catch(err=> console.log(err))
  }
}
