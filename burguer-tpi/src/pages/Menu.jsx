import React, { useEffect, useState } from "react";
import { productServices } from "../services/productServices";
import ProductCard from "../components/ProductCard";

const Menu = ({ addToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        productServices().then(setProducts);
    }, []);

    return (
        <>
            <h3 className="mx-5 my-4">Bienvenido a BurgerEat</h3>
            <div className="container mt-4 d-flex gap-3 flex-wrap">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} addToCart={addToCart} />
                ))}
            </div>
        </>
    );
};

export default Menu;
