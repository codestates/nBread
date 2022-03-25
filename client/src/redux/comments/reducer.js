import { FETCH_COMMENTS, FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from "./types";

const initialState = {
  items: [],
  loading: false,
  err: null
}

const commentsReducer = (state=initialState, action) => {
  switch(action.type){
    case FETCH_REQUEST: 
      return {
        ...state,
        loading: true,
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      }
    case FETCH_FAILURE:
      return {
        ...state,
        err: action.payload,
        loading: false,
      }
    default: return state;
  }
}

export default commentsReducer