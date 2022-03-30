import { 
  LOG_IN_SUCCESS,
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_OUT_SUCCESS,
  USER_DELETE,
  USER_SIGNUP,
  USER_EDIT,
  LOGIN_MODAL
} from "./types"
import axios from "axios"

const loginSuccess = (data) => {
  //------------------data를 어떻게 받을것인지 회원수정이랑 맞출것
  console.log(data)
  return {
    type : LOG_IN_SUCCESS,
    payload: data
  }
}

const loginRequest = () => {
  // console.log('logindata',data)
  return {
    type : LOG_IN_REQUEST
  }
}

const loginFailure = (err) => {
  // console.log('logindata',data)
  return {
    type : LOG_IN_FAILURE,
    payload: err
  }
}

const logoutSuccess = () => {
  return {
    type : LOG_OUT_SUCCESS,
  }
}
//회원탈퇴 테스트
const userDelete = () => {
  return {
    type : USER_DELETE
  }
}

//회원가입
const userSignUp = (data) => {
  return {
    type : USER_SIGNUP,
    payload: data
  }
}

//회원수정
const userEdit = (data) => {
  console.log('뭐가 들어왔냐?', data)
  return {
    type : USER_EDIT,
    payload: data
  }
}

//로그인 모달
const LoginModal = () => {
  return {
    type : LOGIN_MODAL
  }
}

//-----------로그인-------------------
export const axiosLogin = (user) => {
  // console.log('loginInfo',loginInfo)
  return (dispatch) => {
  dispatch(loginRequest())
  axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
  username: user.username,
  password: user.password
  },{withCredentials: true})
  // .then(data => console.log('data',data))
  .then(data => {
  if(data.data.message === "로그인 성공"){
  console.log('로그인 성공',data.data.data.nickname )
  dispatch(loginSuccess(data.data.data))
  }else {
  console.log('로그인 실패', )
  }
  })
  .catch(err=> dispatch(loginFailure(err)))
  }
  }
//-----------로그아웃-------------------
  export const axiosLogout = () => {
    return (dispatch) => {
      console.log('dkanrjsk')
    axios.post(`${process.env.REACT_APP_API_URL}/users/logout`,{},{withCredentials: true})
    .then(res => {
      console.log('res222222',res)
    dispatch(logoutSuccess())
    })
    .catch(err=> console.log(err))
    }
    }
//-----------회원탈퇴-------------------
export const axiosUserDelete = () => {
  return (dispatch) => {
  axios.delete(`${process.env.REACT_APP_API_URL}/users`,{withCredentials: true})
  .then(res => {
    console.log('res',res)
  dispatch(userDelete())
  })
  .catch(err=> console.log(err))
  }
  }

  //-----------회원가입-------------------
export const axiosUserSignUp = (data) => {
  return (dispatch) => {
  axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, {
    username: data.username,
    password: data.password,
    nickname: data.nickname,
    // phoneNumber: loginInfo.phoneNumber
    },{},{withCredentials: true})
  .then(res => {
    if(res.status===200){
      console.log('회원가입완료')
      dispatch(userSignUp(data))
    }
  })
  .catch(err=> console.log(err))
  }
  }
  //-----------회원수정-------------------
  export const axiosUserEdit = (data) => {
    console.log('2222',data)
    return (dispatch) => {
    dispatch(userEdit(data))
    
    axios.patch(`${process.env.REACT_APP_API_URL}/users/:userId`, {
      
      nickname: data.nickname,
      password: data.password
      // phoneNumber: loginInfo.phoneNumber
      
      } ,{withCredentials: true})
    .then(data => {
      
      if(data.status===200){
        console.log('수정완료')
        dispatch(userEdit(data))
        
      }else{
        console.log('err')
      }
    
    })
    .catch(err=> console.log(err))
    }
    }

