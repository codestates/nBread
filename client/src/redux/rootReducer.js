import { combineReducers } from "redux";
import postsReducer from "./posts/reducer";
import postsDetailReducer from "./postList/reducer";
import loginReducer from "./user/reducer";
import writingPostsReducer from "./postWriting/reducer";
import myPostsReducer from "./myposts/reducer";
import myApplyPostsReducer from "./myApplyList/reducer";
import chattingReducer from "./chatting/reducer";

const rootReducer = combineReducers({
  postsReducer,
  postsDetailReducer,
  loginReducer,
  writingPostsReducer,
  myPostsReducer,
  myApplyPostsReducer,
  chattingReducer,
})

export default rootReducer