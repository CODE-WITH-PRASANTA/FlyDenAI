import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./OurSuccessfulClients.css";

interface Client {
  id: number;
  name: string;
  projectName: string;
  paymentAmount: string;
  paymentDate: string;
  email: string;
  phone: string;
}

const OurSuccessfulClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [formData, setFormData] = useState<Omit<Client, "id">>({
    name: "",
    projectName: "",
    paymentAmount: "",
    paymentDate: "",
    email: "",
    phone: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId !== null) {
      setClients((prev) =>
        prev.map((client) =>
          client.id === editingId ? { ...client, ...formData } : client
        )
      );
      setEditingId(null);
    } else {
      const newClient: Client = {
        id: Date.now(),
        ...formData,
      };
      setClients((prev) => [...prev, newClient]);
    }

    setFormData({
      name: "",
      projectName: "",
      paymentAmount: "",
      paymentDate: "",
      email: "",
      phone: "",
    });
  };

  const handleEdit = (id: number) => {
    const clientToEdit = clients.find((client) => client.id === id);
    if (clientToEdit) {
      setFormData({
        name: clientToEdit.name,
        projectName: clientToEdit.projectName,
        paymentAmount: clientToEdit.paymentAmount,
        paymentDate: clientToEdit.paymentDate,
        email: clientToEdit.email,
        phone: clientToEdit.phone,
      });
      setEditingId(id);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      setClients((prev) => prev.filter((client) => client.id !== id));
    }
  };

  return (
    <div className="clients-container">
      {/* Left side form */}
      <div className="left-form">
        <h2>Our Successful Clients</h2>
        <form onSubmit={handleSubmit}>
          <label>Client Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Project Name</label>
          <input
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
          />

          <label>Payment Amount</label>
          <input
            name="paymentAmount"
            value={formData.paymentAmount}
            onChange={handleChange}
            required
          />

          <label>Payment Date</label>
          <input
            type="date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {editingId ? "Update Client" : "Add Client"}
          </button>
        </form>
      </div>

      {/* Right side table */}
      <div className="right-table">
        <h3>Client Data</h3>
        <table>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Project</th>
              <th>Payment Amount</th>
              <th>Payment Date</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.projectName}</td>
                <td>{client.paymentAmount}</td>
                <td>{client.paymentDate}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td className="icon-buttons">
                  <FaEdit
                    className="edit-icon"
                    onClick={() => handleEdit(client.id)}
                    title="Edit"
                  />
                  <FaTrash
                    className="delete-icon"
                    onClick={() => handleDelete(client.id)}
                    title="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OurSuccessfulClients;
