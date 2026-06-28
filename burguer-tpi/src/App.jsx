import "./app.css";
import "./customs/theme.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from "react";

import NavBar from "./components/NavBar";
import Menu from "./pages/Menu";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./auth/Login";
import OrderHistory from "./pages/OrderHistory";
import Register from "./auth/Register";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import Terms from "./pages/Terms";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
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
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/" element={<Menu addToCart={addToCart} />} />
          <Route
            path="/detalle/:id"
            element={<ProductDetails addToCart={addToCart} />}
          />
          <Route
            path="/historial"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/carrito"
            element={<Cart cart={cart} setCart={setCart} />}
          />
          <Route
            path="/admin/productos"
            element={
              <ProtectedRoute roles={["admin", "super-admin"]}>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pedidos"
            element={
              <ProtectedRoute roles={["admin", "super-admin"]}>
                <AdminOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <ProtectedRoute roles={["super-admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
