import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router"

import NavbarPage from "./components/navBar/NavBar"
import Menu from "./pages/Menu"
import Login from "./auth/Login"
import ProductDetails from "./pages/ProductDetails";
import NuestraHistoria from "./pages/NuestraHistoria"
import Cart from "./pages/Cart"
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => [...prev, product])
  }

  return (
    <BrowserRouter>
    <NavbarPage cart={cart.length} />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Menu />} />
      <Route path="/detalle/:id" element={<ProductDetails addToCart={addToCart} />} />
      <Route path="/historia" element={<NuestraHistoria />} />
      <Route path="/carrito" element={<Cart cart={cart} />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;