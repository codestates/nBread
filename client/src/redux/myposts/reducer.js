import { SHOW_MY_OPEN_LIST_SUCCESS, SHOW_MY_OPEN_LIST_FAIL } from "./types";


const myPostInitialState = {
  posts:[]
}

const myPostsReducer = (state=myPostInitialState, action) => {
  switch(action.type){
    case SHOW_MY_OPEN_LIST_SUCCESS:
      // console.log('dsfsdfsdfsd',action.payload)
      const data = action.payload;
      return {
        ...state,
        posts: data,
      }
    case SHOW_MY_OPEN_LIST_FAIL:
      return {
        ...state,
      }
    default: return state;
  }
}

export default myPostsReducer;

