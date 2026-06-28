import "../customs/customBtns.css";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Card className="card-custom" style={{ width: "20rem", height: "30rem" }}>
        <Card.Img
          variant="top"
          style={{
            height: "300px",
            objectFit: "cover",
          }}
          src={product.img}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>${product.price}</Card.Text>

          <div className="d-flex justify-content-around mt-auto">
            <Button
              variant="dark"
              className="btn-custom-dark"
              onClick={() => navigate(`/detalle/${product.id}`)}
            >
              Ver detalle
            </Button>

            <Button
              variant="custom"
              className="btn-custom"
              onClick={() => addToCart(product)}
            >
              Seleccionar
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
