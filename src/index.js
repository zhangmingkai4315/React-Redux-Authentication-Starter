import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import App from './components/app';
import Signin from './components/auth/Signin';
import thunk from 'redux-thunk';
import reducers from './reducers';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);


const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/signin' component={Signin}/>
    </Route>
  </Router>
)


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    {routes}
  </Provider>
  , document.querySelector('.container'));
