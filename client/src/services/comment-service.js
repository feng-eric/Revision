import { authHeader } from '../helpers';
import axios from 'axios';

import { userService } from './';

export const commentService = {
    getCommentsByDocumentId
};

function uploadComment(docId, name, comment) {

}

function getCommentsByDocumentId(docId) {
    return axios.get('http://localhost:8000/comments/doc/' + docId, {
        headers: authHeader()
    })
    .then(handleResponse);
    
}

function handleResponse(response) {
    const data = response.data;
    console.log(data);
    if (response.status !== 200) {
        if (response.status === 401) {
            userService.logout();
            window.location.reload(true)
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
}