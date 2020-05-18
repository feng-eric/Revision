import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'

// import BackgroundImage from '/background.png'
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

    row: {
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        marginTop: '1%',
        marginBottom: '5%'
    },

    title: {
        paddingTop: "10%",
        fontSize: '4vw',
        letterSpacing: '0.2vw',
        fontFamily: 'Helvetica Neue'  
    }, 
    description: {
        fontSize: '1vw'

    },
    video: {
        width: "35vw",
        height: "40vh",
      

    }
}

class LoginPage extends Component {
    constructor(props) {
        super(props);

        // this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            showModal: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
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

    handleClose() {
        this.setState({ showModal: false });
    }

    handleOpen() {
        this.setState({ showModal: true });
    }


    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        

        return (
                <div style = {styles.background}>
                    <Container>
                        <Row style={styles.row}>
                            <h1 className="display-1" style={styles.title}>Revision</h1>
                        </Row>
                        <Row style={styles.row}>
                            <p className="w-50 text-center" style={styles.description}>Revision is a collaborative resume critiquing platform which allows users to easily upload and share their resume with others for feedback.
                                Log in or create a new account, and then upload your resume and share the link with others!
                            </p>
                        </Row>
                   
                        <Row style={styles.row}>
                            <Button style={styles.button} variant="primary" size="lg" onClick={this.handleOpen}>
                                Get Started
                            </Button>
                        </Row>
                        <Row style={styles.row}>
                            <embed type="video/webm" style={styles.video} src="https://www.youtube.com/embed/dQMEcFemVak?rel=0"/>
                        </Row>
                    </Container>
                    <Modal centered show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title class="text-align">Log In</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
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
                        </Modal.Body>
                    </Modal>
                </div>
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

