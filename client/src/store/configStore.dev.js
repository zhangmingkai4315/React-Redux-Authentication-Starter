import {createStore,applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
const logger = createLogger();
export default function configStore(initialState){
  return createStore(rootReducer,initialState,applyMiddleware(
    reduxImmutableStateInvariant(),
    thunk,
    logger));
}