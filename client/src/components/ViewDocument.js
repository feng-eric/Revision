import React, { Component } from 'react';
import { connect } from 'react-redux';
import { documentActions } from '../actions';

import { history } from '../helpers';

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
            <div>
                { documents.document &&
                    <div>
                        <h1>Document Id: { documents.document._id }</h1>
                        <h1>Document Name: { documents.document.document_name } </h1>
                        <h1>Document Description: { documents.document.description } </h1>
                        <Document
                            file = {documents.document.fileLink}
                            onLoadError={console.error}
                            onLoadSuccess={console.log}
                        >
                            <Page pageNumber={1} />
                        </Document>
                        <button onClick={this.returnToPreviousPage}>Return to Previous Page</button>
                    </div>
                }
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

