import { useState } from "react";
import axios from "axios";
import "./AdminAddProduct.css";
import { API_URL } from "../../../../config/api";

export default function AdminAddProduct() {
  const [form, setForm] = useState({
    category: "",
    sub_category: "",
    title: "",
    description: "",
    price: "",
    discounted_price: "",
    stock: "",
    tags: "",
    additional_info: "",
  });

  const [primaryImage, setPrimaryImage] = useState(null);
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    formData.append("primary_image", primaryImage);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    const token = localStorage.getItem("token");

    await axios.post(`${API_URL}/products`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Product added successfully");
  };

  return (
    <div className="admin-product">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <input name="category" placeholder="Category" onChange={handleChange} />

        <input
          name="sub_category"
          placeholder="Sub Category"
          onChange={handleChange}
        />

        <input name="title" placeholder="Title" onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <input name="price" placeholder="Price" onChange={handleChange} />

        <input
          name="discounted_price"
          placeholder="Discounted Price"
          onChange={handleChange}
        />

        <input name="stock" placeholder="Stock" onChange={handleChange} />

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          onChange={handleChange}
        />

        <textarea
          name="additional_info"
          placeholder="Additional Info JSON"
          onChange={handleChange}
        />

        <label>Primary Image</label>
        <input
          type="file"
          onChange={(e) => setPrimaryImage(e.target.files[0])}
        />

        <label>Gallery Images</label>
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
