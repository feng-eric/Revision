import { documentActionConstants } from '../constants';
import { documentService } from '../services';
import { alertActions } from './';

export const documentActions = {
    uploadDocument,
    getDocumentsByUser,
    getDocumentById
};

function uploadDocument(userId, documentName, selectedFile, description) {
    return dispatch => {
        dispatch(request({ userId }));

        var formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('description', description)

        documentService.uploadDocument(userId, documentName, formData)
            .then(
                () => {
                    dispatch(success(userId));
                    window.location.reload();
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }

    function request(userId) { return { type: documentActionConstants.UPLOAD_REQUEST, userId }}
    function success(userId) { return { type: documentActionConstants.UPLOAD_SUCCESS, userId }}
    function failure(error) { return { type: documentActionConstants.UPLOAD_FAILURE, error } }
}

function getDocumentsByUser(userId) {
    return dispatch => {
        dispatch(request({ userId }));

        documentService.getDocumentsByUser(userId)
            .then( 
                documents => {
                    dispatch(success(documents))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }

    function request(userId) { return { type: documentActionConstants.GET_BY_USER_REQUEST, userId }}
    function success(documents) { return { type: documentActionConstants.GET_BY_USER_SUCCESS, documents }}
    function failure(error) { return { type: documentActionConstants.GET_BY_USER_FAILURE, error } }

    
}

function getDocumentById(docId) {
    return dispatch => {
        dispatch(request({ docId }));

        documentService.getDocumentById(docId)
            .then(
                document => {
                    dispatch(success(document))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )

        function request(docId) { return { type: documentActionConstants.GET_BY_ID_REQUEST , docId }}
        function success(document) { return { type: documentActionConstants.GET_BY_ID_SUCCESS, document }}
        function failure(error) { return { type: documentActionConstants.GET_BY_ID_FAILURE , error }}
    }
}