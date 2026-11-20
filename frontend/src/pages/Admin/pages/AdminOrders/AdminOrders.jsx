import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8080/order/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="admin-orders">
      <h2>Orders</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Payment</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>

              <td>
                {order.first_name} {order.last_name}
              </td>

              <td>{order.email}</td>

              <td>{order.payment_method}</td>

              <td>${order.final_total}</td>

              <td>
                <span className="status">Completed</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
