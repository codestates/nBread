import { SHOW_MY_APPLY_LIST_SUCCESS } from "./types";

const myApplyInitialState = {
  posts:[]
}

const myApplyPostsReducer = (state=myApplyInitialState, action) => {
  switch(action.type){
    case SHOW_MY_APPLY_LIST_SUCCESS:
      // console.log('지원액션페이로드',action.payload)
      const data = action.payload;
      return {
        ...state,
        posts: data,
      }
    default: return state;
  }
}

export default myApplyPostsReducer;