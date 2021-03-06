import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner';

import { userActions } from '../actions';

const styles = {
    background: {
        backgroundImage: `url(${'/background.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        height: '100vh',
        width: '100vw',
    },

    card: {
        paddingTop: '10%',
        paddingBottom: '10%',
        position: 'relative',
        alignItems: 'center',
    },
    align: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        marginTop: '1%',
        marginBottom: '5%'
    },

    title: {
        fontSize: '4rem',
        fontWeight: '300',
        lineHeight: '1.2',
        fontFamily: 'Helvetica Neue'  
    }, 
    description: {
        padding: '2%',
        width: '80%'

    },

    video: {
          width: "35vw",
          height: "20vw"

    }
}

class LoginPage extends Component {
    constructor(props) {
        super(props);

        // this.props.logout();

        this.state = {
            email: '',
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
        const { email, password} = this.state;
        if (email && password) {
            let { from } = this.props.location.state || {from: {pathname: '/'}};
            console.log(from);
            this.props.login(email, password, from)
              
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
        const { email, password, submitted } = this.state;
        

        return (
                <div style = {styles.background}>
                    <Container style = {styles.container}>
                        <Row>
                            <Col md={{ span: 8, offset: 2}} xs={{span: 10, offset: 1}}>
                            <Card style = {styles.card}>
    
                                <h1 className="display-1 title" style={styles.title}>Revision</h1>
 
                            <p className="text-center" style={styles.description}>Revision is a collaborative resume critiquing platform which allows users to upload and share their resume with others for feedback.
                                Log in or create a new account, and then upload your resume and share the link with others!
                            </p>
                   

                            <Button style={styles.button} variant="primary" size="lg" onClick={this.handleOpen}>
                                Get Started
                            </Button>
                            <iframe title="video" style={styles.video} src="https://www.youtube.com/embed/dQMEcFemVak?rel=0" frameBorder=""/>
                        </Card>
                            </Col>
                        </Row>
                        
                    </Container>
                    <Modal centered show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title class="text-align">Log In</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form name = "form" onSubmit= {this.handleSubmit}>
                                <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="form-control" name="email" value = {email} onChange = {this.handleChange}/>
                                    {submitted && !email &&
                                        <div className="help-block">Email is required</div>
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
                                    {loggingIn 
                                        ?   <Button variant="primary" disabled>
                                                <Spinner
                                                    as="span"
                                                    animation="grow"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                Loading...
                                            </Button>
                                        :
                                            <button className="btn btn-primary">Login</button>
                                    }
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

