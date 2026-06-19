import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useAuth } from "../services/auth/useAuth";
import {
    createUser,
    deleteUser,
    getUsers,
    updateUser,
} from "../services/userServices";
import { errorToast, successToast } from "../ui/notFound/notifications";
import "../customs/customBtns.css";

const emptyUser = {
    name: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    role: "usuario",
};

const roles = ["usuario", "admin", "super-admin"];

const AdminUsers = () => {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState(emptyUser);
    const [editingId, setEditingId] = useState(null);

    const loadUsers = async () => {
        try {
            setUsers(await getUsers(token));
        } catch (error) {
            errorToast(error.message);
        }
    };

    useEffect(() => {
        getUsers(token)
            .then(setUsers)
            .catch((error) => errorToast(error.message));
    }, [token]);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const resetForm = () => {
        setForm(emptyUser);
        setEditingId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (editingId) {
                const userData = { ...form };
                delete userData.password;
                await updateUser(token, editingId, userData);
                successToast("Usuario actualizado");
            } else {
                await createUser(token, form);
                successToast("Usuario creado");
            }

            resetForm();
            loadUsers();
        } catch (error) {
            errorToast(error.message);
        }
    };

    const handleEdit = (user) => {
        setEditingId(user.id);
        setForm({
            name: user.name,
            lastName: user.lastName,
            address: user.address || "",
            phone: user.phone || "",
            email: user.email,
            password: "",
            role: user.role,
        });
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(token, id);
            successToast("Usuario eliminado");
            loadUsers();
        } catch (error) {
            errorToast(error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Administrar usuarios</h1>
            <Form className="admin-form" onSubmit={handleSubmit}>
                <Form.Control
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                />
                <Form.Control
                    name="lastName"
                    placeholder="Apellido"
                    value={form.lastName}
                    onChange={handleChange}
                />
                <Form.Control
                    name="address"
                    placeholder="Direccion"
                    value={form.address}
                    onChange={handleChange}
                />
                <Form.Control
                    name="phone"
                    placeholder="Telefono"
                    value={form.phone}
                    onChange={handleChange}
                />
                <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                {!editingId && (
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />
                )}
                <Form.Select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                >
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </Form.Select>
                <div className="d-flex gap-2">
                    <Button type="submit" className="btn-create">
                        {editingId ? "Guardar" : "Crear"}
                    </Button>
                    {editingId && (
                        <Button variant="secondary" onClick={resetForm}>
                            Cancelar
                        </Button>
                    )}
                </div>
            </Form>

            <Table
                responsive
                striped
                bordered
                hover
                className="mt-4 table-themed"
            >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                {user.name} {user.lastName}
                            </td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td className="d-flex gap-2">
                                <Button
                                    size="sm"
                                    className="btn-custom-dark"
                                    onClick={() => handleEdit(user)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    size="sm"
                                    variant="danger"
                                    className="btn-delete"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminUsers;
