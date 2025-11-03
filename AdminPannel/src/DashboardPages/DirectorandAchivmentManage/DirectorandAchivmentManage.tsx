import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import "./DirectorandAchivmentManage.css";
import { FaTrashAlt, FaEdit, FaUpload, FaTimes } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";
import BASE_URL from "../../Api"; // Example: http://localhost:5000/api

interface Director {
  _id?: string;
  designation: string;
  name: string;
  about: string;
  address: string;
  phone: string;
  email: string;
  achievements?: string[];
}

const DirectorandAchivmentManage: React.FC = () => {
  const { theme } = useTheme();
  const [director, setDirector] = useState<Director>({
    designation: "",
    name: "",
    about: "",
    address: "",
    phone: "",
    email: "",
  });

  const [achievements, setAchievements] = useState<File[]>([]);
  const [directorList, setDirectorList] = useState<Director[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch directors on load
  useEffect(() => {
    fetchDirectors();
  }, []);

  const fetchDirectors = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/director/get`);
      setDirectorList(res.data);
    } catch (error) {
      console.error("Error fetching directors:", error);
    }
  };

  // ✅ Handle form inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDirector((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle file upload
  const handleAchievementUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAchievements(Array.from(e.target.files));
    }
  };

  // ✅ Submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!director.name || !director.designation) {
      alert("Name and designation are required");
      return;
    }

    if (directorList.length >= 1) {
      alert("Only one director allowed. Delete existing one first.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("designation", director.designation);
      formData.append("name", director.name);
      formData.append("about", director.about);
      formData.append("address", director.address);
      formData.append("phone", director.phone);
      formData.append("email", director.email);

      achievements.forEach((file) => {
        formData.append("achievements", file);
      });

      await axios.post(`${BASE_URL}/director/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Director added successfully!");
      setDirector({
        designation: "",
        name: "",
        about: "",
        address: "",
        phone: "",
        email: "",
      });
      setAchievements([]);
      fetchDirectors();
    } catch (error: any) {
      console.error("Error adding director:", error);
      alert(error.response?.data?.message || "Failed to add director");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete director
  const handleDeleteDirector = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this director?")) return;

    try {
      await axios.delete(`${BASE_URL}/director/delete/${id}`);
      alert("Director deleted successfully");
      fetchDirectors();
    } catch (error) {
      console.error("Error deleting director:", error);
      alert("Failed to delete director");
    }
  };

  return (
    <div className={`DirectorAchivment-container ${theme}`}>
      <h2 className="DirectorAchivment-title">Director & Achievement Management</h2>

      <div className="DirectorAchivment-content">
        {/* LEFT SECTION */}
        <div className="DirectorAchivment-left">
          <form onSubmit={handleSubmit} className="DirectorAchivment-form">
            <h3 className="DirectorAchivment-subtitle">Director Information</h3>

            <div className="DirectorAchivment-row">
              <div className="DirectorAchivment-field">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={director.designation}
                  onChange={handleChange}
                  placeholder="Enter designation"
                />
              </div>
              <div className="DirectorAchivment-field">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={director.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>
            </div>

            <div className="DirectorAchivment-row">
              <div className="DirectorAchivment-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={director.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="DirectorAchivment-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={director.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>
            </div>

            <label>Address</label>
            <input
              type="text"
              name="address"
              value={director.address}
              onChange={handleChange}
              placeholder="Enter address"
            />

            <label>About</label>
            <textarea
              name="about"
              value={director.about}
              onChange={handleChange}
              placeholder="Write about the director"
            ></textarea>

            <button
              type="submit"
              className="DirectorAchivment-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Director"}
            </button>
          </form>

          {/* Upload achievements */}
          <div className="DirectorAchivment-achievement">
            <div className="DirectorAchivment-upload-box">
              <label htmlFor="achievementUpload" className="DirectorAchivment-upload-label">
                <FaUpload /> Upload Certificates
              </label>
              <input
                id="achievementUpload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleAchievementUpload}
                className="DirectorAchivment-file"
              />
            </div>

            <div className="DirectorAchivment-gallery">
              {achievements.length === 0 ? (
                <p className="DirectorAchivment-empty">No certificates uploaded</p>
              ) : (
                achievements.map((file, index) => (
                  <div key={index} className="DirectorAchivment-imgBox">
                    <img src={URL.createObjectURL(file)} alt={`Achievement ${index}`} />
                    <button
                      className="DirectorAchivment-imgDelete"
                      onClick={() =>
                        setAchievements((prev) => prev.filter((_, i) => i !== index))
                      }
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="DirectorAchivment-right">
          <h3 className="DirectorAchivment-subtitle">Posted Director Data</h3>
          {directorList.length === 0 ? (
            <p className="DirectorAchivment-empty">No Director Data Available</p>
          ) : (
            <table className="DirectorAchivment-table">
              <thead>
                <tr>
                  <th>Designation</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Certificate</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {directorList.map((dir) => (
                    <tr key={dir._id}>
                    <td>{dir.designation}</td>
                    <td>{dir.name}</td>
                    <td>{dir.phone}</td>
                    <td>{dir.email}</td>
                    <td>{dir.address}</td>
                    <td>
                        {dir.achievements && dir.achievements.length > 0 ? (
                        <div className="DirectorAchivment-imgList">
                            {dir.achievements.map((img, i) => (
                            <img
                                key={i}
                                src={`http://localhost:5000${img}`}
                                alt={`Achievement ${i}`}
                                style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "8px",
                                marginRight: "6px",
                                objectFit: "cover",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                }}
                            />
                            ))}
                        </div>
                        ) : (
                        <span>No Certificates</span>
                        )}
                    </td>
                    <td>
                        <button
                        className="DirectorAchivment-delete"
                        onClick={() => handleDeleteDirector(dir._id!)}
                        >
                        <FaTrashAlt />
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>

            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectorandAchivmentManage;
