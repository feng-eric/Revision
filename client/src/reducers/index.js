import { combineReducers } from 'redux';

import { authentication } from './authentication-reducer';
import { registration } from './registration-reducer';
import { users } from './users-reducer';
import { documents } from './document-reducer';
import { comments } from './comment-reducer';
import { uploadComment } from './upload-comment-reducer';
import { alert } from './alert-reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    documents,
    comments,
    uploadComment,
    alert
});
  
export default rootReducer;