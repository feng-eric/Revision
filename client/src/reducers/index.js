import { combineReducers } from 'redux';

import { authentication } from './authentication-reducer';
import { registration } from './registration-reducer';
import { users } from './users-reducer';
import { documents } from './document-reducer';
import { alert } from './alert-reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    documents,
    alert
});
  
export default rootReducer;