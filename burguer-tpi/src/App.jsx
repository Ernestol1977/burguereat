import "./app.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from "react";

import NavBar from "./components/NavBar";
import Menu from "./pages/Menu";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./auth/Login";
import History from "./pages/History";

function App() {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);


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
        <div>
            <ToastContainer />
            <BrowserRouter>
                <NavBar
                    cartCount={cart.reduce(
                        (acc, item) => acc + item.quantity,
                        0,
                    )} 
                    user = {user}
                    setUser = {setUser}
                />
                <Routes>
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/" element={<Menu addToCart={addToCart} />} />
                    <Route
                        path="/detalle/:id"
                        element={<ProductDetails addToCart={addToCart} />}
                    />
                    <Route path="/historia" element={<History />} />
                    <Route
                        path="/carrito"
                        element={<Cart cart={cart} setCart={setCart} />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
