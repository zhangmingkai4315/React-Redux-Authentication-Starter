import React from 'react'; // eslint-disable-line no-unused-vars
import {Router,Route,browserHistory, IndexRoute} from 'react-router';
import App from './components/App';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import Home from './components/Home';
// auth组件用于认证页面的用户访问限制
import auth from './components/auth/auth';
import Profile from './components/protected/Profile';
const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component = {Home}/>
      <Route path='/signin' component={Signin}/>
      <Route path='/signout' component={Signout}/>
      <Route path='/signup' component={Signup}/>
      <Route path='/profile' component={auth(Profile)}/>
    </Route>
  </Router>
);

export default routes;