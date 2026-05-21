import "./productCard.css";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";

const ProductCard = ({ product, addToCart }) => {
    const navigate = useNavigate();

    return (
        <Card className="card-custom" style={{ width: "20rem" }}>
            <Card.Img
                variant="top"
                style={{
                    height: "300px",
                    objectFit: "cover",
                }}
                src={product.img}
            />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>

                <Button
                    variant="dark"
                    onClick={() => navigate(`/detalle/${product.id}`)}
                >
                    Ver detalle
                </Button>

                <Button
                    className="ms-2 btn-custom"
                    onClick={() => addToCart(product)}
                >
                    Seleccionar
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
