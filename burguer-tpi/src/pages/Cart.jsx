import React from "react";
import { Button } from "react-bootstrap";

const Cart = ({ cart, setCart }) => {
    console.log(cart);

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

    return (
        <div className="container mt-4">
            <h1>Carrito</h1>
            <div className="mx-5">
                {cart.length === 0 ? (
                    <p>No hay burgers seleccionadas. No te las pierdas!</p>
                ) : (
                    <div>
                        {cart.map((item) => (
                            <div key={item.id}>
                                {item.name}{" "}
                                {item.quantity > 1 ? `x ${item.quantity}` : ""}{" "}
                                - ${item.price * item.quantity}
                                <Button
                                    variant="success"
                                    onClick={() => increaseQuantity(item.id)}
                                >
                                    +
                                </Button>
                                <Button
                                    variant="warning"
                                    onClick={() => decreaseQuantity(item.id)}
                                >
                                    -
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => removeItem(item.id)}
                                >
                                    🗑️
                                </Button>
                            </div>
                        ))}

                        <hr />
                        <h3>Total: ${total}</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
