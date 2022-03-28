import axios from 'axios';
import { SHOW_POST_LIST } from "./types";

const showPostSuccess = (post) => {
  const posts = post.data.data
  console.log('posts',post)
  return {
    type : SHOW_POST_LIST,
    payload : posts,
  }
}

export const showPostList = (info) => {
  // console.log('info',info)
  // console.log( `${info.swLatLng.lat},${info.swLatLng.lng}`,
    // `${info.neLatLng.lat},${info.neLatLng.lng}`)
  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/contents?start=${info.swLatLng.lat},${info.swLatLng.lng}&end=${info.neLatLng.lat},${info.neLatLng.lng}`)
    .then(post => dispatch(showPostSuccess(post)))
    .catch(err=> console.log(err))
  }
}
