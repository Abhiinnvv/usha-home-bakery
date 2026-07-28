import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

function Orders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
  <div className="max-w-7xl mx-auto px-6 py-10">

    <h1 className="text-4xl font-bold mb-8">
      My Orders
    </h1>

    {orders.length === 0 ? (

      <div className="bg-white rounded-3xl shadow-md p-10 text-center">

        <h2 className="text-2xl font-semibold mb-3">
          No Orders Yet
        </h2>

        <p className="text-gray-500">
          Your placed orders will appear here.
        </p>

      </div>

    ) : (

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order._id}
            className="bg-white rounded-3xl shadow-md p-6"
          >
            <div className="mt-6 border-t pt-5">

  {order.items.map((item) => (

    <div
      key={item._id}
      className="flex justify-between py-2"
    >

      <div>
        <p className="font-medium">
          {item.product?.name}
        </p>

        <p className="text-gray-500 text-sm">
          Quantity: {item.quantity}
        </p>
      </div>

      <p className="font-semibold">
        ₹{item.product?.price * item.quantity}
      </p>

    </div>

  ))}

  <div className="border-t mt-4 pt-4 space-y-2">

    <div className="flex justify-between">
      <span>Payment</span>
      <span>{order.paymentMethod}</span>
    </div>

    <div className="flex justify-between">
      <span>Total</span>
      <span className="font-bold text-pink-600">
        ₹{order.totalPrice}
      </span>
    </div>

  </div>

</div>

            <div className="flex justify-between items-center">

              <div>

                <h2 className="font-bold text-xl">
                  Order #{order._id.slice(-6)}
                </h2>

                <p className="text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

              </div>

              <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                {order.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>
);
}

export default Orders;