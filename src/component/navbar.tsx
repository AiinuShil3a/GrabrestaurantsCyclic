import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { useAuth } from "../service/AuthContext";

function NavbarComponent() {
  const { isLogged, setIsLogged, username, setUsername, roles, setRoles } =
    useAuth();

  function isAdmin(): boolean {
    return !!roles && roles.includes("ROLE ADMIN");
  }

  const handleLogout = () => {
    setIsLogged(false);
    setUsername("");
    setRoles(null); // เคลียร์ state ของ roles
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Navbar expand="lg" bg="body-tertiary">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          {isAdmin() && (
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
                <Dropdown.Item as={Link} to="/profile">
                  Profile
                </Dropdown.Item>
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
