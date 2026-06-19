import "./navBar.css";
import { Link } from "react-router";
import { Navbar, Nav, Container, Badge, Button, Form } from "react-bootstrap";
import { useAuth } from "../services/auth/useAuth";
import { useTheme } from "../services/theme/useTheme";

const NavBar = ({ cartCount }) => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const isAdmin = user?.role === "admin" || user?.role === "super-admin";
    const isSuperAdmin = user?.role === "super-admin";

    return (
        <Navbar expand="lg" className="navbar-themed">
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

                {user && (
                    <Navbar.Text className="navbar-greeting">
                        Bienvenido <span className="navbar-greeting-user">{user.name}</span>
                    </Navbar.Text>
                )}

                <Nav className="align-items-lg-center">
                    <Form.Check
                        type="switch"
                        id="theme-switch"
                        className="theme-switch me-lg-3"
                        checked={theme === "light"}
                        onChange={toggleTheme}
                        label={
                            theme === "light" ? "Modo claro" : "Modo oscuro"
                        }
                    />
                    <Nav.Link as={Link} to="/carrito">
                        Carrito <Badge bg="success">{cartCount}</Badge>
                    </Nav.Link>
                    {user ? (
                        <div className="d-flex gap-3 align-items-center">
                            <Button
                                size="sm"
                                className="navbar-logout-btn"
                                onClick={logout}
                            >
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
