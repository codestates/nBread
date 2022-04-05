import {SHOW_MY_APPLY_LIST_SUCCESS} from "./types";
import axios from 'axios';

const showMyApplyListSuccess = (myPost) => {
  const MyPosts = myPost.data.app
  // console.log('posts',MyPosts)
  return {
    type : SHOW_MY_APPLY_LIST_SUCCESS,
    payload : MyPosts,
  }
}


// 마이페이지 리스트 불러오기
export const showMyPageApplyList = () => {
  // console.log('contentId',contentId)
  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/users`, {withCredentials:true})
    .then(res => {
      // console.log('res-----', res)
      if(res.status === 200){
        dispatch(showMyApplyListSuccess(res))
      }else{
        console.log('마이페이지 지원글 불러오기 실패')
      }
    })
    .catch(err=> console.log(err))
  }
}