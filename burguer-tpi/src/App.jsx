import { BrowserRouter, Route, Routes } from "react-router"

import NavbarPage from "./components/navBar/NavBar"
import Menu from "./pages/Menu"
import Login from "./auth/Login"
import NuestraHistoria from "./pages/NuestraHistoria"

function App() {

  return (
    <BrowserRouter>
    <NavbarPage />
    <Routes>
      {/* <Route path="/" element={<h3>Bienvenido a HamburEat</h3>} /> */}
      <Route path="/" element={<Menu />} />
      <Route path="/nuestra-historia" element={<NuestraHistoria />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
