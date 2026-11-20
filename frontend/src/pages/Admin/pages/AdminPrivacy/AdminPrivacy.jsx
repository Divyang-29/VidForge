import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPrivacy.css";
import { API_URL } from "../../../../config/api";

export default function AdminPrivacy() {
  const [policies, setPolicies] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  const fetchPolicies = async () => {
    const res = await axios.get(`${API_URL}/privacy`);

    setPolicies(res.data);
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const addPolicy = async (e) => {
    e.preventDefault();

    await axios.post(
      `${API_URL}/privacy`,
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setTitle("");
    setContent("");
    fetchPolicies();
  };

  return (
    <div className="admin-privacy">
      <h2>Privacy Policy</h2>

      <form onSubmit={addPolicy} className="privacy-form">
        <input
          placeholder="Section Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Policy Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button>Add Section</button>
      </form>

      <div className="policy-list">
        {policies.map((policy) => (
          <div key={policy.id} className="policy-card">
            <h4>{policy.title}</h4>
            <p>{policy.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
