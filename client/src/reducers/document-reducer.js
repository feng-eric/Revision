import { documentActionConstants } from '../constants';

export function documents(state = {}, action) {
    switch(action.type)  {
        case documentActionConstants.UPLOAD_REQUEST:
            return {
                ...state,
                uploadingDocument: true,
                userId: action.userId
            };
        case documentActionConstants.UPLOAD_SUCCESS:
            return {
                ...state,
                uploadedDocument: true,
                userId: action.userId
            };
        case documentActionConstants.UPLOAD_FAILURE:
            return {
                error: action.error
            }
        case documentActionConstants.GET_BY_USER_REQUEST:
            return {
                loadingDocuments: true
            };
        case documentActionConstants.GET_BY_USER_SUCCESS:
            return {
                documents: action.documents
            };
        case documentActionConstants.GET_BY_USER_FAILURE:
            return {
                error: action.error
            };
        default: 
            return state
    }
}