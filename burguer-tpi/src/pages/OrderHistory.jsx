import { useEffect, useState } from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";
import { useAuth } from "../services/auth/useAuth";
import { getMyOrders } from "../services/orderServices";
import { errorToast } from "../ui/notFound/notifications";
import "../customs/orderHistory.css";

const OrderHistory = () => {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getMyOrders(token)
            .then(setOrders)
            .catch((error) => errorToast(error.message));
    }, [token]);

    return (
        <div className="container mt-4">
            <h1>Mis pedidos</h1>
            {orders.length === 0 ? (
                <p>Todavia no realizaste pedidos.</p>
            ) : (
                <div className="d-flex flex-column gap-3">
                    {orders.map((order) => (
                        <Card key={order.id} className="themed-order-card">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Card.Title>Pedido #{order.id}</Card.Title>
                                    <Badge bg="warning" text="dark">
                                        {order.status}
                                    </Badge>
                                </div>
                                <Card.Text>Total: ${order.total}</Card.Text>
                                <ListGroup>
                                    {order.items?.map((item) => (
                                        <ListGroup.Item key={item.id} className="history-bg-color">
                                            {item.productName} x {item.quantity} - ${item.subtotal}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
