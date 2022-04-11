import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; 
// import subscribersReducer from './subscribers/reducer';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";



const persistConfig = {
  key: "root",
  storage: storage

};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer, 
  composeWithDevTools(applyMiddleware(thunk)))

// const persistor = persistStore(store);

export default store
