import {AUTH_USER} from '../actions/actionTypes';
export default function(state={},action){
  switch(action.type){
  case AUTH_USER:
    return Object.assign({},state,action.payload);
  default:
    return state;
  }
}