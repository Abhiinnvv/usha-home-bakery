import { useEffect, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import API from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders/admin/all");
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/admin/${id}`, {
        orderStatus: status,
      });

      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Unable to update status");
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid">

        <h2 className="mb-4">
          📋 Orders Management
        </h2>

        <table className="table table-bordered table-hover">

          <thead className="table-dark">

            <tr>
              <th>Customer</th>
              <th>Products</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order._id}>

                <td>
                  <strong>{order.user?.name}</strong>
                  <br />
                  {order.shippingAddress}
                </td>

                <td>
                  {order.items.map((item) => (
                    <div key={item._id}>
                      {item.product?.name} × {item.quantity}
                    </div>
                  ))}
                </td>

                <td>₹ {order.totalPrice}</td>

                <td>
                  {order.paymentMethod}

                  {order.paymentScreenshot && (
                    <>
                      <br />

                      <a
                        href={`YOUR_BACKEND_URL/${order.paymentScreenshot}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </>
                  )}
                </td>

                <td>

                  <span className="badge bg-primary">
                    {order.orderStatus}
                  </span>

                </td>

                <td>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td>

                  <select
                    className="form-select"
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                  >

                    <option>Pending</option>

                    <option>Confirmed</option>

                    <option>Preparing</option>

                    <option>Out For Delivery</option>

                    <option>Delivered</option>

                    <option>Cancelled</option>

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </AdminLayout>
  );
}

export default AdminOrders;