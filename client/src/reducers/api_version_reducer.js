import {FETCH_API_VERSION_SUCCESS} from '../actions/actionTypes';
export default function(state='',action){
  switch(action.type){
  case FETCH_API_VERSION_SUCCESS:
    return action.version;
  default:
    return state;
  }
}
