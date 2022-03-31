import { LOCATION_SEARCH_SUCCESS } from "./types";

const locationSearchSuccess = (post) => {
  // console.log('-----lat',lat )
  // console.log('-----lng',lng )
  // const location = post
  // console.log('locationSearchSuccess',post)
  // const location = post
  // console.log('!!!!!!!!!!',location)
  return {
    type: LOCATION_SEARCH_SUCCESS,
    payload: post,
  }
}



export const locationChange = (lat,lng) => {
  // console.log('locationChange-----lat',lat )
  // console.log('locationChange-----lng',lng )
  const data = [lat,lng]
  return(dispatch) => {
    if(lat){
      dispatch(locationSearchSuccess(data))
    }else{
      console.log('위치 받아오기 실패')
    }
  }
}