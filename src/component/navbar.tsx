import React , {useEffect} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { useAuth } from '../service/AuthContext';

function NavbarComponent() {
  const { isLogged, username, setIsLogged, setUsername } = useAuth();

  const handleLogout = () => {
    setIsLogged(false);
    setUsername("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const handleProfile = () => {

  };

  useEffect(() =>{
    const token = localStorage.getItem("token");
    const storedUserData = JSON.parse(localStorage.getItem("user") || "{}");
    const storedUsername = storedUserData.username;
    if (token && storedUsername){
      setIsLogged(true);
      setUsername(storedUsername);
    } else {
      setIsLogged(false);
      setUsername("");
    }
  },[])
  return (
    <Navbar expand="lg" bg="body-tertiary">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          {isLogged && ( // ? : if else && เปรียบเทียบ
            <Nav.Link as={Link} to="/add">
              Add
            </Nav.Link>
          )}
          <Nav.Link as={Link} to="/search">
            Search
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {isLogged ? (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {username}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Nav.Link as={Link} to="/signinorsignup">
              SignIn/SignUp
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
