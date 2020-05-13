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
        const error = err.response.data && err.response.data.error || err.response.statusText;
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
        const error = err.response.data && err.response.data.error || err.response.statusText;
        return Promise.reject(error);
    });
    
}

function handleResponse(response) {
    const data = response.data;
    // console.log(data);
    // if (response.status !== 200) {
    //     if (response.status === 401) {
    //         userService.logout();
    //         window.location.reload(true)
    //     }
    //     const error = (data && data.message) || response.statusText;
    //     return Promise.reject(error);
    // }
    return data;
}