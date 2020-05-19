import { userActionConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll
};

function login(username, password, from) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password) 
            .then(
                user => {
                    dispatch(success(user));
        
                    history.push(from);
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
                (user) => {
                    dispatch(success(user));
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
