import { useState } from "react";
import axios from "axios";
import "./AdminAddService.css";

export default function AdminAddService() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    bullets: "",
    heading: "",
    heading_desc: "",
  });

  const [images, setImages] = useState({
    primary_image: null,
    image2: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImages({ ...images, [e.target.name]: e.target.files[0] });
  };

  const submitService = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    formData.append("primary_image", images.primary_image);
    formData.append("image2", images.image2);

    const token = localStorage.getItem("token");

    await axios.post("http://localhost:8080/services", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Service Created");
  };

  return (
    <div className="admin-service">
      <h2>Create Service</h2>

      <form onSubmit={submitService} className="service-form">
        <input
          name="title"
          placeholder="Service Title"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          name="bullets"
          placeholder="Bullets (comma separated)"
          onChange={handleChange}
        />

        <input name="heading" placeholder="Heading" onChange={handleChange} />

        <textarea
          name="heading_desc"
          placeholder="Heading Description"
          onChange={handleChange}
        />

        <label>Primary Image</label>
        <input type="file" name="primary_image" onChange={handleImage} />

        <label>Second Image</label>
        <input type="file" name="image2" onChange={handleImage} />

        <button>Create Service</button>
      </form>
    </div>
  );
}
