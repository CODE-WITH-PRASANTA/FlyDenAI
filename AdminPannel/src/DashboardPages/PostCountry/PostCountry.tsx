import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostCountry.css";
import { useTheme } from "../../context/ThemeContext";
import BASE_URL from "../../Api"; // ✅ import base URL

interface Country {
  _id: string;
  countryName: string;
  placeName: string;
  logoUrl: string;
}

const PostCountry: React.FC = () => {
  const { theme } = useTheme();
  const [countryData, setCountryData] = useState({
    placeName: "",
    countryName: "",
    countryLogo: null as File | null,
  });

  const [tableData, setTableData] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [previewCountry, setPreviewCountry] = useState<Country | null>(null);

  // ✅ Use BASE_URL instead of hardcoding
  const API_URL = `${BASE_URL}/countries`;

  // ✅ Fetch all countries on mount
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await axios.get(API_URL);
      setTableData(res.data);
    } catch (error) {
      console.error("❌ Error fetching countries:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "countryLogo" && files) {
      setCountryData({ ...countryData, [name]: files[0] });
    } else {
      setCountryData({ ...countryData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("countryName", countryData.countryName);
    formData.append("placeName", countryData.placeName);
    if (countryData.countryLogo) {
      formData.append("countryLogo", countryData.countryLogo);
    }

    try {
      if (editId) {
        // ✅ Update country
        await axios.put(`${API_URL}/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditId(null);
      } else {
        // ✅ Add new country
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // Refresh and reset
      fetchCountries();
      setCountryData({ placeName: "", countryName: "", countryLogo: null });
    } catch (error) {
      console.error("❌ Error submitting country:", error);
    }
  };

  const handleEdit = (id: string) => {
    const country = tableData.find((item) => item._id === id);
    if (country) {
      setCountryData({
        placeName: country.placeName,
        countryName: country.countryName,
        countryLogo: null,
      });
      setEditId(id);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchCountries();
      } catch (error) {
        console.error("❌ Error deleting country:", error);
      }
    }
  };

  const handlePreview = (id: string) => {
    const country = tableData.find((item) => item._id === id);
    if (country) {
      setPreviewCountry(country);
    }
  };

  const closePreview = () => setPreviewCountry(null);

  const filteredData = tableData.filter(
    (item) =>
      item.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.placeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`post-country-container ${
        theme === "dark" ? "dark-mode" : "light-mode"
      }`}
    >
      <h2 className="post-country-title">🌍 Post Country Details</h2>

      <div className="post-country-search">
        <input
          type="text"
          placeholder="Search by country or place name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="post-country-search-input"
        />
      </div>

      <form className="post-country-form" onSubmit={handleSubmit}>
        <div className="post-country-form-group">
          <label className="post-country-label">Place Name</label>
          <input
            type="text"
            name="placeName"
            value={countryData.placeName}
            onChange={handleChange}
            placeholder="Enter place name"
            className="post-country-input"
            required
          />
        </div>

        <div className="post-country-form-group">
          <label className="post-country-label">Country Name</label>
          <input
            type="text"
            name="countryName"
            value={countryData.countryName}
            onChange={handleChange}
            placeholder="Enter country name"
            className="post-country-input"
            required
          />
        </div>

        <div className="post-country-form-group">
          <label className="post-country-label">Country Logo</label>
          <input
            type="file"
            name="countryLogo"
            accept="image/*"
            onChange={handleChange}
            className="post-country-input"
          />
        </div>

        <button type="submit" className="post-country-submit-btn">
          {editId ? "💾 Update Country" : "➕ Add Country"}
        </button>
      </form>

      <div className="post-country-table-section">
        <h3 className="post-country-table-title">📋 Country List</h3>
        <table className="post-country-table">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Country Logo</th>
              <th>Country Name</th>
              <th>Place Name</th>
              <th>Action</th>
            </tr>
          </thead>
         <tbody>
  {filteredData.map((item, index) => (
    <tr key={item._id}>
      <td>{index + 1}</td>
      <td>
        {item.logoUrl && (
          <img
            src={`${BASE_URL.replace("/api", "")}${item.logoUrl}`}
            alt="Country Logo"
            className="table-img"
          />
        )}
      </td>
      <td>{item.countryName}</td>
      <td>{item.placeName}</td>
      <td>
        <button
          className="post-country-action-btn edit"
          onClick={() => handleEdit(item._id)}
        >
          ✏️ Edit
        </button>
        <button
          className="post-country-action-btn delete"
          onClick={() => handleDelete(item._id)}
        >
          🗑️ Delete
        </button>
        <button
          className="post-country-action-btn preview"
          onClick={() => handlePreview(item._id)}
        >
          👁️ Preview
        </button>
      </td>
    </tr>
  ))}
  {filteredData.length === 0 && (
    <tr>
      <td colSpan={5} style={{ textAlign: "center", padding: "12px" }}>
        No countries found.
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>

      {previewCountry && (
        <div className="post-country-modal-backdrop" onClick={closePreview}>
          <div
            className="post-country-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="post-country-modal-close" onClick={closePreview}>
              ×
            </span>
            <img
              src={`${BASE_URL.replace("/api", "")}${previewCountry.logoUrl}`}
              alt="logo"
              className="post-country-modal-logo"
            />
            <h2>{previewCountry.countryName}</h2>
            <p>{previewCountry.placeName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCountry;
