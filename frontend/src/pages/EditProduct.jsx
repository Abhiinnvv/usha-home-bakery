import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import AdminLayout from "../components/admin/AdminLayout";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);

      setFormData({
        name: data.name,
        category: data.category,
        price: data.price,
        stock: data.stock,
        description: data.description,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();

      body.append("name", formData.name);
      body.append("category", formData.category);
      body.append("price", formData.price);
      body.append("stock", formData.stock);
      body.append("description", formData.description);

      if (image) {
        body.append("image", image);
      }

      await API.put(`/products/${id}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Updated Successfully");

      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Unable to update product");
    }
  };

  return (
    <AdminLayout>
      <div className="container py-4">
        <h2>Edit Product</h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />

          <textarea
            className="form-control mb-3"
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <label className="form-label">
            Change Image (optional)
          </label>

          <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button className="btn btn-primary">
            Update Product
          </button>

        </form>
      </div>
    </AdminLayout>
  );
}

export default EditProduct;