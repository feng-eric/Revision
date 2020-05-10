import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UploadDocument } from '.';

import { userActions } from '../actions';
import { documentActions } from '../actions';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card';

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
        console.log(documents)
        return (
            <>
                <Navbar bg="light" className="mb-5" sticky="top">
                    <Navbar.Brand href="/">
                        <h2 className="ml-3">Revision</h2>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: {user.user.name}
                        </Navbar.Text>
                        <Link to="/login" className="btn btn-link">
                            <Button variant="outline-primary">
                                Logout
                            </Button>
                        </Link>
                    </Navbar.Collapse>
                </Navbar>
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header as="h4">My Documents</Card.Header>
                                {documents.loadingDocuments && <em>Loading documents...</em>}
                                {documents.error && <span className="text-danger">ERROR: {documents.error}</span>}
                                {documents.documents &&
                                    <ListGroup variant="flush">
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
                            </Card>
                        </Col>
                       
                        <Col>
                            <UploadDocument></UploadDocument>
                        </Col>
                    </Row>
                </Container>
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