import { Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card
        className="themed-order-card p-4 text-center"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <Card.Body>
          <h1 className="notFound-title">
            404
          </h1>

          <h2 className="mb-3">Página no encontrada</h2>

          <p className="mb-4">
            La ruta que intentaste abrir no existe en BurgerEat.
          </p>

          <Link to="/">
            <Button className="btn-custom">
              Volver al inicio
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotFound;