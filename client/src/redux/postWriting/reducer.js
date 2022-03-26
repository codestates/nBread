import { WRITING_POST_SUCCESS, WRITING_POST_FAILURE } from "./types";

const writingPostInitialState = {
  posts: []
}

const writingPostsReducer = (state=writingPostInitialState, action) => {
  switch(action.type){
    case WRITING_POST_SUCCESS:
      let post = action.payload;
      return {
        ...state, 
        posts: post,
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