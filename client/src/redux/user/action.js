import Swal from 'sweetalert2'

import { 
  LOG_IN_SUCCESS,
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_OUT_SUCCESS,
  USER_DELETE,
  USER_SIGNUP,
  USER_EDIT,
  LOGIN_MODAL,
  PROFILE_IMAGE_EDIT,
  PROFILE_IMAGE_DELETE
} from "./types"
import axios from "axios"

const loginSuccess = (data) => {
  // console.log('데이타',data)
  //------------------data를 어떻게 받을것인지 회원수정이랑 맞출것
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
  // console.log('뭐가 들어왔냐?', data)
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

//프로필사진 수정
const ProfileImageEdit = (data) => {
  return {
    type : PROFILE_IMAGE_EDIT,
    payload: data
  }
}

//프로필사진 삭제
const ProfileImageDelete = () => {
  return {
    type : PROFILE_IMAGE_DELETE
  }
}

//-----------로그인-------------------
export const axiosLogin = (user) => {
  console.log('loginInfo',user)
  return (dispatch) => {
  axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
  username: user.username,
  password: user.password
  },{withCredentials: true})
  .then(data => {
  if(data.data.message === "로그인 성공"){
  dispatch(loginSuccess(data.data.data))
  } else if(data.data.message === '아이디 또는 비밀번호가 일치하지 않습니다'){
    Swal.fire('아이디 또는 비밀번호가 일치하지 않습니다')
  }
  else {
  console.log('로그인 실패', )
  }
  })
  .catch(err=> dispatch(loginFailure(err)))
  }
  }
//-----------로그아웃-------------------
  export const axiosLogout = () => {
    return (dispatch) => {
    axios.post(`${process.env.REACT_APP_API_URL}/users/logout`,{},{withCredentials: true})
    .then(res => {
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
    // console.log('res',res)
  dispatch(userDelete())
  })
  .catch(err=> console.log(err))
  }
  }

  //-----------회원가입-------------------
export const axiosUserSignUp = (data) => {
  return (dispatch) => {
  axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, {
    id:data.id,
    username: data.username,
    password: data.password,
    phone_number: data.phone_number,
    address: data.address,
    nickname: data.nickname
    },{},{withCredentials: true})
  .then(res => {
    // console.log('회원가입',res)
    if(res.status===200){
      // console.log('회원가입완료')
      dispatch(userSignUp(data))
    }
  })
  .catch(err=> console.log(err))
  }
  }
  //-----------회원수정-------------------
  export const axiosUserEdit = (data) => {
    // console.log('2244445454522',data)
    return (dispatch) => {
    dispatch(userEdit(data))
    axios.patch(`${process.env.REACT_APP_API_URL}/users`, {
    id:data.id,
    picture:data.picture,
    nickname:data.nickname,
    phone_number:data.phone_number,
    address:data.address,
    password:data.password,
    passwordCheck:data.passwordCheck,
    username:data.username
      } ,{withCredentials: true})
    .then(data => {
      
      if(data.status===200){
        // console.log('수정완료')
        dispatch(userEdit(data.data.data))
        
      }else{
        // console.log('err')
      }
    
    })
    .catch(err=> console.log(err))
    }
    }

//-----------프로필사진변경-------------------
export const axiosProfileImageEdit = (data) => {
  // console.log('프로필사진 변경 데이타',data)
  return (dispatch) => {
    if(data){
      // console.log('수정완료')
      dispatch(ProfileImageEdit(data))
    }else{
      // console.log('err')
    }
  }
  }

  //-----------프로필사진삭제-------------------
export const axiosProfileImageDelete = () => {
  return (dispatch) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/users/picture`,{withCredentials: true})
    .then(res => {
      // console.log('res',res)
    dispatch(ProfileImageDelete())
    })
    .catch(err=> console.log(err))
    }
  }