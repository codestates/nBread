import { SHOW_MY_OPEN_LIST_SUCCESS } from "./types";


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
    default: return state;
  }
}

export default myPostsReducer;

