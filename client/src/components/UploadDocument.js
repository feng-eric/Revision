import React, { Component, useState } from 'react';
import { documentActions } from '../actions';
import { connect } from 'react-redux';
import bsCustomFileInput from 'bs-custom-file-input';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import uploadIcon from '../upload.png';

class UploadDocument extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedFile: null,
            documentName: '',
            description: '',
            submitted: false,
            showModal: false
        };

       
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    componentDidMount() {
        bsCustomFileInput.init();
    }
    
    handleFileChange(event) {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    handleChange(event) {
        const { id, value } = event.target;
        this.setState({
            [id]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        if (this.state.selectedFile) {
            const userId = this.props.user.user._id

    
            this.props.uploadDocument(userId, this.state.documentName, this.state.selectedFile, this.state.description);
            this.handleClose();
        }
    }

    handleClose() {
        this.setState({ showModal: false });
    }

    handleOpen() {
        this.setState({ showModal: true });
    }

    
    render() {
        const { selectedFile, documentName, description } = this.state;
        let fileText = selectedFile ? selectedFile.name : "Select File";

        return (
            <>
                <Card>
                    <Card.Header as="h4">
                        <Image src={uploadIcon} className="mr-1" style={{
                            width:25,
                            height: 'auto'
                        }}/>
                        Upload New Document
                    </Card.Header>
                    <Card.Body>
                    {/* <Button variant="primary"  onClick={this.handleOpen}>
                        Upload Document
                    </Button> */}
                    <Form onSubmit={this.handleSubmit}>
                            <Form.Group onChange={this.handleChange} value={documentName} controlId="documentName">
                                <Form.Label>Document Name</Form.Label>
                                <Form.Control required type="text" placeholder="Document Name"/>
                            </Form.Group>
                            <Form.Group value={description} onChange={this.handleChange} controlId="description">
                                <Form.Label>Document Description</Form.Label>
                                <Form.Control type="text" placeholder="Document Description"/>
                            </Form.Group>
                            <Form.Label>Document</Form.Label>
                            <Form.File
                                id="selectedFile"
                                label={fileText}
                                custom
                                onChange={this.handleFileChange}
                            />
                            <div className="text-center mt-4">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                            
                        </Form>
                    </Card.Body>
                    
                </Card>

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Document</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <Form onSubmit={this.handleSubmit}>
                            <Form.Group onChange={this.handleChange} value={documentName} controlId="documentName">
                                <Form.Label>Document Name</Form.Label>
                                <Form.Control required type="text" placeholder="Document Name"/>
                            </Form.Group>
                            <Form.Group value={description} onChange={this.handleChange} controlId="description">
                                <Form.Label>Document Description</Form.Label>
                                <Form.Control type="text" placeholder="Document Description"/>
                            </Form.Group>
                            <Form.Label>Document</Form.Label>
                            <Form.File
                                id="selectedFile"
                                label={fileText}
                                custom
                                onChange={this.handleFileChange}
                            />
                            
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form> */}
                    </Modal.Body>
                </Modal>
            </>
            
        )
    }
}

function mapState(state) {
    const { authentication } = state;
    const { user } = authentication;
    return { user };
}

const actionCreators = {
    uploadDocument: documentActions.uploadDocument
}

const connectedUploadDocument = connect(mapState, actionCreators)(UploadDocument);
export { connectedUploadDocument as UploadDocument };
