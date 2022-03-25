import { LOG_IN_SUCCESS } from "./types"
import axios from "axios"

const loginSuccess = (data) => {
  // console.log('logindata',data)
  return {
    type : LOG_IN_SUCCESS,
    payload: data
  }
}

export const axiosLogin = (loginInfo) => {
  // console.log('loginInfo',loginInfo)
  return (dispatch) => {
    axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
      username: loginInfo.username,
      password: loginInfo.password
    })
    // .then(data => console.log('data',data))
    .then(data => dispatch(loginSuccess(data)))
    .catch(err=> console.log(err))
  }
}