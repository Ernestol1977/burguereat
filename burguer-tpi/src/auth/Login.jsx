import "./login.css";
import { useState } from "react";
import { Button, Card, CardBody, Container, Form } from "react-bootstrap";
import { validateLogin } from "../validations/loginValidation.js";

const Login = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        const validationErrors = validateLogin(form);

    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card className="p-4 card">
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
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default Login;
