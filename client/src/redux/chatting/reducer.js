import { SHOW_CHATTING_DETAIL } from "./type";


const chattingInitialState = {
  data:[]
};

const chattingReducer = (state=chattingInitialState, action) => {
  switch(action.type){
    case SHOW_CHATTING_DETAIL:
      return {
        ...state, 
        data: action.payload,
      }
    
    default: return state;
  }
}

export default chattingReducer


