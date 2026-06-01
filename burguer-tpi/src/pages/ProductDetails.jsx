import "./productDetails.css"

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { productServices } from "../services/productServices";

import { Button } from "react-bootstrap";

const ProductDetails = ({ addToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        productServices().then((data) => {
            const findProduct = data.find((p) => p.id === parseInt(id));
            setProduct(findProduct);
        });
    }, [id]);

    if (!product) return <p>Buscando...</p>;

    return (
        <div className="container mt-4">
            <img src={product.img} width="400" />
            <h2>{product.name}</h2>
            <h5>${product.price}</h5>
            <p>{product.detail}</p>

            <Button variant="dark" className="mt-4 btn-custom-volver" onClick={() => navigate("/")}>
                Volver
            </Button>
            <Button className="mt-4 ms-2 btn-custom" onClick={() => addToCart(product)}>
                Sumar al carrito
            </Button>
        </div>
    );
};

export default ProductDetails;
