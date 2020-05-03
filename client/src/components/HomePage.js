import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class HomePage extends Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleLogOut() {
        console.log("LOGOUT WAS INITIATED")
        let user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
        this.props.logout();
    }

    handleDeleteUser(id) {
        this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        console.log(user);
        console.log(users)
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.name}!</h1>
                <p>You're logged in.</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user) =>
                            <li key={user.email}>
                                {user.name + ' ' + user.email}
                                {/* {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                } */}
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login" className="btn btn-link">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    logout: userActions.logout,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };