import React, { useState } from "react";
import "./ClientAction.css";
import { useTheme } from "../../context/ThemeContext";

interface Client {
  id: number;
  name: string;
  rating: number;
  message: string;
  published: boolean;
  expanded?: boolean;
}

const ClientAction: React.FC = () => {
  const { theme } = useTheme(); // ✅ Access current theme
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      message:
        "Excellent service! The team was very professional and responsive. They completed the project before the deadline with great quality. Highly recommended for anyone looking for reliable developers.",
      published: true,
      expanded: false,
    },
    {
      id: 2,
      name: "Riya Patel",
      rating: 4,
      message:
        "Very satisfied with the work! Communication was smooth, and the design exceeded my expectations. Will definitely work with them again for future projects.",
      published: false,
      expanded: false,
    },
  ]);

  const togglePublish = (id: number) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === id ? { ...client, published: !client.published } : client
      )
    );
  };

  const deleteClient = (id: number) => {
    setClients((prev) => prev.filter((client) => client.id !== id));
  };

  const toggleReadMore = (id: number) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === id ? { ...client, expanded: !client.expanded } : client
      )
    );
  };

  return (
    <div className={`clientAction-container ${theme}`}>
      <h2 className="clientAction-title">📋 Client Testimonials Management</h2>

      <div className="clientAction-tableWrapper">
        {clients.length === 0 ? (
          <p className="clientAction-noData">No client data available 💬</p>
        ) : (
          <table className="clientAction-table">
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Client Name</th>
                <th>Rating</th>
                <th>Client Message</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={client.id}>
                  <td>{index + 1}</td>
                  <td>{client.name}</td>
                  <td>
                    {"★".repeat(client.rating)}
                    {"☆".repeat(5 - client.rating)}
                  </td>
                  <td className="clientAction-message">
                    {client.expanded
                      ? client.message
                      : client.message.slice(0, 80) +
                        (client.message.length > 80 ? "..." : "")}
                    {client.message.length > 80 && (
                      <button
                        className="clientAction-readMoreBtn"
                        onClick={() => toggleReadMore(client.id)}
                      >
                        {client.expanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </td>
                  <td>
                    <span
                      className={`clientAction-status ${
                        client.published ? "active" : "inactive"
                      }`}
                    >
                      {client.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="clientAction-actions">
                    <button
                      className={`clientAction-btn ${
                        client.published ? "unpublish" : "publish"
                      }`}
                      onClick={() => togglePublish(client.id)}
                    >
                      {client.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      className="clientAction-btn delete"
                      onClick={() => deleteClient(client.id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ClientAction;
