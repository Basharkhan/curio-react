import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import "./Header.css";

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <Navbar expand="md" className="curio-navbar">
      <Container>
        {/* Brand / Logo */}
        <LinkContainer to="/">
          <Navbar.Brand className="curio-logo">Curio</Navbar.Brand>
        </LinkContainer>

        {/* Toggler */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isAuthenticated() && (
              <>
                <LinkContainer to="/login">
                  <Button className="btn-login">Login</Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button className="btn-register">Registration</Button>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
