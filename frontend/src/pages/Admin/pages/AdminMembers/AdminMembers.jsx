import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminMembers.css";
import { API_URL } from "../../../../config/api";

export default function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  const fetchMembers = async () => {
    const res = await axios.get(`${API_URL}/members`);

    setMembers(res.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const addMember = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("position", position);
    formData.append("image", image);

    await axios.post(`${API_URL}/members`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setName("");
    setPosition("");
    fetchMembers();
  };

  const deleteMember = async (id) => {
    await axios.delete(`${API_URL}/members/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchMembers();
  };

  return (
    <div className="admin-members">
      <h2>Team Members</h2>

      {/* Add member form */}

      <form onSubmit={addMember} className="member-form">
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

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button>Add Member</button>
      </form>

      {/* members grid */}

      <div className="member-grid">
        {members.map((member) => (
          <div key={member.id} className="member-card">
            <img src={`${API_URL}/uploads/${member.image}`} alt="" />

            <h4>{member.name}</h4>
            <p>{member.position}</p>

            <button onClick={() => deleteMember(member.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
