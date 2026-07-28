import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../contexts/CartContext";
const IMAGE_BASE_URL =
  "https://bug-free-space-capybara-jj4vvvrg6xggfq9qp-5000.app.github.dev";

function ProductDetails(){

const {id}=useParams();
const navigate = useNavigate();

const [product,setProduct]=useState(null);
const [relatedProducts, setRelatedProducts] = useState([]);
const [quantity, setQuantity] = useState(1);
const [rating, setRating] = useState(5);
const [comment, setComment] = useState("");
const [weight, setWeight] = useState("1");
const [flavour, setFlavour] = useState("Chocolate");
const [cakeMessage, setCakeMessage] = useState("");
const [instructions, setInstructions] = useState("");
const [deliveryDate, setDeliveryDate] = useState("");
const [deliveryTime, setDeliveryTime] = useState("");
const {addToCart}=useCart();

useEffect(() => {
  window.scrollTo(0, 0);
  loadProduct();
}, [id]);

const loadProduct = async () => {
  try {
    const { data } = await API.get(`/products/${id}`);
    setProduct(data);

    const response = await API.get("/products");

    const related = response.data
      .filter(
        (item) =>
          item.category === data.category &&
          item._id !== data._id
      )
      .slice(0, 4);

    setRelatedProducts(related);

  } catch (err) {
    console.error(err);
  }
};
const submitReview = async () => {
  try {
    await API.post(`/products/${id}/reviews`, {
      rating,
      comment,
    });

    alert("Review submitted successfully!");

    setRating(5);
    setComment("");

    loadProduct();
  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Failed to submit review."
    );
  }
};
const handleBuyNow = () => {
  const buyNowItem = {
    ...product,
    quantity,
    weight,
    cakeMessage,
    deliveryDate,
    deliveryTime,
    instructions,
  };

  localStorage.setItem("buyNow", JSON.stringify([buyNowItem]));
  navigate("/checkout");
};
if (!product) {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <h2 className="text-2xl font-semibold animate-pulse">
        Loading Product...
      </h2>
    </div>
  );
}

