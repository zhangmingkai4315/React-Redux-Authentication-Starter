import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import {AUTH_USER} from './actions/actionTypes';
import '../style/style.css';
import '../node_modules/toastr/build/toastr.min.css';

import configStore from './store';
const store = configStore();
const token = localStorage.getItem('token');
const auth_data = JSON.parse(localStorage.getItem('auth_data'));
if(token){
  // 如果用户token存在则更新用户的登录状态
  store.dispatch({type:AUTH_USER,payload:Object.assign({},auth_data,{token,authenticate:true})});
}

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>
, document.querySelector('.container'));
