import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import { history } from './helpers';
import { alertActions } from './actions';
import { PrivateRoute, HomePage, LoginPage, RegisterPage, ViewDocument } from './components';

class App extends Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      this.props.clearAlerts();
    });
  }

  componentDidMount() {

  }

  
  render() {
    const { alert } = this.props;
    return (
      <div>
        <div>
          <div>
            {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history = {history}>
              <Switch>
                <PrivateRoute exact path ="/" component={HomePage}/>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <PrivateRoute path="/document" component={ViewDocument}/>
                {/* <Redirect from="*" to="/" /> */}
              </Switch>
            </Router>
          
          </div>
        </div>
      </div>
    )
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };

// <Document
//           file = "https://s3-us-east-2.amazonaws.com/penguins-are-cool/Eric Feng Resume.pdf"
//           onLoadError={console.error}
//           onLoadSuccess={console.log}
//         >
//         <Page pageNumber={1} />
//         </Document>