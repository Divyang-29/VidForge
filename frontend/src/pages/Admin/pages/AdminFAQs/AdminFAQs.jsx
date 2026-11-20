import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminFAQs.css";

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const token = localStorage.getItem("token");

  const fetchFaqs = async () => {
    const res = await axios.get("http://localhost:8080/faqs");

    setFaqs(res.data);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const addFaq = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:8080/faqs",
      { question, answer },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setQuestion("");
    setAnswer("");
    fetchFaqs();
  };

  const deleteFaq = async (id) => {
    await axios.delete(`http://localhost:8080/faqs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchFaqs();
  };

  return (
    <div className="admin-faq">
      <h2>Manage FAQs</h2>

      {/* add faq */}

      <form onSubmit={addFaq} className="faq-form">
        <input
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <textarea
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button>Add FAQ</button>
      </form>

      {/* faq list */}

      <div className="faq-list">
        {faqs.map((faq) => (
          <div key={faq.id} className="faq-card">
            <div>
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
            </div>

            <button className="delete-btn" onClick={() => deleteFaq(faq.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
