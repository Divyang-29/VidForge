import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminTerms.css";
import { API_URL } from "../../../../config/api";

export default function AdminTerms() {
  const [terms, setTerms] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  const fetchTerms = async () => {
    const res = await axios.get(`${API_URL}/terms`);

    setTerms(res.data);
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  const addTerm = async (e) => {
    e.preventDefault();

    await axios.post(
      `${API_URL}/terms`,
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setTitle("");
    setContent("");

    fetchTerms();
  };

  return (
    <div className="admin-terms">
      <h2>Terms & Conditions</h2>

      <form onSubmit={addTerm} className="terms-form">
        <input
          placeholder="Section Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button>Add Section</button>
      </form>

      <div className="terms-list">
        {terms.map((term) => (
          <div key={term.id} className="term-card">
            <h4>{term.title}</h4>
            <p>{term.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
