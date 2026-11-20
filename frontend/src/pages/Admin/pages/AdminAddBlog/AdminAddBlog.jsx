import { useState } from "react";
import axios from "axios";
import "./AdminAddBlog.css";
import { API_URL } from "../../../../config/api";

export default function AdminAddBlog() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    quote: "",
    author: "",
    minutes_to_read: "",
    section_title: "",
    section_content: "",
    tags: "",
  });

  const [images, setImages] = useState({
    primary_image: null,
    big_image: null,
    image1: null,
    image2: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImages({ ...images, [e.target.name]: e.target.files[0] });
  };

  const submitBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    Object.keys(images).forEach((key) => {
      formData.append(key, images[key]);
    });

    const token = localStorage.getItem("token");

    await axios.post(`${API_URL}/blogs`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Blog Created");
  };

  return (
    <div className="admin-blog">
      <h2>Create Blog</h2>

      <form onSubmit={submitBlog} className="blog-form">
        <input name="title" placeholder="Blog Title" onChange={handleChange} />

        <input name="author" placeholder="Author" onChange={handleChange} />

        <input
          name="minutes_to_read"
          placeholder="Minutes to read"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <textarea name="quote" placeholder="Quote" onChange={handleChange} />

        <input
          name="section_title"
          placeholder="Section Title"
          onChange={handleChange}
        />

        <textarea
          name="section_content"
          placeholder="Section Content"
          onChange={handleChange}
        />

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          onChange={handleChange}
        />

        <label>Primary Image</label>
        <input type="file" name="primary_image" onChange={handleImage} />

        <label>Big Image</label>
        <input type="file" name="big_image" onChange={handleImage} />

        <label>Image 1</label>
        <input type="file" name="image1" onChange={handleImage} />

        <label>Image 2</label>
        <input type="file" name="image2" onChange={handleImage} />

        <button>Create Blog</button>
      </form>
    </div>
  );
}
