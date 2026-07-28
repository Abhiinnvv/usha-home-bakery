import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useCart } from "../contexts/CartContext";
import ReviewSection from "../components/ReviewSection";
import WorkGallery from "../components/WorkGallery";

const IMAGE_BASE_URL =
  "https://bug-free-space-capybara-jj4vvvrg6xggfq9qp-5000.app.github.dev";

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async () => {
  try {
    const { data } = await API.get("/products");
    console.log("Products:", data);
    setProducts(data.slice(0, 4));
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div>

      {/* Premium Hero Section */}


<section className="bg-gradient-to-r from-rose-50 via-pink-50 to-orange-50 py-16 lg:py-20 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

    {/* Left Side */}

    <motion.div
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >

      <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold">
        Freshly Baked Everyday
      </span>

      <h1 className="mt-5 text-5xl lg:text-6xl font-extrabold leading-tight text-gray-800">

        Crafted With
        <br />

        <span className="text-pink-600">
          Love & Sweetness
        </span>

      </h1>

      <p className="mt-6 text-lg text-gray-600 leading-8">

        Discover handcrafted cakes, pastries, cookies and bakery delights
        made from premium ingredients. Every bite is baked fresh and
        delivered with love.

      </p>

      <div className="flex gap-5 mt-10">

        <Link
         to="/customize-cake"
          className="bg-pink-600 hover:bg-pink-700 duration-300 text-white px-8 py-4 rounded-full font-semibold shadow-lg"
        >
          Shop Now
        </Link>

        <Link
          to="/about"
          className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white duration-300 px-8 py-4 rounded-full font-semibold"
        >
          Learn More
        </Link>

      </div>

      <div className="flex gap-10 mt-12">

        <div>
          <h2 className="text-3xl font-bold text-pink-600">
            500+
          </h2>

          <p className="text-gray-500">
            Happy Customers
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-pink-600">
            50+
          </h2>

          <p className="text-gray-500">
            Bakery Items
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-pink-600">
            ★ 4.9
          </h2>

          <p className="text-gray-500">
            Customer Rating
          </p>
        </div>

      </div>

    </motion.div>

    {/* Right Side */}

    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >

      <img
        src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900"
        alt="Cake"
        className="rounded-[40px] shadow-2xl hover:scale-105 duration-500"
      />

      <div className="absolute -bottom-6 left-10 bg-white p-5 rounded-2xl shadow-xl">

        <h3 className="font-bold text-pink-600">
          Today's Special
        </h3>

        <p className="text-gray-500">
          Chocolate Truffle Cake
        </p>

      </div>

    </motion.div>

  </div>
</section>


{/* Best Sellers */}

<section className="py-20 bg-rose-50">

  <div className="max-w-7xl mx-auto px-6">

    <div className="flex justify-between items-center mb-12">

      <div>

        <h2 className="text-5xl font-bold text-gray-800">
          Best Sellers
        </h2>

        <p className="text-gray-500 mt-2">
          Our customers' favourite bakery delights.
        </p>

      </div>

      <Link
        to="/products"
        className="text-pink-600 font-semibold hover:underline"
      >
        View All →
      </Link>

    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {products.map((product) => (

        <div
          key={product._id}
          className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 group"
        >

          <div className="relative overflow-hidden">

            <img
  src={`${IMAGE_BASE_URL}${product.image}`}
  alt={product.name}
  className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
  onError={(e) => {
    e.target.src =
      "https://via.placeholder.com/600x400?text=No+Image";
  }}
/>

            <span className="absolute top-4 left-4 bg-pink-600 text-white text-xs px-3 py-1 rounded-full">
              Bestseller
            </span>

          </div>

          <div className="p-6">

            <div className="flex justify-between items-center mb-2">

              <h3 className="font-bold text-xl">
                {product.name}
              </h3>

              <span className="text-yellow-500">
                ⭐ 4.9
              </span>

            </div>

            <p className="text-pink-600 text-2xl font-bold">
              ₹{product.price}
            </p>

            <Link
  to={`/product/${product._id}`}
  className="mt-6 block w-full text-center bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-full font-semibold transition duration-300"
>
  Customize & Order
</Link>

          </div>

        </div>

      ))}

    </div>

  </div>

</section>

      {/* Why Choose Us */}

<section className="py-24 bg-gradient-to-b from-white to-rose-50">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">

      <h2 className="text-5xl font-bold text-gray-800">
        Why Choose Usha Home Bakery?
      </h2>

      <p className="mt-4 text-lg text-gray-500">
        Every dessert is crafted with passion, premium ingredients, and a touch of love.
      </p>

    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {[
        {
          icon: "🍰",
          title: "Fresh Everyday",
          desc: "Every cake, pastry and cookie is baked fresh every morning.",
        },
        {
          icon: "🚚",
          title: "Fast Delivery",
          desc: "Quick and safe doorstep delivery with freshness guaranteed.",
        },
        {
          icon: "👨‍🍳",
          title: "Expert Bakers",
          desc: "Prepared by skilled bakers with years of experience.",
        },
        {
          icon: "❤️",
          title: "Made With Love",
          desc: "Every order is handcrafted with care to make your moments special.",
        },
      ].map((item) => (

        <div
          key={item.title}
          className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition duration-500 text-center"
        >

          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-pink-100 text-5xl">

            {item.icon}

          </div>

          <h3 className="text-2xl font-bold text-gray-800">

            {item.title}

          </h3>

          <p className="mt-4 text-gray-500 leading-7">

            {item.desc}

          </p>

        </div>

      ))}

    </div>

  </div>

</section>
<ReviewSection />

<WorkGallery />

<section className="bg-pink-600 text-white py-20 text-center">
  
</section>
<ReviewSection />

      {/* Footer CTA */}

      <section className="bg-pink-600 text-white py-20 text-center">

        <h2 className="text-5xl font-bold mb-6">
          Taste the Sweetness Today
        </h2>

        <Link
          to="/products"
          className="bg-white text-pink-600 px-8 py-3 rounded-lg font-bold"
        >
          Explore Products
        </Link>

      </section>

    </div>
  );
}

export default Home;