import { WRITING_POST_SUCCESS, WRITING_POST_FAILURE } from "./types";
import {postInitialState} from '../posts/reducer'

const writingPostInitialState = {
  posts: []
}

const writingPostsReducer = (state=postInitialState, action) => {
  switch(action.type){
    case WRITING_POST_SUCCESS:
      let newPost = action.payload;
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