import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("description", formData.description);

      if (image) {
        data.append("image", image);
      }

      await API.post("/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Added Successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Unable to add product");
    }
  };

  return (
    <AdminLayout>
      <div className="container py-4">
        <h2 className="mb-4">Add Product</h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <textarea
            className="form-control mb-3"
            rows="4"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-success">
            Add Product
          </button>

        </form>
      </div>
    </AdminLayout>
  );
}

export default AddProduct;