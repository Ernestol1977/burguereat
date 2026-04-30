import { BrowserRouter, Route, Routes } from "react-router"
import NavbarPage from "./components/navBar/NavBar"
import Menu from "./pages/Menu"
import Login from "./auth/Login"

function App() {

  return (
    <BrowserRouter>
    <NavbarPage />
    <Routes>
      <Route path="/" element={<h3>Bienvenido a <spam>HamburEat</spam></h3>} />
      <Route path="menu" element={<Menu />} />
      <Route path="login" element={<Login />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
