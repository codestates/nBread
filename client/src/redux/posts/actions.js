import axios from 'axios';
import { SHOW_POST_LIST , RESET_POST_LIST, DELETE_POST_LIST} from "./types";

const showPostSuccess = (post) => {
  const posts = post.data.data
  console.log('posts',post)
  return {
    type : SHOW_POST_LIST,
    payload : posts,
  }
}

const showPostReset = (post) => {
  // const posts = post.data.data
  // console.log('posts',post)
  return {
    type : RESET_POST_LIST,
    payload : null,
  }
}

const showPostDelete = () => {
  // const posts = post.data.data
  // console.log('posts',post)
  return {
    type : DELETE_POST_LIST,
    payload : null,
  }
}
// { params: {contentId: location.state.contentId}}
export const showPostUserDelete = (contentId) => {
  console.log('contentId',contentId)
  return (dispatch) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/contents/${contentId}`)
    .then(res => {
      // console.log('res-----', res)
      if(res.status === 200){
        dispatch(showPostDelete())
      }else{
        console.log('글 삭제 실패')
      }
    })
    .catch(err=> console.log(err))
  }
}


export const showPostList = (info) => {
  // console.log('info',info)
  // console.log( `${info.swLatLng.lat},${info.swLatLng.lng}`,
    // `${info.neLatLng.lat},${info.neLatLng.lng}`)
  return (dispatch) => {
    if(!info){
      dispatch(showPostReset())
    }else{
      axios.get(`${process.env.REACT_APP_API_URL}/contents?start=${info.swLatLng.lat},${info.swLatLng.lng}&end=${info.neLatLng.lat},${info.neLatLng.lng}`)
      .then(post => dispatch(showPostSuccess(post)))
      .catch(err=> console.log(err))
    }
  }
}
