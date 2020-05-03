import { authHeader } from '../helpers';
import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(email, password) {

    return axios.post('http://localhost:8000/users/login', { 
        email: email,
        password: password
    })
    .then(handleResponse)
    .then(user => {
        console.log('loggedin');
        localStorage.setItem('user', JSON.stringify(user));

        return user;
    });
}

function logout() {
    let auth = authHeader();
    console.log(auth)
    return axios({
        method: 'POST',
        url: 'http://localhost:8000/users/logout',
        headers: authHeader()
    })
    .then(handleResponse)
    .then(() => {
        localStorage.removeItem('user');
    })

}

function getAll() {
    return axios.get('http://localhost:8000/users/all', {
        headers: authHeader()
    })
    .then(handleResponse)
}

function getById(id) {
    console.log("get by id");
}

function register(user) {
    console.log(user);
    return axios.post('http://localhost:8000/users', {
        name: user.name,
        email: user.email,
        password: user.password
    })
    .then(handleResponse);
}

function update(user) {
    console.log('update');
}

function _delete(id) {
    console.log('delete user');
}

function handleResponse(response) {
    console.log('handling...')
    const data = response.data;
    if (response.status !== 200) {
        if (response.status === 401) {
            console.log("handle logout")
            logout();
            window.location.reload(true)
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log(data);
    return data;
}
