import { authHeader } from '../helpers';
import axios from 'axios';

export const documentService = {
    uploadDocument,
    getDocumentsByUser
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

function handleResponse(response) {
    const data = response.data;
    if (response.status !== 200) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
}