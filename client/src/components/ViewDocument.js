import React, { Component } from 'react';

import { Document, Page } from "react-pdf/dist/entry.webpack";

class ViewDocument extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { documentId, documentName, documentDescription, documentFileLink } = this.props.location.state
        console.log(this.props.location.state)
        return (
            <div>
                <h1>Document Id: { documentId }</h1>
                <h1>Document Name: { documentName } </h1>
                <h1>Document Description: { documentDescription } </h1>
                <Document
                    file = {documentFileLink}
                    onLoadError={console.error}
                    onLoadSuccess={console.log}
                >
                    <Page pageNumber={1} />
                </Document>
            </div>

          )
    }
}

export default ViewDocument;

