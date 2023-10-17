import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import service from "../service/auth.service";

interface UserType {
  username: string;
  email: string;
  password: string;
  roles: string;
}

const Signup = () => {
  const [user, setUser] = useState<UserType>({
    username: "",
    email: "",
    password: "",
    roles: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const inputName = e.target.name;

    if (inputName === "username") {
      // ตรวจสอบว่ามีอักษรพิเศษหรือภาษาอื่น ๆ หรือไม่
      const isEnglishOnly = /^[a-zA-Z0-9]*$/.test(value);

      if (!isEnglishOnly) {
        setError("Username must contain only English letters and numbers.");
        return;
      } else {
        setError(null); // Clear the error message if input is valid
      }
    }

    if (inputName === "password" || inputName === "confirmPassword") {
      // ตรวจสอบว่าประกอบด้วยภาษาอังกฤษและอักษรพิเศษเท่านั้น
      const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
      if (!passwordPattern.test(value)) {
        setError(
          "Password must contain only English letters, numbers and special characters."
        );
        return;
      } else {
        setError(null); // Clear the error message if input is valid
      }
    }

    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (user.username === "" || user.email === "" || user.password === "") {
      setError("Field is required");
      return;
    }

    // Check email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(user.email)) {
      setError("Invalid email format.");
      return;
    }

    if (user.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    e.preventDefault();
    const adminCodeFromForm = user.roles;
    const correctAdminCode = "adminShil3aiinu_service";
    if (user.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (adminCodeFromForm === correctAdminCode) {
      try {
        user.roles = "admin"; // ตั้งค่า roles เป็น admin
        await service.registerAdmin(user.username, user.email, user.password, [
          user.roles,
        ]);
        navigate("/signinorsignup");
      } catch (error: unknown) {
        if (typeof error === "object" && error !== null) {
          const errObj = error as {
            response?: { data?: { message?: string } };
          };

          if (errObj.response?.data?.message) {
            setError(errObj.response.data.message);
          } else {
            setError("An unexpected error occurred.");
            console.error(error);
          }
        } else {
          setError("An unexpected error occurred.");
          console.error(error);
        }
      }
    } else if (adminCodeFromForm === "") {
      try {
        await service.register(user.username, user.email, user.password);
        navigate("/signinorsignup");
      } catch (error: unknown) {
        if (typeof error === "object" && error !== null) {
          const errObj = error as {
            response?: { data?: { message?: string } };
          };

          if (errObj.response?.data?.message) {
            setError(errObj.response.data.message);
          } else {
            setError("An unexpected error occurred.");
            console.error(error);
          }
        } else {
          setError("An unexpected error occurred.");
          console.error(error);
        }
      }
    } else {
      setError(
        "You're not a corporate person. Please don't enter the code if you're not."
      );
      return;
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
              <Form.Group controlId="formBasicformAdminCode">
                <Form.Label>
                  Admin Code(
                  ในความจริงควรใช้ยืนยันผ่านอีเมลบริษัทแทนการกรอกรหัสลับ )
                </Form.Label>
                <Form.Control
                  type="text"
                  name="roles"
                  placeholder="Enter Admin Code if you are registering as admin"
                  onChange={handleInputChange}
                  value={user.roles}
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
            Do you have an account? <Link to="/signinorsignup">Sign In</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
