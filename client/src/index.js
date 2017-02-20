import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import App from './components/app';
import Signin from './components/auth/Signin';
import Home from './components/Home';
import thunk from 'redux-thunk';
import reducers from './reducers';
import '../node_modules/toastr/build/toastr.min.css';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);


const routes = (
  <Router history={browserHistory}>
    <Route path='/' IndexRoute={Home} component={App}>
      <Route path='/signin' component={Signin}/>
    </Route>
  </Router>
)


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    {routes}
  </Provider>
  , document.querySelector('.container'));
