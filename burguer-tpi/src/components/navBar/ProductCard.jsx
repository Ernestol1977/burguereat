import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";

const ProductCard = ({ product, addToCart }) => {
    const navigate = useNavigate();

    return (
        <Card className="card-custom" style={{ width: "20rem" }}>
            <Card.Img variant="top" src={product.img} width={320}  />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.price}</Card.Text>

                <Button 
                  variant="dark"
                  onClick={() => navigate(`/detalle/${product.id}`)}
                >
                  Ver detalle
                </Button>

                <Button 
                  variant="success"
                  className="ms-2"
                  onClick={() => addToCart(product)}
                  >
                  Seleccionar
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
