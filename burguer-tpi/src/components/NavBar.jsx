import "./navBar.css";
import { Link } from "react-router";
import { Navbar, Nav, Container, Badge, Button } from "react-bootstrap";
import { useAuth } from "../services/auth/useAuth";

const NavBar = ({ cartCount }) => {
    const { user, logout } = useAuth();
    const isAdmin = user?.role === "admin" || user?.role === "super-admin";
    const isSuperAdmin = user?.role === "super-admin";

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" className="title">
                    <img
                        src="/logoHamburEat.png"
                        alt="BurgerEat"
                        className="navbar-logo"
                    />
                </Navbar.Brand>

                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">
                        Menú
                    </Nav.Link>
                    <Nav.Link as={Link} to="/historial">
                        Mis pedidos
                    </Nav.Link>
                    {isAdmin && (
                        <>
                            <Nav.Link as={Link} to="/admin/productos">
                                Productos
                            </Nav.Link>
                            <Nav.Link as={Link} to="/admin/pedidos">
                                Pedidos
                            </Nav.Link>
                        </>
                    )}
                    {isSuperAdmin && (
                        <Nav.Link as={Link} to="/admin/usuarios">
                            Usuarios
                        </Nav.Link>
                    )}
                </Nav>

                <Nav>
                    <Nav.Link as={Link} to="/carrito">
                        Carrito <Badge bg="success">{cartCount}</Badge>
                    </Nav.Link>
                    {user ? (
                        <div className="d-flex gap-3 align-items-center">
                            <Navbar.Text>Hola {user.name}</Navbar.Text>
                            <Button size="sm" variant="outline-light" onClick={logout}>
                                Salir
                            </Button>
                        </div>
                    ) : (
                        <div className="d-flex gap-2 ">
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            |
                            <Nav.Link as={Link} to="/register">
                                Registrarse
                            </Nav.Link>
                        </div>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};
export default NavBar;
