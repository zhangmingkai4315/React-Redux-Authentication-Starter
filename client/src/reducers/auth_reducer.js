import {AUTH_USER,AUTH_USER_ERROR,UNAUTH_USER} from '../actions/actionTypes';
export default function(state={},action){
  switch(action.type){
  case AUTH_USER:
    return Object.assign({},state,action.payload);
  case AUTH_USER_ERROR:
    return Object.assign({},state,{error:action.error,authenticate:false});
  case UNAUTH_USER:
    return {authenticate:false};
  default:
    return state;
  }
}
