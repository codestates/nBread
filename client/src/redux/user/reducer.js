import { 
  LOG_IN_SUCCESS,
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_OUT_SUCCESS,
  USER_DELETE,USER_SIGNUP,
  USER_EDIT,
  LOGIN_MODAL,
  PROFILE_IMAGE_EDIT,
  PROFILE_IMAGE_DELETE,
  USER_LOCATION_EDIT_SUCCESS
} from "./types"

const loginInitialState = {
  isLogIn: false,
  data:[],
  SignUp: false,
  LoginModal: false,
  picture:null,
  location: [ 37.49676871972202, 127.02474726969814]
}


const loginReducer = (state=loginInitialState, action) => {
  switch(action.type){
    case LOG_IN_SUCCESS:
      let dato = action.payload;
      return {
        ...state, 
        data: action.payload,
        //리듀서 참고
        isLogIn: true,
        picture: action.payload.picture,
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
          picture:null,
          data:null,
          location: [ 37.49676871972202, 127.02474726969814]
        }
      //회원탈퇴 테스트
      case USER_DELETE:
        return {
          ...state, 
          isLogIn: false,
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
        let data = action.payload
        return {
          ...state, 
          data: action.payload,
          isLogIn: true
        }   
      //로그인 모달    
      case LOGIN_MODAL:
        return {
          ...state, 
          LoginModal: true
        } 
      //프로필 사진
      case PROFILE_IMAGE_EDIT:
        return {
          ...state, 
          picture: action.payload
        }
      //프로필 사진삭제
      case PROFILE_IMAGE_DELETE:
        return {
          ...state, 
          picture: null
        }
      case USER_LOCATION_EDIT_SUCCESS:
        return {
          ...state,
          location: [ action.payload[0], action.payload[1]]
        }
    default: return state;
  }
}

export default loginReducer;