export const SHOW_POST_LIST_SUCCESS = 'SHOW_POST_LIST_SUCCESS'

const postDetailInitialState = {
  posts:[]
}


const postsDetailReducer = (state=postDetailInitialState, action) => {
  switch(action.type){
    case SHOW_POST_LIST_SUCCESS:
      let post = action.payload.data.data;
      // console.log('reducerpost',post)
      return {
        ...state, 
        posts: post,
      }
    default: return state;
  }
}

// 글 생성 조회 수정 삭제 실패
export default postsDetailReducer;