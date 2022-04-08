import { WRITING_POST_SUCCESS, WRITING_POST_FAILURE } from "./types";
import {postInitialState} from '../posts/reducer'

const writingPostInitialState = {
  posts: []
}
// console.log('postInitialState',postInitialState)

const writingPostsReducer = (state=postInitialState, action) => {
  switch(action.type){
    case WRITING_POST_SUCCESS:
      let newPost = action.payload;
      // console.log('writing',newPost)
      return {
        ...state, 
        newPost,
      }
    case WRITING_POST_FAILURE:
      return {
        ...state,
        posts: null,
      }
    default: return state;
  }
}

export default writingPostsReducer;