import { authHeader, history } from '../helpers';
import axios from 'axios';

export const commentService = {
    getCommentsByDocumentId,
    uploadComment
};

function uploadComment(docId, name, comment) {
    return axios({
        method: 'POST',
        url: '/comments/upload/' + docId, 
        headers: authHeader(),
        data: {
            name: name,
            text: comment
        }
    })
    .then(handleResponse)
    .catch(err => {
        if (err.response.status === 401) {
            history.push('/login');
            // window.location.reload(true);
        }
        const error = (err.response.data && err.response.data.error) || (err.response.statusText);
        return Promise.reject(error);
    })
}

function getCommentsByDocumentId(docId) {
    return axios.get('/comments/doc/' + docId, {
        headers: authHeader()
    })
    .then(handleResponse)
    .catch(err => {
        if (err.response.status === 401) {
            history.push('/login');
            // window.location.reload(true);
        }
        const error = (err.response.data && err.response.data.error) || (err.response.statusText);
        return Promise.reject(error);
    });
    
}

// separate method for logging out info easily for development
function handleResponse(response) {
    return response.data;
}