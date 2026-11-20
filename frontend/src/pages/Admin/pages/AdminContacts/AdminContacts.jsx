import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminContacts.css";
import { API_URL } from "../../../../config/api";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);

  const token = localStorage.getItem("token");

  const fetchContacts = async () => {
    const res = await axios.get(`${API_URL}/contact/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    await axios.delete(`${API_URL}/contact/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchContacts();
  };

  return (
    <div className="admin-contacts">
      <h2>Contact Messages</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Message</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.website}</td>
              <td>{contact.message}</td>

              <td>
                <button onClick={() => deleteContact(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
