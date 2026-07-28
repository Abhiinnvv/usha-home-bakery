import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../contexts/CartContext";
import ProductSkeleton from "../components/ProductSkeleton";

const IMAGE_BASE_URL =
  "https://bug-free-space-capybara-jj4vvvrg6xggfq9qp-5000.app.github.dev";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
const { addToCart } = useCart();
const [category, setCategory] = useState("All");
const [sortBy, setSortBy] = useState("default");
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
const categories = [
  "All",
  ...new Set(products.map((product) => product.category)),
];
  const filteredProducts = [...products]
  .filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  })
  .sort((a, b) => {
    if (sortBy === "low-high") return a.price - b.price;
    if (sortBy === "high-low") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });
  {/* Shop Banner */}

<section className="relative h-72 rounded-3xl overflow-hidden mb-12">

  <img
    src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1600"
    alt="Bakery"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">

    <h1 className="text-5xl font-bold">
      Freshly Baked Every Day
    </h1>

    <p className="mt-3 text-lg">
      Discover handcrafted cakes, pastries & desserts.
    </p>

  </div>

</section>

  return (
  <>
    <section className="relative h-72 overflow-hidden">

      <img
        src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1600"
        alt="Bakery"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">

        <h1 className="text-5xl font-bold">
          Shop Our Collection
        </h1>

        <p className="mt-4 text-lg">
          Freshly baked happiness delivered every day.
        </p>

      </div>

    </section>

    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">
        Our Bakery Products
      </h1>

     <div className="relative mb-8">

  <input
    type="text"
    placeholder="Search cakes, pastries, cookies..."
    className="w-full rounded-full border border-gray-300 py-4 pl-6 pr-14 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl">
    🔍
  </span>

</div>
<div className="flex flex-wrap gap-3 mb-10">

  {categories.map((item) => (

    <button
      key={item}
      onClick={() => setCategory(item)}
      className={`px-5 py-2 rounded-full transition ${
        category === item
          ? "bg-pink-600 text-white"
          : "bg-white border hover:bg-pink-50"
      }`}
    >
      {item}
    </button>

  ))}

</div>
<div className="flex justify-between items-center mb-8 flex-wrap gap-4">
<p className="text-gray-600">
  Showing <span className="font-semibold">{filteredProducts.length}</span> products
</p>
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
  >
    <option value="default">Sort By</option>
    <option value="low-high">Price: Low to High</option>
    <option value="high-low">Price: High to Low</option>
    <option value="name">Name (A-Z)</option>
  </select>

</div>
      {loading ? (
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {[...Array(8)].map((_, index) => (
      <ProductSkeleton key={index} />
    ))}
  </div>
) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-700">
  😔 No Products Found
</h2>
          <p className="text-gray-500 mt-2">
            Try changing your search or category filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
           <div
  key={product._id}
  className="group bg-white rounded-2xl shadow-lg overflow-hidden
             hover:shadow-2xl hover:-translate-y-2
             transition-all duration-300 cursor-pointer"
>
              <div className="relative overflow-hidden">

  <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs px-3 py-1 rounded-full z-10">
    Best Seller
  </span>
              <img
                src={`${IMAGE_BASE_URL}${product.image}`}
                alt={product.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
</div>
              <div className="p-5">
                <h2 className="text-xl font-bold">{product.name}</h2>

                <p className="text-2xl font-bold text-pink-600 mt-3">
                  ₹{product.price}
                </p>

                <p className="text-gray-500 text-sm leading-6 mt-3 line-clamp-2">
                  {product.description}
                </p>
                <p
  className={`mt-2 font-semibold ${
    product.stock > 0
      ? "text-green-600"
      : "text-red-600"
  }`}
>
  
</p>

                <div className="flex gap-3 mt-5">
                  <button
  onClick={() => addToCart(product)}
  disabled={product.stock === 0}
  className={`flex-1 py-2 rounded-lg transition-all duration-300 ${
    product.stock > 0
      ? "bg-pink-600 hover:bg-pink-700 hover:scale-105 text-white"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
</button>

                  <Link
                    to={`/product/${product._id}`}
                    className="flex-1 border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white text-center py-2 rounded-lg transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

</>
);
}

export default Products;