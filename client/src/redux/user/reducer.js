import { LOG_IN_SUCCESS,LOG_IN_REQUEST,LOG_IN_FAILURE } from "./types"

const loginInitialState = {
  isLogIn: false,
  data:[]
}

const loginReducer = (state=loginInitialState, action) => {
  switch(action.type){
    case LOG_IN_SUCCESS:
      let data = action.payload;
      // console.log('reducerpost',data)
      return {
        ...state, 
        data: data,
        isLogIn: true
      }
      case LOG_IN_REQUEST:
        return {
          ...state
        }
        case LOG_IN_FAILURE:
          return {
            ...state, 
            data: data,
            isLogIn: true
          }
    default: return state;
  }
}

export default loginReducer;