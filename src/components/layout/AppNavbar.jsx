import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand>Employee Management System</Navbar.Brand>
      </Container>
    </Navbar>
  );
}