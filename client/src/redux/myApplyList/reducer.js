import { SHOW_MY_APPLY_LIST_SUCCESS, SHOW_MY_APPLY_LIST_Fail } from "./types";

const myApplyInitialState = {
  posts:[]
}

const myApplyPostsReducer = (state=myApplyInitialState, action) => {
  switch(action.type){
    case SHOW_MY_APPLY_LIST_SUCCESS:
      const data = action.payload;
      return {
        ...state,
        posts: data,
      }
    case SHOW_MY_APPLY_LIST_Fail:
      return {
        ...state,
      }
    default: return state;
  }
}

export default myApplyPostsReducer;