import { ADD_SUBSCRIBER, REMOVE_SUBSCRIBER } from "./types"
import axios from 'axios';

export const addSubscriber = () => {
  return {
    type: ADD_SUBSCRIBER
  }
}

export const removeSubscriber = () => {
  return  {
    type: REMOVE_SUBSCRIBER
  }
}