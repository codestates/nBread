import axios from 'axios';
import { WRITING_POST_SUCCESS, WRITING_POST_FAILURE } from "./types";
import { useHistory } from 'react-router-dom';

// const history = useHistory();
// history.push('/')

const writingPostSuccess = (post) => {
  console.log('writingSuccess',post)
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
  // console.log('actionPost',post.address)
  return (dispatch) => {
    axios.post(`${process.env.REACT_APP_API_URL}/contents`, {
      address: post.address,
      body: post.body,
      category_food: post.category_food,
      delivery_fee: post.delivery_fee,
      recruitment_personnel: post.delivery_fee,
      restaurant_name: post.restaurant_name
    }, {withCredentials: true})
    .then(data => {
      // const history = useHistory();
      console.log('ressss',data.status)
      if(data.status === 201){
        dispatch(writingPostSuccess(post))
        // history.push('/')
        // alert('글이 성공적으로 작성되었습니다.');
      }else{
        console.log('글쓰기 실패')
      }
    })
    .catch(err=> dispatch(writingPostFailure(err)))
  }
}