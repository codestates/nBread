import { SHOW_POST_LIST } from "./types";


const postInitialState = {
  posts:[]
}


const postsReducer = (state=postInitialState, action) => {
  switch(action.type){
    case SHOW_POST_LIST:
      let post = action.payload;
      return {
        ...state, 
        posts: post,
      }
    default: return state;
  }
}

// 글 생성 조회 수정 삭제 실패
export default postsReducer;