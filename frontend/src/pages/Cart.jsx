import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
const IMAGE_BASE_URL =
  "https://bug-free-space-capybara-jj4vvvrg6xggfq9qp-5000.app.github.dev";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
  🛒 Your Cart is Empty
</h2>
        <Link
          to="/products"
          className="inline-block mt-8 bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-xl transition"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h2 className="text-4xl font-bold mb-10">
  Shopping Cart
</h2>

      {cartItems.map(item => (

        <div
         className="bg-white rounded-3xl shadow-lg mb-8 overflow-hidden"
          key={item._id}
        >

          <div className="grid md:grid-cols-4 gap-6 p-6">

            <div>

              <img
               src={`${IMAGE_BASE_URL}${item.image}`}
               className="w-full h-52 object-cover rounded-2xl"
                
              />

            </div>

            <div className="md:col-span-3">

              <div>

                <h3 className="text-2xl font-bold">
  {item.name}
</h3>

                <p className="text-2xl font-bold text-pink-600 mt-3">
  ₹{item.price}
</p>

               <div className="flex items-center gap-4 mt-6">

                  <button
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.quantity - 1
                      )
                    }
                  >
                    -
                  </button>

                  <span className="text-xl font-bold">
  {item.quantity}
</span>

                  <button
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
                  onClick={() =>
                    removeFromCart(item._id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          </div>

        </div>

      ))}

      <div className="bg-white shadow-lg rounded-3xl p-8 mt-10 max-w-md ml-auto">

        <h3 className="text-3xl font-bold mb-6">
  Total: ₹{total}
</h3>

        <Link
          to="/checkout"
          className="block w-full text-center bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-semibold transition"
        >
          Proceed to Checkout
        </Link>

      </div>

    </div>
  );
}

export default Cart;