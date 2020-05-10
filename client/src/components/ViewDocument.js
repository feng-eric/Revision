import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { documentActions } from '../actions';
import { history } from '../helpers';

import Container from 'react-bootstrap/Container'
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
    }

    render() {
        const { user, documents } = this.props;
        const { numPages } = this.state;
        console.log(this.props)
    
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
                <Container fluid>
                    <div style = {{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        { documents.document &&
                            <Card>
                                <Card.Header> 
                                    <h5>Document Name: { documents.document.document_name } </h5>
                                    <h6>Description: { documents.document.description }</h6>
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
                                                    />
                                                ),
                                            )
                                        }
                                    </Document>
                                </Card.Body>
                            </Card>
                        }
                    </div>
            </Container>
            </>

          )
    }
}

function mapState(state) {
    const { authentication, documents } = state;
    const { user } = authentication;
    return { user, documents };
}

const actionCreators = {
    getDocumentById: documentActions.getDocumentById
}

const connectedViewDocument = connect(mapState, actionCreators)(ViewDocument)
export { connectedViewDocument as ViewDocument };

