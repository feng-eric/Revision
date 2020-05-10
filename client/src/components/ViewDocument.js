import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { documentActions, commentActions } from '../actions';
import { history } from '../helpers';
import * as moment from 'moment';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Document, Page } from "react-pdf/dist/entry.webpack";

class ViewDocument extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            numPages: null,
        }

        this.returnToPreviousPage = this.returnToPreviousPage.bind(this);
        this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
    }

    componentDidMount() {
        let pathName = this.props.location.pathname;
        let docId = pathName.replace("/document/", "")
        this.props.getDocumentById(docId)
    }

    returnToPreviousPage() {
        history.goBack();
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
        const { documents } = this.props;
        const docId = documents.document._id;
        this.props.getCommentsByDocId(docId)

    }

    render() {
        const { user, documents, comments } = this.props;
        const { numPages } = this.state;
    
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
                    {/* <div style = {{
                        display: 'flex',
                        justifyContent: 'center',
                    }}> */}
                    <Row className="justify-content-center">
                        { documents.document &&
                            <Card>
                                <Card.Header> 
                                    <h5>Document Name: { documents.document.document_name } </h5>
                                    <h6>Description: { documents.document.description }</h6>
                                    <h6>Created: {moment(documents.document.createdAt).format('MMM Do YYYY')}</h6>

                                </Card.Header>
                                <Card.Body>
                                    <Document
                                        file = {documents.document.fileLink}
                                        onLoadError={console.error}
                                        onLoadSuccess={this.onDocumentLoadSuccess}
                                    >
                                        {
                                            Array.from(
                                                new Array(numPages),
                                                (el, index) => (
                                                    <Page
                                                        key={`page_${index + 1}`}
                                                        pageNumber={index + 1}
                                                        scale='1.5'
                                                    />
                                                ),
                                            )
                                        }
                                    </Document>
                                </Card.Body>
                            </Card>
                        }
                    </Row>
                    <Row className="mt-4">
                        <Col>
                        {comments.loadingDocuments && <em>Loading Comments...</em>}
                        {comments.error && <span className="text-danger">ERROR: {comments.error}</span>}
                        {comments.comments &&
                            <div>
                                {comments.comments.map((comment) => 
                                    <Card className="mb-4" key={comment._id}>
                                        <Card.Header>
                                            <a> { comment.name }  </a>
                                            <a className="float-right">{moment(comment.createdAt).format('MMM Do YYYY')}</a>
                                        </Card.Header>
                                        <Card.Body>
                                            {comment.text}
                                        </Card.Body>
                                    </Card>
                                )}
                            </div>
                        }   
                        </Col>
                    </Row>
            </Container>
            </>

          )
    }
}

function mapState(state) {
    const { authentication, documents, comments } = state;
    const { user } = authentication;
    return { user, documents, comments };
}

const actionCreators = {
    getDocumentById: documentActions.getDocumentById,
    getCommentsByDocId: commentActions.getCommentsByDocId
}

const connectedViewDocument = connect(mapState, actionCreators)(ViewDocument)
export { connectedViewDocument as ViewDocument };

