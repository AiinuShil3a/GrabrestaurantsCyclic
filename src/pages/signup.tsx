import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import service from "../service/auth.service.js";

interface UserType {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [user, setUser] = useState<UserType>({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await service.register(user.username, user.email, user.password);
      navigate("/signinorsignup");
    } catch (error: any) { // Specify any here for simplicity
    if (error.response && error.response.data && typeof error.response.data.message === 'string') {
      // ตั้งข้อความผิดพลาดให้เป็นข้อความที่ได้รับจาก backend
      setError(error.response.data.message);
    } else {
      console.error(error);
    }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card style={{ width: "50rem" }}>
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <br />
          <Card.Text>
            <Form>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>USERNAME</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  onChange={handleInputChange}
                  value={user.username}
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicEmail">
                <Form.Label>EMAIL ADDRESS</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleInputChange}
                  value={user.email}
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicPassword">
                <Form.Label>PASSWORD</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  value={user.password}
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>CONFIRM PASSWORD</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <br />
              {error && <div className="alert alert-danger">{error}</div>}
              <br />
              <Button variant="primary" type="submit" onClick={handleClick}>
                Submit
              </Button>
            </Form>
          </Card.Text>
          <Card.Text>
            Do you have an account? <Link to="/signin">Sign In</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
