import { Button, Container } from "react-bootstrap";
import { Link } from "react-router";
import "../customs/customBtns.css";

const NotFound = () => {
  return (
    <Container className="text-center mt-5">
      <h1>404</h1>
      <h3>Página no encontrada</h3>
      <p>La URL que ingresaste no existe en BurgerEat.</p>

      <Link to="/">
        <Button className="btn-custom">
          Volver al inicio
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound;