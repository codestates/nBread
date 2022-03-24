import { combineReducers } from "redux";
import subscribersReducer from "./subscribers/reducer";
import commentsReducer from "./comments/reducer";

const rootReducer = combineReducers({
  subscribersReducer,
  commentsReducer
})

export default rootReducer