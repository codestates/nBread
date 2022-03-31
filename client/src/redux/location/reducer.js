import { LOCATION_SEARCH_SUCCESS } from "./types";


const locationState = {
  posts: []
}

// const locationReducer= (state=locationState, action) => {
//   switch(action.type){
//     case LOCATION_SEARCH_SUCCESS:
//       console.log('!!!!!!!!locationReducer',action.payload)
//       return{
//         ...state,
//         location: action.payload
//       }
//     default: return state;
//   }
// } 


const locationReducer = (state=locationState, action) => {
  // console.log('actionactionactionactionaction',action.payload)
  switch(action.type){
    case LOCATION_SEARCH_SUCCESS:
      let post = action.payload;
      // console.log("!!!!!!!!!!!!!!!reducerposts console: ", post)
      return {
        ...state, 
        posts: post,
      }
    default: return state;
  }
}



export default locationReducer;
