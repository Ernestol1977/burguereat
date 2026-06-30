import { useEffect, useState } from "react";
import { getProducts } from "../services/productServices";
import ProductCard from "../components/ProductCard";
import { errorToast } from "../ui/notFound/notifications";

const Menu = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((error) => errorToast(error.message));
  }, []);

  return (
    <>
      <h3 className="mx-5 my-4">Bienvenido a BurgerEat</h3>
      <div className="container mt-4 d-flex gap-3 flex-wrap justify-content-center">
        {products ?
					products.map((p) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} />
          ))
          : "No hay productos por el momento"}
      </div>
    </>
  );
};

export default Menu;
