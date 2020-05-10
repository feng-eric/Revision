import { commentActionConstants } from '../constants';
import { commentService } from '../services';
import { alertActions } from './';

export const commentActions = {
    getCommentsByDocId,
    uploadComment
};

function uploadComment(docId, name, comment) {
    return dispatch => {
        console.log('test')
        dispatch(request({ docId }));

        commentService.uploadComment(docId, name, comment)
            .then( 
                comment => { 
                    dispatch(success(comment));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }


    function request(docId) { return { type: commentActionConstants.UPLOAD_COMMENT_REQUEST, docId }}
    function success(comment) { return { type: commentActionConstants.UPLOAD_COMMENT_SUCCESS, comment }}
    function failure(error) { return { type: commentActionConstants.UPLOAD_COMMENT_FAILURE, error } }
}

function getCommentsByDocId(docId) {
    return dispatch => {
        dispatch(request({ docId }));

        commentService.getCommentsByDocumentId(docId)
            .then(
                comments => {
                    dispatch(success(comments))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }

    function request(docId) { return { type: commentActionConstants.GET_BY_DOC_ID_REQUEST, docId }}
    function success(comments) { return { type: commentActionConstants.GET_BY_DOC_ID_SUCCESS, comments }}
    function failure(error) { return { type: commentActionConstants.GET_BY_DOC_ID_FAILURE, error } }

}