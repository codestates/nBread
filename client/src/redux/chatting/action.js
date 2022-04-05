import { SHOW_CHATTING_DETAIL } from "./types"
import axios from "axios"

const chattingModal = (data) => {
  return {
    type : SHOW_CHATTING_DETAIL,
    payload: data
  }
}

export const axioschattingModal = (id) => {
  // console.log(id)
  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/chatting/${null}`)
    .then(data => dispatch(chattingModal(data)))
    .catch(err=> console.log(err))
  }
}