import React, { Component } from 'react';
import { connect } from 'react-redux';
import { documentActions } from '../actions';
import { history } from '../helpers';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { Document, Page } from "react-pdf/dist/entry.webpack";

class ViewDocument extends Component {
    constructor(props) {
        super(props);

        this.returnToPreviousPage = this.returnToPreviousPage.bind(this);
    }

    componentDidMount() {
        let pathName = this.props.location.pathname;
        let docId = pathName.replace("/document/", "")
        this.props.getDocumentById(docId)
    }

    returnToPreviousPage() {
        history.goBack();
    }

    render() {
        const { documents } = this.props;
    
        return (
            <div style = {{
                backgroundColor: '#e9ecef'
            }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Document</Breadcrumb.Item>
                </Breadcrumb>
                <div style = {{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    { documents.document &&
                        <div>
                            <h3>Document Name: { documents.document.document_name } </h3>
                            <h4>Description: { documents.document.description } </h4>
                            <Document
                                file = {documents.document.fileLink}
                                onLoadError={console.error}
                                onLoadSuccess={console.log}
                            >
                                <Page pageNumber={1} />
                            </Document>
                        </div>
                    }
                </div>
            </div>

          )
    }
}

function mapState(state) {
    const { documents } = state;
    return { documents }
}

const actionCreators = {
    getDocumentById: documentActions.getDocumentById
}

const connectedViewDocument = connect(mapState, actionCreators)(ViewDocument)
export { connectedViewDocument as ViewDocument };

