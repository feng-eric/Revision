import { userActionConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password) 
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    };

    function request(user) { return { type: userActionConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userActionConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userActionConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    
    return { type: userActionConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userActionConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userActionConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userActionConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userActionConstants.GETALL_REQUEST } }
    function success(users) { return { type: userActionConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userActionConstants.GETALL_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        // userService.delete(id)
        //     .then(
        //         user => dispatch(success(id)),
        //         error => dispatch(failure(id, error.toString()))
        //     );

    };

    function request(id) { return { type: userActionConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userActionConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userActionConstants.DELETE_FAILURE, id, error } }
}