import { commentActionConstants } from '../constants';

export function comments(state= {}, action) {
    switch(action.type) {
        case commentActionConstants.GET_BY_DOC_ID_REQUEST:
            return {
                loadingComments: true
            };
        case commentActionConstants.GET_BY_DOC_ID_SUCCESS:
            return {
                comments: action.comments
            };
        case commentActionConstants.GET_BY_DOC_ID_FAILURE:
            return {
                error: action.error
            };  
        default: 
            return state
    }
}