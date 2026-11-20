import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminReviews.css";
import { API_URL } from "../../../../config/api";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);

  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  const fetchReviews = async () => {
    const res = await axios.get(`${API_URL}/reviews`);

    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const addReview = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("review", review);
    formData.append("name", name);
    formData.append("position", position);
    formData.append("rating", rating);
    formData.append("image", image);

    await axios.post(`${API_URL}/reviews`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setReview("");
    setName("");
    setPosition("");
    setRating("");
    fetchReviews();
  };

  const deleteReview = async (id) => {
    await axios.delete(`${API_URL}/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchReviews();
  };

  return (
    <div className="admin-reviews">
      <h2>Customer Reviews</h2>

      {/* form */}

      <form onSubmit={addReview} className="review-form">
        <textarea
          placeholder="Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <input
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button>Add Review</button>
      </form>

      {/* review list */}

      <div className="review-grid">
        {reviews.map((item) => (
          <div key={item.id} className="review-card">
            <img src={`${API_URL}/uploads/${item.image}`} alt="" />

            <p className="review-text">"{item.review}"</p>

            <h4>{item.name}</h4>
            <span>{item.position}</span>

            <div className="rating">{"⭐".repeat(item.rating)}</div>

            <button onClick={() => deleteReview(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
