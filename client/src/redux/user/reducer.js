import { LOG_IN_SUCCESS } from "./types"

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
    default: return state;
  }
}

export default loginReducer;