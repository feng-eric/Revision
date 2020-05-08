import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UploadDocument } from '.';

import { userActions } from '../actions';
import { documentActions } from '../actions';

import ListGroup from 'react-bootstrap/ListGroup'

class HomePage extends Component {
    componentDidMount() {
        let userId = this.props.user.user._id;
        this.props.getDocumentsByUser(userId)
    }

    handleLogOut() {
        this.props.logout();
    }

    handleDeleteUser(id) {
        this.props.deleteUser(id);
    }

    render() {
        const { user, documents } = this.props;
        return (
            <>
                <h1>Hi {user.user.name}!</h1>
                <p>You're logged in.</p>
                <p>
                    <Link to="/login" className="btn btn-link">Logout</Link>
                </p>
                <UploadDocument></UploadDocument>
                <h3>Documents:</h3>
                {documents.loadingDocuments && <em>Loading documents...</em>}
                {documents.error && <span className="text-danger">ERROR: {documents.error}</span>}
                {documents.documents &&
                    <ListGroup>
                        {documents.documents.map((doc) => 
                            <ListGroup.Item action variant="light" key={doc._id}>
                                <Link to={{
                                    pathname: "/document/" + doc._id,
                                    state: {
                                        documentId: doc._id
                                    }
                                }}>{doc.document_name + ' ' + doc.description}</Link>
                            </ListGroup.Item>
                            
                        )}
                    </ListGroup>
                }


            </>
        );
    }
}

function mapState(state) {
    const { authentication, documents } = state;
    const { user } = authentication;
    return { user, documents };
}

const actionCreators = {
    getUsers: userActions.getAll,
    logout: userActions.logout,
    deleteUser: userActions.delete,
    getDocumentsByUser: documentActions.getDocumentsByUser
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };