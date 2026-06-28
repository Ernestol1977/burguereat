import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useAuth } from "../services/auth/useAuth";
import {
  deleteOrder,
  getOrders,
  updateOrderStatus,
} from "../services/orderServices";
import { errorToast, successToast } from "../ui/notFound/notifications";
import "../customs/customBtns.css";

const statuses = ["pendiente", "preparando", "entregado", "cancelado"];

const AdminOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    userId: "",
    status: "",
    from: "",
    to: "",
  });

  const loadOrders = async () => {
    try {
      setOrders(await getOrders(token, filters));
    } catch (error) {
      errorToast(error.message);
    }
  };

  useEffect(() => {
    getOrders(token, filters)
      .then(setOrders)
      .catch((error) => errorToast(error.message));
  }, [filters, token]);

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(token, id, status);
      successToast("Estado actualizado");
      loadOrders();
    } catch (error) {
      errorToast(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(token, id);
      successToast("Pedido eliminado");
      loadOrders();
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Gestionar pedidos</h1>
      <Form className="admin-filters">
        <Form.Control
          name="userId"
          placeholder="ID cliente"
          value={filters.userId}
          onChange={handleFilterChange}
        />
        <Form.Select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">Todos los estados</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Form.Select>
        <Form.Control
          name="from"
          type="date"
          value={filters.from}
          onChange={handleFilterChange}
        />
        <Form.Control
          name="to"
          type="date"
          value={filters.to}
          onChange={handleFilterChange}
        />
      </Form>

      <Table responsive striped bordered hover className="mt-4 table-themed">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Items</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                {order.user?.name} {order.user?.lastName}
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                {order.items
                  ?.map((item) => `${item.productName} x${item.quantity}`)
                  .join(", ")}
              </td>
              <td>${order.total}</td>
              <td>
                <Form.Select
                  size="sm"
                  value={order.status}
                  onChange={(event) =>
                    handleStatusChange(order.id, event.target.value)
                  }
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Button
                  size="sm"
                  variant="danger"
                  className="btn-delete"
                  onClick={() => handleDelete(order.id)}
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

export default AdminOrders;
