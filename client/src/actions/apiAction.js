import {FETCH_API_VERSION_SUCCESS} from './actionTypes';
import axios from 'axios';
import toastr from 'toastr';
const API_URL = 'http://localhost:3001/api/';

function fetchApiVersionSuccess(version){
  return{
    type:FETCH_API_VERSION_SUCCESS,
    version
  };
}
export function fetchApiVersion(){
  return function(dispatch){
    axios.get(API_URL,{
      headers:{'x-auth':localStorage.getItem('token')}
    }).then((data)=>{
      dispatch(fetchApiVersionSuccess(data.data.version));
    }).catch((e)=>{
      if(e.response){
        toastr.error(e.response.data.error);
        if(e.response.status === 401){
          // delete localstorage
          localStorage.removeItem('token');
          localStorage.removeItem('auth');
          // redirect user to login
        }
      }else{
        toastr.error('服务暂时不可用');
      }
    });
  };
}
