import { authHeader } from '../helpers';
import axios from 'axios';

import { userService } from './';

export const documentService = {
    uploadDocument,
    getDocumentsByUser,
    getDocumentById
};

function uploadDocument(userId, documentName, formData) {
    return axios({
        method: 'POST',
        url: 'http://localhost:8000/documents/' + userId + '/upload/' + documentName,
        headers: authHeader(),
        data: formData
    })
    .then(handleResponse)
}

function getDocumentsByUser(userId) {
    
    return axios.get('http://localhost:8000/documents/user/' + userId, {
        headers: authHeader()
    })
    .then(handleResponse);
}

function getDocumentById(docId) {

    return axios.get('http://localhost:8000/documents/' +docId, {
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