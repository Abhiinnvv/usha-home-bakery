import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import AdminLayout from "../components/admin/AdminLayout";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      alert("Product Deleted");

      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Unable to delete product");
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>📦 Product Management</h2>

          <Link
            to="/admin/add-product"
            className="btn btn-success"
          >
            + Add Product
          </Link>
        </div>

        <table className="table table-bordered table-hover align-middle">

          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th width="180">Action</th>
            </tr>
          </thead>

          <tbody>

            {products.map((product) => (

              <tr key={product._id}>

                <td>
                  <img
                    src={`https://bug-free-space-capybara-jj4vvvrg6xggfq9qp-5000.app.github.dev${product.image}`}
                    alt={product.name}
                    width="70"
                    height="70"
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </td>

                <td>{product.name}</td>

                <td>{product.category}</td>

                <td>₹ {product.price}</td>

                <td>{product.stock}</td>

                <td>

                  <Link
                    to={`/admin/edit-product/${product._id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </AdminLayout>
  );
}

export default AdminProducts;