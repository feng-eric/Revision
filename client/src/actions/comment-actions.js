import { commentActionConstants } from '../constants';
import { commentService } from '../services';
import { alertActions } from './';

export const commentActions = {
    getCommentsByDocId
};

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