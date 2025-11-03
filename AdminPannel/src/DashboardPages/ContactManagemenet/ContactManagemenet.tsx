import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import "./ContactManagemenet.css";
import { useTheme } from "../../context/ThemeContext";
import BASE_URL from "../../Api"; // ✅ http://localhost:5000/api

interface SocialLinks {
  instagram: string;
  facebook: string;
  linkedin: string;
  twitter: string;
}

interface Contact {
  _id?: string;
  email: string;
  phone: string;
  whatsapp: string;
  social: SocialLinks;
  openHours: Record<string, string>;
  addresses: string[];
  published: boolean;
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ContactManagemenet: React.FC = () => {
  const { theme } = useTheme();
  const [contactsList, setContactsList] = useState<Contact[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [contactData, setContactData] = useState<Contact>({
    email: "",
    phone: "",
    whatsapp: "",
    social: { instagram: "", facebook: "", linkedin: "", twitter: "" },
    openHours: { Sun: "", Mon: "", Tue: "", Wed: "", Thu: "", Fri: "", Sat: "" },
    addresses: ["", "", ""],
    published: false,
  });

  // ✅ Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // ✅ Fetch all contacts on load
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/contacts`);
      if (res.data.success) {
        setContactsList(res.data.data);
      }
    } catch (err) {
      console.error("❌ Error fetching contacts:", err);
    }
  };

  // ✅ Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    index?: number,
    field?: "addresses" | "openHours",
    day?: string
  ) => {
    const { name, value } = e.target;

    if (field === "addresses" && typeof index === "number") {
      const updatedAddresses = [...contactData.addresses];
      updatedAddresses[index] = value;
      setContactData({ ...contactData, addresses: updatedAddresses });
    } else if (field === "openHours" && day) {
      setContactData({
        ...contactData,
        openHours: { ...contactData.openHours, [day]: value },
      });
    } else if (["instagram", "facebook", "linkedin", "twitter"].includes(name)) {
      setContactData({
        ...contactData,
        social: { ...contactData.social, [name]: value },
      });
    } else {
      setContactData({ ...contactData, [name]: value });
    }
  };

  // ✅ Submit form (Create or Update)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        const res = await axios.put(`${BASE_URL}/contacts/${editId}`, contactData);
        if (res.data.success) {
          fetchContacts();
          setEditId(null);
        }
      } else {
        const res = await axios.post(`${BASE_URL}/contacts`, contactData);
        if (res.data.success) {
          fetchContacts();
        }
      }

      // Reset form
      setContactData({
        email: "",
        phone: "",
        whatsapp: "",
        social: { instagram: "", facebook: "", linkedin: "", twitter: "" },
        openHours: { Sun: "", Mon: "", Tue: "", Wed: "", Thu: "", Fri: "", Sat: "" },
        addresses: ["", "", ""],
        published: false,
      });
    } catch (err) {
      console.error("❌ Error submitting contact:", err);
    }
  };

  // ✅ Delete contact
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      const res = await axios.delete(`${BASE_URL}/contacts/${id}`);
      if (res.data.success) {
        fetchContacts();
      }
    } catch (err) {
      console.error("❌ Error deleting contact:", err);
    }
  };

  // ✅ Edit contact
  const handleEdit = (id: string) => {
    const contact = contactsList.find((c) => c._id === id);
    if (contact) {
      setContactData(contact);
      setEditId(id);
    }
  };

  // ✅ Toggle publish status
  const togglePublish = async (id: string) => {
    try {
      const res = await axios.patch(`${BASE_URL}/contacts/${id}/publish`);
      if (res.data.success) fetchContacts();
    } catch (err) {
      console.error("❌ Toggle publish error:", err);
    }
  };

  return (
    <div className="ContactManagemenet-container">
      {/* =================== FORM SECTION =================== */}
      <div className="ContactManagemenet-form-section">
        <h2 className="ContactManagemenet-heading">
          {editId ? "Edit Contact" : "Add Contact"}
        </h2>

        <form onSubmit={handleSubmit} className="ContactManagemenet-form">
          <div className="ContactManagemenet-row">
            {["email", "phone", "whatsapp"].map((field, index) => (
              <div key={index} className="ContactManagemenet-item">
                <label>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={contactData[field as keyof Contact] as string}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  maxLength={field !== "email" ? 10 : undefined}
                  required={field !== "whatsapp"}
                />
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="ContactManagemenet-box">
            <h4>Social Media Handles</h4>
            <div className="ContactManagemenet-row">
              {["instagram", "facebook", "linkedin", "twitter"].map(
                (field, index) => (
                  <div key={index} className="ContactManagemenet-item">
                    <label>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={contactData.social[field as keyof SocialLinks]}
                      onChange={handleChange}
                      placeholder={`Enter ${field}`}
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Open Hours */}
          <div className="ContactManagemenet-box">
            <h4>Open Hours</h4>
            <div className="ContactManagemenet-row">
              {days.map((day) => (
                <div key={day} className="ContactManagemenet-item">
                  <label>{day}</label>
                  <div className="ContactManagemenet-timepair">
                    <input
                      type="time"
                      value={contactData.openHours[day]?.split("-")[0] || ""}
                      onChange={(e) => {
                        const end = contactData.openHours[day]?.split("-")[1] || "";
                        handleChange(
                          {
                            target: {
                              name: day,
                              value: `${e.target.value}-${end}`,
                            },
                          } as ChangeEvent<HTMLInputElement>,
                          undefined,
                          "openHours",
                          day
                        );
                      }}
                    />
                    <span className="ContactManagemenet-time-separator">to</span>
                    <input
                      type="time"
                      value={contactData.openHours[day]?.split("-")[1] || ""}
                      onChange={(e) => {
                        const start =
                          contactData.openHours[day]?.split("-")[0] || "";
                        handleChange(
                          {
                            target: {
                              name: day,
                              value: `${start}-${e.target.value}`,
                            },
                          } as ChangeEvent<HTMLInputElement>,
                          undefined,
                          "openHours",
                          day
                        );
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Addresses */}
          <div className="ContactManagemenet-box">
            <h4>Addresses</h4>
            {contactData.addresses.map((addr, i) => (
              <input
                key={i}
                type="text"
                value={addr}
                placeholder={`Address ${i + 1}`}
                onChange={(e) => handleChange(e, i, "addresses")}
              />
            ))}
          </div>

          <button type="submit" className="ContactManagemenet-submit-btn">
            {editId ? "Update Contact" : "Add Contact"}
          </button>
        </form>
      </div>

      {/* =================== TABLE SECTION =================== */}
      <div className="ContactManagemenet-table-section">
        <h2 className="ContactManagemenet-heading">Contacts List</h2>
        <div className="ContactManagemenet-table-wrapper">
          <table className="ContactManagemenet-table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Email</th>
                <th>Phone</th>
                <th>WhatsApp</th>
                <th>Social</th>
                <th>Open Hours</th>
                <th>Addresses</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contactsList.map((c, index) => (
                <tr key={c._id}>
                  <td>{index + 1}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.whatsapp}</td>
                  <td>
                    <div className="ContactManagemenet-socials">
                      {Object.entries(c.social).map(
                        ([key, val]) => val && (
                          <span key={key}>
                            {key.toUpperCase()}: {val}
                          </span>
                        )
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="ContactManagemenet-openhours">
                      {Object.entries(c.openHours).map(
                        ([day, val]) => (
                          <span key={day}>
                            {day}: {val || "-"}
                          </span>
                        )
                      )}
                    </div>
                  </td>
                  <td>{c.addresses.filter((a) => a).join(" | ")}</td>
                  <td className="ContactManagemenet-actions">
                    <button
                      onClick={() => togglePublish(c._id!)}
                      className={`ContactManagemenet-publish-btn ${
                        c.published ? "published" : "unpublished"
                      }`}
                    >
                      {c.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleEdit(c._id!)}
                      className="ContactManagemenet-edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id!)}
                      className="ContactManagemenet-delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactManagemenet;
