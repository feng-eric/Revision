import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import { userActions } from '../actions';

const styles = {
    background: {
        backgroundImage: `url(${'/background.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',

        height: '100vh',
        width: '100%',
    },

    card: {
        marginTop: '20%'
    },
    

    align: {
        justifyContent: "center",
        alignItems: "center",
    }
}
class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                email: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.name && user.email && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const { user, submitted } = this.state;
        return (
            <div>
                <Container style={styles.align}>
            <Card style={styles.card}>
                <Card.Title>
                <h2 className="text-center pt-4">Register</h2>
                </Card.Title>
                <Card.Body>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.name ? ' has-error' : '')}>
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name="name" value={user.name} onChange={this.handleChange} />
                        {submitted && !user.name &&
                            <div className="help-block">Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="username">Email</label>
                        <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                        {submitted && !user.email &&
                            <div className="help-block">email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group text-center pt-2">
                        <button className="btn btn-primary">Register</button>

                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
                </Card.Body>
            </Card>
            </Container>

                
            </div>
            
            
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };