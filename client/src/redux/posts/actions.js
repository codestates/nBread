import axios from 'axios';
import { SHOW_POST_LIST , 
        RESET_POST_LIST, 
        DELETE_POST_LIST, 
        SHOW_MY_OPEN_LIST_SUCCESS,
        SHOW_POST_FAIL,
        DELETE_POST_LIST_FAIL      
      } from "./types";
import io from 'socket.io-client';

const socket = io.connect(`${process.env.REACT_APP_API_URL}`);

const showPostSuccess = (post) => {
  const posts = post.data.data
  return {
    type : SHOW_POST_LIST,
    payload : posts,
  }
}

const showPostFail = () => {
  return {
    type : SHOW_POST_FAIL,
  }
}


const showPostReset = (post) => {
  return {
    type : RESET_POST_LIST,
    payload : null,
  }
}

const showPostDelete = () => {
  return {
    type : DELETE_POST_LIST,
    payload : null,
  }
}

const showPostDeleteFail = () => {
  return {
    type : DELETE_POST_LIST_FAIL,
    payload : null,
  }
}



export const showPostUserDelete = (contentId, nickname) => {

  socket.emit('leaveRoom', ({ contentId, nickname }));

  return (dispatch) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/contents/${contentId}`)
    .then(res => {
      if(res.status === 200){
        dispatch(showPostDelete())
      }else{
        dispatch(showPostDeleteFail())
      }
    })
    .catch(err=> console.log(err))
  }
}


export const showPostList = (info) => {
 //  console.log('info',info)
//  console.log( `${info.swLatLng.lat},${info.swLatLng.lng}`,
//     `${info.neLatLng.lat},${info.neLatLng.lng}`)
  return (dispatch) => {
    if(!info){
      dispatch(showPostReset())
    }else{
      axios.get(`${process.env.REACT_APP_API_URL}/contents?start=${info.swLatLng.lat},${info.swLatLng.lng}&end=${info.neLatLng.lat},${info.neLatLng.lng}`)
      .then(post => {
        if(post.status === 200){
          dispatch(showPostSuccess(post))
        }else{
          dispatch(showPostFail())
        }
      })
      .catch(err=> console.log(err))
    }
  }
}

