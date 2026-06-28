import "../customs/productDetails.css";
import "../customs/customBtns.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getProduct } from "../services/productServices";

import { Button, Col, Row } from "react-bootstrap";
import { errorToast } from "../ui/notFound/notifications";

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch((error) => errorToast(error.message));
  }, [id]);

  if (!product) return <p>Buscando...</p>;

  return (
    <div className="container mt-4">
      <Row className="align-items-center">
        <Col md={6}>
          <img
            src={product.img}
            alt={product.name}
            className="product-detail-img"
          />
        </Col>

        <Col md={6} className="product-detail-info">
          <h2>{product.name}</h2>
          <h5>${product.price}</h5>
          <p>{product.detail}</p>

          <div className="product-detail-buttons">
            <Button
              variant="dark"
              className="btn-custom-volver"
              onClick={() => navigate("/")}
            >
              Volver
            </Button>

            <Button className="btn-custom" onClick={() => addToCart(product)}>
              Sumar al carrito
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
