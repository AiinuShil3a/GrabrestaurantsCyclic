import { Card, Container } from "react-bootstrap";

function ProfilePage() {
  const storedUserData = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card style={{ width: "100%", maxWidth: "400px" }}>
        <Card.Body>
          <Card.Title>
            <h1>Profile</h1>
          </Card.Title>
          <Card.Text>
            <p>
              <strong>Username:</strong> {storedUserData.username}
            </p>
            <p>
              <strong>Email:</strong> {storedUserData.email}
            </p>
            <p>
              <strong>Roles:</strong> {storedUserData.roles}
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProfilePage;
