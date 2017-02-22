import {AUTH_USER,AUTH_USER_ERROR,UNAUTH_USER} from './actionTypes';
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
           toastr.success('登录成功');
           data.data.error=null;
           localStorage.setItem('auth_data',JSON.stringify(data.data));
           dispatch(authSuccess(data.data));
           if(data.data.token){
             localStorage.setItem('token',data.data.token);
           }
           browserHistory.push('/profile');
         }).catch((e)=>{
           let errorMessage = (e.response&&e.response.data.error)||'服务器暂时无响应，请稍后再试';
           toastr.error(errorMessage);
         });
  };
}


export function authError(error){
  return {
    type:AUTH_USER_ERROR,
    error
  };
}

function signoutSuccess(){
  return {
    type:UNAUTH_USER
  };
}
export function signoutUser(){
  // console.log('sign out');
  let token = localStorage.getItem('token');
  return function(dispatch){
    axios.request({
      url:`${ROOT_URL}/signout`,
      method:'get',
      headers: {'x-auth': token},
    }).then(()=>{
      toastr.success('退出登录');
      localStorage.removeItem('token');
      localStorage.removeItem('auth_data');
      dispatch(signoutSuccess());
    }).catch((e)=>{
      let errorMessage = e.data&&e.data.error;
      dispatch(authError(errorMessage));
    });
  };
}


export function signupUser({email,password}){
  // 提交用户的注册信息到服务器
  // 认证成功，返回用户信息，保存jwt，重定向
  // 认证失败， 显示错误信息
  return function(dispatch){
    axios.post(`${ROOT_URL}/signup`,{email,password})
         .then((data)=>{
           toastr.success('登录成功');
           data.data.error=null;

           dispatch(authSuccess(data.data));
           if(data.data.token){
             localStorage.setItem('auth_data',JSON.stringify(data.data));
             localStorage.setItem('token',data.data.token);
           }
           browserHistory.push('/profile');
         }).catch((e)=>{
           let errorMessage = (e.response&&e.response.data.error)||'服务器暂时无响应，请稍后再试';
           toastr.error(errorMessage);
         });
  };
}
