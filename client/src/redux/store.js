import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; 
// import subscribersReducer from './subscribers/reducer';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';


const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk)))

export default store