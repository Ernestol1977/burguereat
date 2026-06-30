import "../customs/auth.css";
import { useState } from "react";
import { Button, Card, CardBody, Container, Form } from "react-bootstrap";
import { validateLogin } from "../validations/loginValidation.js";
import { errorToast, successToast } from "../ui/notFound/notifications";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../services/auth/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
		email: "",
		password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLogin(form);

    if (Object.keys(validationErrors).length > 0) {
      Object.values(validationErrors).forEach((error) => {
        errorToast(error);
      });
      return;
    }

    try {
      await login(form);
      successToast("Sesión iniciada correctamente");
      navigate(location.state?.from || "/");
    } catch (apiError) {
      errorToast(apiError.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 auth-card">
        <CardBody>
          <h4 className="text-center mb-4">Iniciar Sesión</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Ingrese email"
                value={form.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                value={form.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="text-center">
              <Button type="submit" className="w-50 btn-ctm">
                Ingresar
              </Button>
            </Form.Group>

            <div className="d-flex justify-content-end mt-3">
              <Link to="/register">
                <Button className="btn-ctm">Registrarse</Button>
              </Link>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Login;
