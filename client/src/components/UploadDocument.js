import React, { Component } from 'react';
import { documentActions } from '../actions';
import { connect } from 'react-redux';

class UploadDocument extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedFile: null,
            documentName: '',
            description: '',
            submitted: false
        };

       
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleFileChange(event) {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        if (this.state.selectedFile) {
            const userId = this.props.user.user._id

            this.props.uploadDocument(userId, this.state.documentName, this.state.selectedFile, this.state.description)
        }
    }

    render() {
        const { submitted, selectedFile, documentName, description } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
            <h1>File Upload</h1>
                <label htmlFor="selectedFile">File</label>
                <input type="file" name="file" onChange={this.handleFileChange} />
                    {submitted && !selectedFile &&
                        <div className="help-block">File is required</div>
                    }
            <div className={'form-group' + (submitted && !documentName ? ' has-error' : '')}>
                <label htmlFor="documentName">Document Name</label>
                <input type="text" className="form-control" name="documentName" value={documentName} onChange={this.handleChange} />
                    {submitted && !documentName &&
                        <div className="help-block">Description is required</div>
                    }
            </div>
            <div className={'form-group' + (submitted && !description ? ' has-error' : '')}>
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" name="description" value={description} onChange={this.handleChange} />
                    {submitted && !description &&
                        <div className="help-block">Description is required</div>
                    }
            </div>
            <button type="submit">Upload</button>
            </form>
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
