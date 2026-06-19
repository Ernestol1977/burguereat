import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useAuth } from "../services/auth/useAuth";
import {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct,
} from "../services/productServices";
import { errorToast, successToast } from "../ui/notFound/notifications";
import "../customs/customBtns.css"

const emptyProduct = {
    name: "",
    detail: "",
    price: "",
    img: "",
    alt: "",
};

const AdminProducts = () => {
    const { token } = useAuth();
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState(emptyProduct);
    const [editingId, setEditingId] = useState(null);

    const loadProducts = async () => {
        try {
            setProducts(await getProducts());
        } catch (error) {
            errorToast(error.message);
        }
    };

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .catch((error) => errorToast(error.message));
    }, []);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const resetForm = () => {
        setForm(emptyProduct);
        setEditingId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const product = {
                ...form,
                price: Number(form.price),
            };

            if (editingId) {
                await updateProduct(token, editingId, product);
                successToast("Producto actualizado");
            } else {
                await createProduct(token, product);
                successToast("Producto creado");
            }

            resetForm();
            loadProducts();
        } catch (error) {
            errorToast(error.message);
        }
    };

    const handleEdit = (product) => {
        setEditingId(product.id);
        setForm({
            name: product.name,
            detail: product.detail,
            price: product.price,
            img: product.img || "",
            alt: product.alt || "",
        });
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(token, id);
            successToast("Producto eliminado");
            loadProducts();
        } catch (error) {
            errorToast(error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Administrar productos</h1>
            <Form className="admin-form" onSubmit={handleSubmit}>
                <Form.Control
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                />
                <Form.Control
                    name="detail"
                    placeholder="Detalle"
                    value={form.detail}
                    onChange={handleChange}
                />
                <Form.Control
                    name="price"
                    type="number"
                    placeholder="Precio"
                    value={form.price}
                    onChange={handleChange}
                />
                <Form.Control
                    name="img"
                    placeholder="URL de imagen"
                    value={form.img}
                    onChange={handleChange}
                />
                <Form.Control
                    name="alt"
                    placeholder="Texto alternativo"
                    value={form.alt}
                    onChange={handleChange}
                />
                <div className="d-flex gap-2">
                    <Button type="submit" variant="warning">
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
                variant="dark"
                className="mt-4"
            >
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Detalle</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.detail}</td>
                            <td className="d-flex gap-2">
                                <Button
                                    size="sm"
                                    className="btn-custom"
                                    onClick={() => handleEdit(product)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    size="sm"
                                    variant="danger"
                                    className="btn-delete"
                                    onClick={() => handleDelete(product.id)}
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

export default AdminProducts;
