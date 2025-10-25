import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import "./PostTeamMember.css";
import { useTheme } from "../../context/ThemeContext"; // theme context

interface TeamMember {
  id: number;
  profilePicture: string;
  name: string;
  designation: string;
  experience: string;
  instagram: string;
  facebook: string;
  twitter: string;
  whatsapp: string;
  phone: string;
  email: string;
}

const PostTeamMember: React.FC = () => {
  const { theme } = useTheme(); // get current theme
  const [memberData, setMemberData] = useState<TeamMember>({
    id: 0,
    profilePicture: "",
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

  const [tableData, setTableData] = useState<TeamMember[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files) {
      setMemberData({ ...memberData, profilePicture: URL.createObjectURL(files[0]) });
    } else {
      setMemberData({ ...memberData, [name]: value });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!memberData.name || !memberData.designation) return;

    const newEntry: TeamMember = { ...memberData, id: tableData.length + 1 };
    setTableData([...tableData, newEntry]);

    setMemberData({
      id: 0,
      profilePicture: "",
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
  };

  const handleDelete = (id: number) => {
    setTableData(tableData.filter((item) => item.id !== id));
  };

  const handleEdit = (id: number) => {
    const editItem = tableData.find((item) => item.id === id);
    if (editItem) {
      setMemberData(editItem);
      setTableData(tableData.filter((item) => item.id !== id));
    }
  };

  return (
    <div className={`PostTeamMember-container ${theme === "dark" ? "dark" : "light"}`}>
      {/* Left Side: Form */}
      <div className="PostTeamMember-form-section">
        <h2 className="PostTeamMember-heading">Add Team Member</h2>
        <form className="PostTeamMember-form" onSubmit={handleSubmit}>
          {/* Profile */}
          <div className="PostTeamMember-box">
            <h4>Profile</h4>
            <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} />
          </div>

          {/* Name & Phone */}
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

          {/* Email & Designation */}
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

          {/* Experience */}
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

          {/* Social Media */}
          <div className="PostTeamMember-box">
            <h4>Social Media</h4>
            <div className="PostTeamMember-box-row">
              <div className="PostTeamMember-box-item">
                <input
                  type="text"
                  name="instagram"
                  value={memberData.instagram}
                  onChange={handleChange}
                  placeholder="Instagram"
                />
              </div>
              <div className="PostTeamMember-box-item">
                <input
                  type="text"
                  name="facebook"
                  value={memberData.facebook}
                  onChange={handleChange}
                  placeholder="Facebook"
                />
              </div>
            </div>
            <div className="PostTeamMember-box-row">
              <div className="PostTeamMember-box-item">
                <input
                  type="text"
                  name="twitter"
                  value={memberData.twitter}
                  onChange={handleChange}
                  placeholder="Twitter"
                />
              </div>
              <div className="PostTeamMember-box-item">
                <input
                  type="text"
                  name="whatsapp"
                  value={memberData.whatsapp}
                  onChange={handleChange}
                  placeholder="WhatsApp"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="PostTeamMember-submit-btn">
            Add Member
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    {item.profilePicture ? (
                      <img
                        src={item.profilePicture}
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
                  <td className="PostTeamMember-action-buttons">
                    <button onClick={() => handleEdit(item.id)} className="PostTeamMember-edit-btn">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="PostTeamMember-delete-btn">
                      Delete
                    </button>
                    <button className="PostTeamMember-preview-btn">Preview</button>
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
