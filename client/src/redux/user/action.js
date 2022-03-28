import { LOG_IN_SUCCESS,LOG_IN_REQUEST,LOG_IN_FAILURE } from "./types"
import axios from "axios"

const loginSuccess = (data) => {
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

export const axiosLogin = (loginInfo) => {
  // console.log('loginInfo',loginInfo)
  return (dispatch) => {
    dispatch(loginRequest())
    axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
      username: loginInfo.username,
      password: loginInfo.password
    },{withCredentials: true})
    // .then(data => console.log('data',data))
    .then(data => dispatch(loginSuccess(data)))
    .catch(err=> dispatch(loginFailure(err)))
  }
}