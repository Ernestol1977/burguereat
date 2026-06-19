import { Button, Card, CardBody, Container, Form } from "react-bootstrap";
import "./auth.css";
import { useState } from "react";
import { Link } from "react-router";
import { errorToast, successToast } from "../ui/notFound/notifications";
import { validateRegister } from "../validations/registerValidation";
import { useAuth } from "../services/auth/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        lastName: "",
        address: "",
        phone: "",
        email: "",
        password: "",
    });

    const [isAdult, setIsAdult] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateRegister(form);

        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).forEach((error) => {
                errorToast(error);
            });

            return;
        }

        try {
            await register(form);
            successToast("Usuario registrado correctamente!");
            navigate("/");
        } catch (apiError) {
            errorToast(apiError.message);
        }
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card className="card p-4">
                <CardBody>
                    <h4 className="text-center mb-4">Registrarse</h4>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Ingresar nombre"
                                value={form.name}
                                onChange={handleChange}
                            />
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                placeholder="Ingresar apellido"
                                value={form.lastName}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                placeholder="Ingresar dirección"
                                value={form.address}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                placeholder="Ingresar teléfono"
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Ingrese su email"
                                value={form.email}
                                onChange={handleChange}
                            />
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Ingrese contraseña"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Check
                                className="check-ctm"
                                type="checkbox"
                                checked={isAdult}
                                onChange={(e) => setIsAdult(e.target.checked)}
                                label={
                                    <div>
                                        Soy mayor de 18 años y acepto los{" "}
                                        <Link to="/terms">
                                            términos y condiciones
                                        </Link>
                                    </div>
                                }
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button
                                type="submit"
                                className="w-50 btn-ctm"
                                disabled={!isAdult}
                            >
                                Registrarse
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default Register;
