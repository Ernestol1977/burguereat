import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../services/auth/useAuth";
import { createOrder } from "../services/orderServices";
import { errorToast, successToast } from "../ui/notFound/notifications";
import "../customs/customBtns.css";

const Cart = ({ cart, setCart }) => {
    const navigate = useNavigate();
    const { token, isAuthenticated } = useAuth();

    const increaseQuantity = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
            ),
        );
    };

    const decreaseQuantity = (id) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item,
                )
                .filter((item) => item.quantity > 0),
        );
    };

    const removeItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
    );

    const confirmOrder = async () => {
        if (!isAuthenticated) {
            errorToast("Debes iniciar sesión para confirmar el pedido");
            navigate("/login", {
                state: {
                    from: "/carrito",
                },
            });
            return;
        }

        try {
            await createOrder(
                token,
                cart.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                })),
            );
            setCart([]);
            successToast("Pedido creado correctamente");
        } catch (apiError) {
            errorToast(apiError.message);
        }
    };

    return (
        <div className="container-md mt-4">
            <h1>Carrito</h1>
            <div className="mx-5">
                {cart.length === 0 ? (
                    <p>
                        No hay burgers seleccionadas. No te las pierdas! Has{" "}
                        <Link to={"/"}>click aquí</Link> para hacer tú pedido.
                    </p>
                ) : (
                    <div>
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="d-flex justify-content-between align-items-center mt-2"
                            >
                                <span>
                                    {item.name}{" "}
                                    {item.quantity > 1
                                        ? `x ${item.quantity}`
                                        : ""}{" "}
                                    - ${item.price * item.quantity}
                                </span>

                                <div className="d-flex gap-4">
                                    <Button
                                        className="btn-custom cart-btn"
                                        onClick={() =>
                                            increaseQuantity(item.id)
                                        }
                                    >
                                        +
                                    </Button>
                                    <Button
                                        className="btn-custom-dark cart-btn"
                                        onClick={() =>
                                            decreaseQuantity(item.id)
                                        }
                                    >
                                        -
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="btn-delete cart-btn"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        🗑️
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <hr />
                        <h3>Total: ${total}</h3>
                        <Button className="btn-custom" onClick={confirmOrder}>
                            Confirmar pedido
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
