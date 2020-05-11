import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'

import { userActions } from '../actions';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        // this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password} = this.state;
        if (username && password) {
            let { from } = this.props.location.state || {from: {pathname: '/'}};
            console.log(from);
            this.props.login(username, password, from)
              
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
                <Container style={{

                    marginTop: '10%'
                }}>
                        <Card>
                            <Card.Body>
                                <h1 className="text-center">Revision</h1>
                                <form name = "form" onSubmit= {this.handleSubmit}>
                                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control" name="username" value = {username} onChange = {this.handleChange}/>
                                        {submitted && !username &&
                                            <div className="help-block">Username is required</div>
                                        }
                                    </div>
                                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                        {submitted && !password &&
                                            <div className="help-block">Password is required</div>
                                        }
                                    </div>
                                    <div className="text-center pt-2">
                                        <button className="btn btn-primary">Login</button>
                                        <Link to="/register" className="btn btn-link">Register</Link>
                                    </div>
                                </form>
                            </Card.Body>
                        </Card>
                </Container>
        )
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };

