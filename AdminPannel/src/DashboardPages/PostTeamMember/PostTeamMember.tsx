import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./PostTeamMember.css";
import { useTheme } from "../../context/ThemeContext";
import BASE_URL from "../../Api"; // ✅ Example: "http://localhost:5000/api"

interface TeamMember {
  _id?: string;
  imageUrl?: string;
  name: string;
  designation: string;
  experience: string;
  instagram: string;
  facebook: string;
  twitter: string;
  whatsapp: string;
  phone: string;
  email: string;
  published?: boolean;
}

const PostTeamMember: React.FC = () => {
  const { theme } = useTheme();
  const [memberData, setMemberData] = useState<TeamMember>({
    name: "",
    designation: "",
    experience: "",
    instagram: "",
    facebook: "",
    twitter: "",
    whatsapp: "",
    phone: "",
    email: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tableData, setTableData] = useState<TeamMember[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // ✅ Fetch all team members on load
  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/teammembers`);
      setTableData(res.data.data || []);
    } catch (error) {
      console.error("❌ Error fetching members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files && files[0]) {
      setImageFile(files[0]);
    } else {
      setMemberData({ ...memberData, [name]: value });
    }
  };

  // ✅ Submit or Update Member
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!memberData.name || !memberData.designation) {
      alert("Name and Designation are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", memberData.name);
    formData.append("designation", memberData.designation);
    formData.append("experience", memberData.experience);
    formData.append("instagram", memberData.instagram);
    formData.append("facebook", memberData.facebook);
    formData.append("twitter", memberData.twitter);
    formData.append("whatsapp", memberData.whatsapp);
    formData.append("phone", memberData.phone);
    formData.append("email", memberData.email);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (isEditing && editId) {
        await axios.put(`${BASE_URL}/teammembers/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Member updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/teammembers`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Member added successfully!");
      }

      setMemberData({
        name: "",
        designation: "",
        experience: "",
        instagram: "",
        facebook: "",
        twitter: "",
        whatsapp: "",
        phone: "",
        email: "",
      });
      setImageFile(null);
      setIsEditing(false);
      setEditId(null);
      fetchMembers();
    } catch (error) {
      console.error("❌ Error saving member:", error);
    }
  };

  // ✅ Delete member
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await axios.delete(`${BASE_URL}/teammembers/${id}`);
      alert("🗑️ Member deleted successfully!");
      fetchMembers();
    } catch (error) {
      console.error("❌ Error deleting member:", error);
    }
  };

  // ✅ Edit member
  const handleEdit = (member: TeamMember) => {
    setMemberData(member);
    setIsEditing(true);
    setEditId(member._id || null);
  };

  // ✅ Toggle Publish / Unpublish
  const handleTogglePublish = async (id: string) => {
    try {
      await axios.patch(`${BASE_URL}/teammembers/${id}/publish`);
      fetchMembers();
    } catch (error) {
      console.error("❌ Error toggling publish:", error);
    }
  };


  // ✅ Clean Image URL (remove `/api` only for images)
  const getImageUrl = (path: string) => {
    return `${BASE_URL.replace("/api", "")}${path}`;
  };


  return (
    <div className={`PostTeamMember-container ${theme === "dark" ? "dark" : "light"}`}>
      {/* Left Side: Form */}
      <div className="PostTeamMember-form-section">
        <h2 className="PostTeamMember-heading">
          {isEditing ? "Edit Team Member" : "Add Team Member"}
        </h2>
        <form className="PostTeamMember-form" onSubmit={handleSubmit}>
          <div className="PostTeamMember-box">
            <h4>Profile</h4>
            <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} />
          </div>

          <div className="PostTeamMember-box-row">
            <div className="PostTeamMember-box-item">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={memberData.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </div>
            <div className="PostTeamMember-box-item">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={memberData.phone}
                onChange={handleChange}
                placeholder="Enter phone"
                maxLength={10}
              />
            </div>
          </div>

          <div className="PostTeamMember-box-row">
            <div className="PostTeamMember-box-item">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={memberData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>
            <div className="PostTeamMember-box-item">
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                value={memberData.designation}
                onChange={handleChange}
                placeholder="Enter designation"
              />
            </div>
          </div>

          <div className="PostTeamMember-box">
            <label>Experience</label>
            <input
              type="text"
              name="experience"
              value={memberData.experience}
              onChange={handleChange}
              placeholder="Enter experience"
            />
          </div>

          <div className="PostTeamMember-box">
            <h4>Social Media</h4>
            <div className="PostTeamMember-box-row">
              <input
                type="text"
                name="instagram"
                value={memberData.instagram}
                onChange={handleChange}
                placeholder="Instagram"
              />
              <input
                type="text"
                name="facebook"
                value={memberData.facebook}
                onChange={handleChange}
                placeholder="Facebook"
              />
            </div>
            <div className="PostTeamMember-box-row">
              <input
                type="text"
                name="twitter"
                value={memberData.twitter}
                onChange={handleChange}
                placeholder="Twitter"
              />
              <input
                type="text"
                name="whatsapp"
                value={memberData.whatsapp}
                onChange={handleChange}
                placeholder="WhatsApp"
              />
            </div>
          </div>

          <button type="submit" className="PostTeamMember-submit-btn">
            {isEditing ? "Update Member" : "Add Member"}
          </button>
        </form>
      </div>

      {/* Right Side: Table */}
      <div className="PostTeamMember-table-section">
        <h2 className="PostTeamMember-heading">Team Members List</h2>
        <div className="PostTeamMember-table-wrapper">
          <table className="PostTeamMember-table">
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Experience</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                   {item.imageUrl ? (
                          <img
                            src={getImageUrl(item.imageUrl)}
                            alt="Profile"
                            className="PostTeamMember-profile-img"
                          />
                        ) : (
                          "N/A"
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.designation}</td>
                  <td>{item.experience}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      className={`PostTeamMember-publish-btn ${
                        item.published ? "published" : "unpublished"
                      }`}
                      onClick={() => handleTogglePublish(item._id!)}
                    >
                      {item.published ? "Published" : "Unpublished"}
                    </button>
                  </td>
                  <td className="PostTeamMember-action-buttons">
                    <button
                      onClick={() => handleEdit(item)}
                      className="PostTeamMember-edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id!)}
                      className="PostTeamMember-delete-btn"
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

export default PostTeamMember;
