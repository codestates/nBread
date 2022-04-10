import { SHOW_POST_LIST , 
        RESET_POST_LIST, 
        DELETE_POST_LIST, 
        SHOW_MY_OPEN_LIST_SUCCESS,
        SHOW_POST_FAIL,
        DELETE_POST_LIST_FAIL
      } from "./types";


export const postInitialState = {
  posts:[]
}

const postsReducer = (state=postInitialState, action) => {
  switch(action.type){
    case SHOW_POST_LIST:
      let post = action.payload;
	// console.log("reducerposts console: ", post)
      return {
        ...state, 
        posts: post,
      }
    case RESET_POST_LIST:
      return {
        posts: null,
      }
    case DELETE_POST_LIST:
      return {
        ...state
      }
    case SHOW_POST_FAIL:
      return {
        ...state
      }
    // case SHOW_MY_OPEN_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     posts: post,
    //   }
    default: return state;
  }
}

export default postsReducer;

