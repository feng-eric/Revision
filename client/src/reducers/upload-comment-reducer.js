import { commentActionConstants } from '../constants';

export function uploadComment(state= {}, action) {
    switch(action.type) {
        case commentActionConstants.UPLOAD_COMMENT_REQUEST:
            return {
                uploadingComment: true
            };
        case commentActionConstants.UPLOAD_COMMENT_SUCCESS:
            return {
                uploadedComment: true,
                comment: action.comment
            };
        case commentActionConstants.UPLOAD_COMMENT_FAILURE:
            return {
                error: action.error
            };
        default: 
            return state
    }
}