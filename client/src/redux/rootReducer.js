import { combineReducers } from "redux";
import subscribersReducer from "./subscribers/reducer";
import commentsReducer from "./comments/reducer";
import postsReducer from "./posts/reducer";

const rootReducer = combineReducers({
  subscribersReducer,
  commentsReducer,
  postsReducer
})

export default rootReducer