import { Navbar, Nav, Container, Badge } from "react-bootstrap"
import { Link } from 'react-router'

const NavbarPage = ({ cartCount }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🍔 HamburEat
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link as={Link} to="/menu">Menú</Nav.Link>
          <Nav.Link as={Link} to="/historia">Nuestra Historia</Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link as={Link} to="/carrito">
            Carrito <Badge bg="success">{cartCount}</Badge>
          </Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
export default NavbarPage;