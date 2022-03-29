import { 
  LOG_IN_SUCCESS,
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_OUT_SUCCESS,
  USER_DELETE,USER_SIGNUP,
  USER_EDIT } from "./types"

const loginInitialState = {
  isLogIn: false,
  data:[],
  SignUp: false
}


const loginReducer = (state=loginInitialState, action) => {
  switch(action.type){
    case LOG_IN_SUCCESS:
      let data = action.payload;
      // console.log('reducerpost',data)
      return {
        ...state, 
        data: action.payload,
        //리듀서 참고
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
      case LOG_OUT_SUCCESS:
        return {
          ...state, 
          isLogIn: false,
          data:null
        }
      //회원탈퇴 테스트
      case USER_DELETE:
        return {
          ...state, 
          data: null
        }
      //회원가입
      case USER_SIGNUP:
        return {
          ...state, 
          SignUp: true
        }
       //회원수정
      case USER_EDIT:
        return {
          ...state, 
          data: action.payload
        }       
    default: return state;
  }
}

export default loginReducer;