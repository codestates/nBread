import { SHOW_POST_LIST , RESET_POST_LIST, DELETE_POST_LIST} from "./types";


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
    default: return state;
  }
}

// 글 생성 조회 수정 삭제 실패
export default postsReducer;


// const postsReducer = (state=postInitialState, action) => {
//   switch(action.type){
//     case SHOW_POST_LIST:
//       let post = action.payload;
//       return {
//         ...state, 
//         posts: post,
//       }
//     default: return state;
//   }
// }
