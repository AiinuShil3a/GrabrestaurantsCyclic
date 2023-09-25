import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const URL = import.meta.env.VITE_BASE_URL;
const Username = import.meta.env.VITE_BASE_USERNAME;
const Password = import.meta.env.VITE_BASE_PASSWORD;

const config = {
  auth: {
    username: Username,
    password: Password,
  },
};

const LoginCard = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card style={{ width: '50rem'}}>
                <Card.Body>
                    <Card.Title>Login</Card.Title>
                    <br />
                    <Card.Text>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>EMAIL ADDRESS</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <br />
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>PASSWORD</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <br />
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Card.Text>
                    <Card.Text>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default LoginCard;
