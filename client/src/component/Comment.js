import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments } from '../redux/comments/actions'

function Comment(props) {
  const dispatch = useDispatch()
  const comment = useSelector((state)=> state.commentsReducer.items)
  console.log('comment',comment)
  const commentList = comment.map(comment => {
    return( 
    <div key={comment.id}>
      <h3>{comment.name}</h3>
      <p>{comment.email}</p>
      <p>{comment.body}</p>
    </div>)
  })

  // useEffect(()=>{
  //   dispatch(fetchComments())
  // }, [])


  return (
    <div>
      <p>comment: {commentList}</p>
      <button onClick={()=>dispatch(fetchComments())} >클릭</button>
    </div>
  );
}

export default Comment;