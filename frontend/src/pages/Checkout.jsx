import {
  useState,
  useContext
} from "react";

import API from "../services/api";

import {
  CartContext
} from "../contexts/CartContext";

import {
  AuthContext
} from "../contexts/AuthContext";

import qrImage from "../assets/qr.png";

function Checkout() {
  const {
    cartItems,
    clearCart
  } = useContext(
    CartContext
  );

  const { user } =
    useContext(
      AuthContext
    );

  const [
    shippingAddress,
    setShippingAddress
  ] = useState("");

  const [
    paymentMethod,
    setPaymentMethod
  ] = useState("COD");

  const [
    paymentScreenshot,
    setPaymentScreenshot
  ] = useState(null);

  const totalPrice =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price *
          item.quantity,
      0
    );

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      const formData =
        new FormData();

      formData.append(
        "items",
        JSON.stringify(
          cartItems.map(
            (item) => ({
              product:
                item._id,
              quantity:
                item.quantity
            })
          )
        )
      );

      formData.append(
        "shippingAddress",
        shippingAddress
      );

      formData.append(
        "paymentMethod",
        paymentMethod
      );

      formData.append(
        "totalPrice",
        totalPrice
      );

      if (
        paymentScreenshot
      ) {
        formData.append(
          "paymentScreenshot",
          paymentScreenshot
        );
      }

      await API.post(
        "/orders",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      clearCart();

      alert(
        "Order placed successfully"
      );
    };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10">
        Checkout
      </h1>
<div className="grid lg:grid-cols-3 gap-10"></div>
      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-6 lg:col-span-2 bg-white shadow-lg rounded-3xl p-8"
      >
        <textarea
          placeholder="Shipping Address"
          value={
            shippingAddress
          }
          onChange={(e) =>
            setShippingAddress(
              e.target.value
            )
          }
          className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-pink-500 outline-none"
        />

        <select
          value={
            paymentMethod
          }
          onChange={(e) =>
            setPaymentMethod(
              e.target.value
            )
          }
          className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-pink-500 outline-none"
        >
          <option value="COD">
            Cash On Delivery
          </option>

          <option value="QR">
            QR Payment
          </option>

        </select>

        {paymentMethod ===
          "QR" && (
          <div>
            <img
              src={qrImage}
              alt="QR"
              className="w-56 mx-auto mb-6 rounded-xl shadow"
            />

            <p className="text-center font-semibold text-lg">
  UPI ID
</p>

<p className="text-center text-pink-600 font-bold mb-5">
  ushabisht942@oksbi
</p>
            <input
              type="file"
              onChange={(
                e
              ) =>
                setPaymentScreenshot(
                  e.target
                    .files[0]
                )
              }
              className="mt-4 w-full border rounded-xl p-3"
            />
          </div>
        )}

        <h2 className="text-xl font-bold">
          Total: ₹
          {totalPrice}
        </h2>

        <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl text-lg font-semibold transition">
          Place Order
        </button>
      </form>

<div>

  {/* Order Summary */}

  <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24">

    <h2 className="text-2xl font-bold mb-6">
      Order Summary
    </h2>

    {cartItems.map(item => (

      <div
        key={item._id}
        className="flex justify-between mb-4"
      >

        <span>
          {item.name} × {item.quantity}
        </span>

        <span>
          ₹{item.price * item.quantity}
        </span>

      </div>

    ))}

    <hr className="my-5"/>

    <div className="flex justify-between text-lg">

      <span>Subtotal</span>

      <span>₹{totalPrice}</span>

    </div>

    <div className="flex justify-between mt-3">

      <span>Delivery</span>

      <span className="text-green-600">
        Free
      </span>

    </div>

    <div className="flex justify-between font-bold text-2xl mt-6">

      <span>Total</span>

      <span>
        ₹{totalPrice}
      </span>

    </div>

  </div>

</div>
    </div>
  );
}

export default Checkout;
