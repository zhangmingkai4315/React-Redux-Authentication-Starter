import { combineReducers } from 'redux';
import { reducer as form} from 'redux-form';
import authReducer from './auth_reducer';
import version from './api_version_reducer';
const rootReducer = combineReducers({
  form,
  auth:authReducer,
  version
});

export default rootReducer;