return(

<div className="max-w-7xl mx-auto px-6 py-12">

<div className="grid lg:grid-cols-2 gap-12 items-start">

<div className="col-md-6">

<img
src={`${IMAGE_BASE_URL}${product.image}`}
className="w-full rounded-3xl shadow-xl hover:scale-105 transition duration-500"
/>

</div>

<div className="col-md-6">

<h2 className="text-4xl font-bold text-gray-800">
  {product.name}
</h2>

<h3 className="text-3xl font-bold text-pink-600 mt-4">
₹ {product.price}
</h3>

<p className="text-gray-600 leading-8 mt-6">
  {product.description}
</p>

<p>
<b>Category:</b> {product.category}
</p>

<p>
<b>Stock:</b> {product.stock}
</p>

<div className="flex items-center gap-4 mt-6">

  <span className="font-semibold">Quantity</span>

  <button
    onClick={() => setQuantity(Math.max(1, quantity - 1))}
    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
  >
    −
  </button>

  <span className="text-xl font-bold">
    {quantity}
  </span>

  <button
    onClick={() => setQuantity(quantity + 1)}
    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
  >
    +
  </button>

</div>
<div className="mt-8 bg-pink-50 rounded-2xl p-6 space-y-5">

  <h3 className="text-2xl font-bold text-pink-600">
    Order Details
  </h3>

  {/* Weight */}
  <div>
    <label className="font-semibold">Cake Weight</label>

    <select
      value={weight}
      onChange={(e) => setWeight(e.target.value)}
      className="w-full border rounded-xl p-3 mt-2"
    >
      <option value="0.5 Kg">0.5 Kg</option>
      <option value="1 Kg">1 Kg</option>
      <option value="1.5 Kg">1.5 Kg</option>
      <option value="2 Kg">2 Kg</option>
      <option value="3 Kg">3 Kg</option>
    </select>
  </div>

  {/* Message */}
  <div>
    <label className="font-semibold">Cake Message</label>

    <input
      type="text"
      value={cakeMessage}
      onChange={(e) => setCakeMessage(e.target.value)}
      placeholder="Happy Birthday Rahul"
      className="w-full border rounded-xl p-3 mt-2"
    />
  </div>

  {/* Delivery Date */}
  <div>
    <label className="font-semibold">Delivery Date</label>

    <input
      type="date"
      value={deliveryDate}
      onChange={(e) => setDeliveryDate(e.target.value)}
      className="w-full border rounded-xl p-3 mt-2"
    />
  </div>

  {/* Delivery Time */}
  <div>
    <label className="font-semibold">Delivery Time</label>

    <input
      type="time"
      value={deliveryTime}
      onChange={(e) => setDeliveryTime(e.target.value)}
      className="w-full border rounded-xl p-3 mt-2"
    />
  </div>

  {/* Instructions */}
  <div>
    <label className="font-semibold">
      Special Instructions
    </label>

    <textarea
      rows="3"
      value={instructions}
      onChange={(e) => setInstructions(e.target.value)}
      placeholder="Less cream, extra chocolate..."
      className="w-full border rounded-xl p-3 mt-2"
    />
  </div>

</div>
<button
className="mt-8 bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-xl transition"
onClick={() =>
  addToCart({
    ...product,
    quantity,
    weight,
    cakeMessage,
    deliveryDate,
    deliveryTime,
    instructions,
  })
}
>

🛒 Add to Cart

</button>
<button
  onClick={handleBuyNow}
  className="mt-4 ml-4 border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-8 py-3 rounded-xl transition"
>
  ⚡ Buy Now
</button>
<div className="mt-10 border-t pt-8">

  <h3 className="text-2xl font-bold mb-4">
    Write a Review
  </h3>

  <div className="mb-4">
    <label className="font-semibold">
      Rating
    </label>

    <select
      value={rating}
      onChange={(e) => setRating(e.target.value)}
      className="w-full mt-2 border rounded-lg p-3"
    >
      <option value="5">⭐⭐⭐⭐⭐ (5)</option>
      <option value="4">⭐⭐⭐⭐ (4)</option>
      <option value="3">⭐⭐⭐ (3)</option>
      <option value="2">⭐⭐ (2)</option>
      <option value="1">⭐ (1)</option>
    </select>
  </div>

  <div className="mb-4">
    <label className="font-semibold">
      Comment
    </label>

    <textarea
      rows="4"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="w-full mt-2 border rounded-lg p-3"
      placeholder="Write your review..."
    />
  </div>

  <button
    onClick={submitReview}
    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg"
  >
    Submit Review
  </button>

</div>
<div className="mt-10">
  <h3 className="text-2xl font-bold mb-6">
    Customer Reviews
  </h3>

  {product.reviews && product.reviews.length > 0 ? (
    product.reviews.map((review) => (
      <div
        key={review._id}
        className="border rounded-xl p-5 mb-4 shadow-sm"
      >
        <h4 className="font-bold text-lg">
          {review.name}
        </h4>

        <p className="text-yellow-500 text-xl">
          {"⭐".repeat(review.rating)}
        </p>

        <p className="text-gray-700 mt-2">
          {review.comment}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          {new Date(review.createdAt).toLocaleDateString()}
        </p>
      </div>
    ))
  ) : (
    <p className="text-gray-500">
      No reviews yet. Be the first to review this product!
    </p>
  )}
</div>

</div>

</div>
{/* Related Products */}

<div className="mt-20">

  <h2 className="text-3xl font-bold mb-8">
    You May Also Like
  </h2>

  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

    {relatedProducts.map((item) => (

      <div
        key={item._id}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
      >

        <img
          src={`${IMAGE_BASE_URL}${item.image}`}
          alt={item.name}
          className="w-full h-52 object-cover"
        />

        <div className="p-4">

          <h3 className="font-bold">
            {item.name}
          </h3>

          <p className="text-pink-600 font-bold mt-2">
            ₹{item.price}
          </p>

          <Link
            to={`/product/${item._id}`}
            className="mt-4 inline-block text-pink-600 font-semibold hover:underline"
          >
            View Details →
          </Link>

        </div>

      </div>

    ))}

  </div>

</div>

</div>


);

}

export default ProductDetails;