import {SIGNIN_USER} from './actionTypes';

export function signinUser({email,password}){
  // 提交用户的认证信息到服务器，需要使用redux-thunk完成异步请求 
  // 认证成功，返回用户信息，保存jwt，重定向用户到route
  // 认证失败， 显示错误信息
  return function(dispatch){
    dispatch()
  };

}