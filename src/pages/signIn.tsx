import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import service from "../service/auth.service.js";
import { useAuth } from '../service/AuthContext';

interface UserType {
  username: string;
  password: string;
}

const LoginCard = () => {
  const [signin, setSignin] = useState<UserType>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { setIsLogged, setUsername } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSuccessfulLogin = (userData: any) => {
    setIsLogged(true);
    setUsername(userData.username);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await service.login(signin.username, signin.password);
      handleSuccessfulLogin(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card style={{ width: "50rem" }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <br />
          <Card.Text>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>USERNAME</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter username"
                  name="username"
                  onChange={handleInputChange}
                  value={signin.username}
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicPassword">
                <Form.Label>PASSWORD</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                  value={signin.password}
                />
              </Form.Group>
              <br />
              {error && (
                <div className="alert alert-danger">
                  username หรือ password ไม่ถูกต้อง
                </div>
              )}
              <br />
              <Button variant="primary" type="submit" onClick={handleClick}>
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
