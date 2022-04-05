import {SHOW_MY_OPEN_LIST_SUCCESS} from "./types";
import axios from 'axios';

const showMyOpenListSuccess = (myPost) => {
  const MyPosts = myPost.data.rec
  // console.log('posts',MyPosts)
  return {
    type : SHOW_MY_OPEN_LIST_SUCCESS,
    payload : MyPosts,
  }
}


// 마이페이지 리스트 불러오기
export const showMyPageOpenList = () => {
  // console.log('contentId',contentId)
  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users`, {withCredentials:true})
    .then(res => {
      // console.log('res-----', res)
      if(res.status === 200){
        dispatch(showMyOpenListSuccess(res))
      }else{
        console.log('마이페이지 글 불러오기 실패')
      }
    })
    .catch(err=> console.log(err))
  }
}