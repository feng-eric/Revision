import { authHeader, history } from '../helpers';
import axios from 'axios';

export const documentService = {
    uploadDocument,
    getDocumentsByUser,
    getDocumentById
};

function uploadDocument(userId, documentName, formData) {
    return axios({
        method: 'POST',
        url: '/documents/' + userId + '/upload/' + documentName,
        headers: authHeader(),
        data: formData
    })
    .then(handleResponse)
    .catch(err => {
        if (err.response.status === 401) {
            history.push('/login');
            window.location.reload(true);
        }
        const error = (err.response.data && err.response.data.error) || (err.response.statusText);
        return Promise.reject(error);
    })
}

function getDocumentsByUser(userId) {
    
    return axios.get('/documents/user/' + userId, {
        headers: authHeader()
    })
    .then(handleResponse)
    .catch(err => {
        if (err.response.status === 401) {
            history.push('/login');
            window.location.reload(true);
        }
        const error = (err.response.data && err.response.data.error) || (err.response.statusText);
        return Promise.reject(error);
    })
}

function getDocumentById(docId) {

    return axios.get('/documents/' +docId, {
        headers: authHeader()
    })
    .then(handleResponse)
    .catch(err => {
        if (err.response.status === 401) {
            history.push('/login');
            window.location.reload(true);
        }
        const error = (err.response.data && err.response.data.error) || (err.response.statusText);
        return Promise.reject(error);
    })
}

// separate method for logging out info easily for development
function handleResponse(response) {
   
    return response.data;
}