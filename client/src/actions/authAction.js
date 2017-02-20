import {SIGNIN_USER,AUTH_USER} from './actionTypes';
import axios from 'axios';
import toastr from 'toastr';
import {browserHistory} from 'react-router';
const ROOT_URL = 'http://localhost:3001';
function authSuccess(data){
  return {
    type:AUTH_USER,
    payload:Object.assign({},data,{authenticate:true})
  };
}
export function signinUser({email,password}){
  // 提交用户的认证信息到服务器，需要使用redux-thunk完成异步请求 
  // 认证成功，返回用户信息，保存jwt，重定向用户到route
  // 认证失败， 显示错误信息
  return function(dispatch){
    axios.post(`${ROOT_URL}/signin`,{email,password})
         .then((data)=>{
           toastr.success('Log in success');
           dispatch(authSuccess(data.data));
           browserHistory.push('/profile');
         }).catch(()=>{
           toastr.error('Log in Fail');
         });
  };
}