import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UploadDocument } from '.';

import { userActions } from '../actions';
import { documentActions } from '../actions';

import { Document, Page } from "react-pdf/dist/entry.webpack";

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
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.name}!</h1>
                <p>You're logged in.</p>
                <UploadDocument></UploadDocument>
                <h3>All Documents:</h3>
                {documents.loadingDocuments && <em>Loading docuemnts...</em>}
                {documents.error && <span className="text-danger">ERROR: {documents.error}</span>}
                {documents.documents &&
                    <ul>
                        {documents.documents.map((doc) => 
                            <li key={doc._id}>
                                {doc.document_name + ' ' + doc.description}
                                <Document
                                file = {doc.fileLink}
                                onLoadError={console.error}
                                onLoadSuccess={console.log}
                                >
                                    <Page pageNumber={1} />
                                </Document>
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