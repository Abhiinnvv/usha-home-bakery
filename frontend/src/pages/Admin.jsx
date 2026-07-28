import { useEffect, useState } from "react";
import API from "../services/api";

const IMAGE_BASE_URL =
  "https://bug-free-space-capybara-jj4vvvrg6xggfq9qp-5000.app.github.dev";

function Admin() {
  const emptyForm = {
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
  };

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [editing, setEditing] = useState(null);

  const token = localStorage.getItem("token");
  const [dashboard, setDashboard] = useState({
  totalProducts: 0,
  totalOrders: 0,
  totalCustomers: 0,
  totalRevenue: 0,
});

  const loadOrders = async () => {
  try {
    const { data } = await API.get("/orders/admin/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Admin Orders:", data);
    setOrders(data);
  } catch (err) {
    console.error(err);
    alert("Failed to load orders.");
  }
};

useEffect(() => {
  loadProducts();
  loadOrders();
  loadDashboard();
}, []);

  const loadProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load products.");
    }
  };
const loadDashboard = async () => {
  try {
    const { data } = await API.get("/admin/dashboard");

    setDashboard(data);
  } catch (err) {
    console.error(err);
    alert("Failed to load dashboard.");
  }
};
  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (image) {
        formData.append("image", image);
      }

      if (editing) {
        await API.put(`/products/${editing}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Product Updated Successfully");
      } else {
        await API.post("/products", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Product Added Successfully");
      }

      setEditing(null);
      setImage(null);
      setPreview("");
      setForm(emptyForm);

      loadProducts();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to save product."
      );
    }
  };

  const editProduct = (product) => {
    setEditing(product._id);

    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
    });

    setPreview(`${IMAGE_BASE_URL}${product.image}`);
    setImage(null);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };
const updateStatus = async (id, orderStatus) => {
  try {
    await API.put(
      `/orders/admin/${id}`,
      { orderStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadOrders();
  } catch (err) {
  console.error(err);

  console.log(err.response);

  alert(
    err.response?.data?.message || err.message
  );
}
};
  return (
    <div className="container py-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="row mb-4">
  <div className="col-md-3">
    <div className="card text-center shadow">
      <div className="card-body">
        <h6>Total Products</h6>
        <h3>{dashboard.totalProducts}</h3>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card text-center shadow">
      <div className="card-body">
        <h6>Total Orders</h6>
        <h3>{dashboard.totalOrders}</h3>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card text-center shadow">
      <div className="card-body">
        <h6>Total Customers</h6>
        <h3>{dashboard.totalCustomers}</h3>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card text-center shadow">
      <div className="card-body">
        <h6>Total Revenue</h6>
        <h3>₹{dashboard.totalRevenue}</h3>
      </div>
    </div>
  </div>
</div>

      <form onSubmit={submitHandler} className="card p-4 mb-5">
        <h4>{editing ? "Edit Product" : "Add Product"}</h4>

        <input
          className="form-control mb-3"
          placeholder="Product Name"
          name="name"
          value={form.name}
          onChange={changeHandler}
          required
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Price"
          name="price"
          value={form.price}
          onChange={changeHandler}
          required
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={changeHandler}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Category"
          name="category"
          value={form.category}
          onChange={changeHandler}
          required
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Stock"
          name="stock"
          value={form.stock}
          onChange={changeHandler}
          required
        />

        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={imageHandler}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              width: 180,
              height: 180,
              objectFit: "cover",
              borderRadius: 10,
              marginBottom: 20,
            }}
          />
        )}

        <div>
          <button className="btn btn-success me-2">
            {editing ? "Update Product" : "Add Product"}
          </button>

          {editing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEditing(null);
                setImage(null);
                setPreview("");
                setForm(emptyForm);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="row">
        {products.length === 0 ? (
          <div className="col-12 text-center">
            <h4>No products available.</h4>
          </div>
        ) : (
          products.map((product) => (
            <div
              className="col-md-4 mb-4"
              key={product._id}
            >
              <div className="card h-100 shadow">
                <img
                  src={`${IMAGE_BASE_URL}${product.image}`}
                  alt={product.name}
                  className="card-img-top"
                  style={{
                    height: 220,
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />

                <div className="card-body">
                  <h5>{product.name}</h5>

                  <p>
                    <strong>Price:</strong> ₹{product.price}
                  </p>

                  <p>
                    <strong>Category:</strong> {product.category}
                  </p>

                  <p>
                    <strong>Stock:</strong> {product.stock}
                  </p>

                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning"
                      onClick={() => editProduct(product)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        deleteProduct(product._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <hr className="my-5" />

<h2 className="mb-4">Customer Orders</h2>

{orders.length === 0 ? (
  <p>No orders found.</p>
) : (
  <div className="table-responsive">
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Customer</th>
          <th>Total</th>
          <th>Payment</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order.user?.name}</td>
            <td>₹{order.totalPrice}</td>
            <td>{order.paymentMethod}</td>
            <td>
  <select
  value={order.orderStatus}
  className="form-select"
  onChange={(e) => {
  console.log("Selected:", e.target.value);
  updateStatus(order._id, e.target.value);
}}
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
)}
    </div>
  );
}

export default Admin;