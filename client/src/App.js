import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Document, Page } from "react-pdf/dist/entry.webpack";

class App extends Component {

  componentDidMount() {
    fetch('http://localhost:8000/documents', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg2ZDRjYWUzMzgzYzVkOTllMGY1NTkiLCJpYXQiOjE1ODgyOTEzNTQsImV4cCI6MTU4ODMzNDU1NH0.tXcfF42Si6IgnYQCTIY_VEYZIdtdrPwaWjussdcCsJU'

      }
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
    });
      
  }
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and sasve to reload.
        </p>
        <Document
          file = "https://s3-us-east-2.amazonaws.com/penguins-are-cool/Eric Feng Resume.pdf"
          onLoadError={console.error}
          onLoadSuccess={console.log}
        >
        <Page pageNumber={1} />
        </Document>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  }
}

export default App;
