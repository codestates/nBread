import { FETCH_COMMENTS, FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from "./types";

const fetchCommentSuccess = (comment) => {
  return {
    type : FETCH_SUCCESS,
    payload : comment
  }
} 

const fetchCommentFailure = (err) => {
  return {
    type : FETCH_FAILURE,
    payload : err
  }
} 

const fetchCommentRequest = () => {
  return {
    type : FETCH_REQUEST
  }
} 


export const fetchComments = () => {
  return (dispatch) => {
    dispatch(fetchCommentRequest())
    fetch('https://jsonplaceholder.typicode.com/comments')
    .then(res=>res.json())
    .then(Comment=>dispatch(fetchCommentSuccess(Comment)))
    .catch(err=>dispatch(fetchCommentFailure(err)))
  }
}

