import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from "react";

import NavBarPage from "./components/NavBar";
import Menu from "./pages/Menu";
import ProductDetails from "./pages/ProductDetails";
import OurStory from "./pages/OurStory";
import Cart from "./pages/Cart";
import Login from "./auth/Login";
import AdminProducts from "./pages/AdminProducts";

function App() {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === product.id);

            if (existing) {
                return prev.map((p) =>
                    p.id === product.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p,
                );
            }

            return [
                ...prev,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });
    };

    return (
        <BrowserRouter>
            <NavBarPage
                cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
            />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Menu addToCart={addToCart} />} />
                <Route
                    path="/detalle/:id"
                    element={<ProductDetails addToCart={addToCart} />}
                />
                <Route path="/historia" element={<OurStory />} />
                <Route
                    path="/carrito"
                    element={<Cart cart={cart} setCart={setCart} />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
