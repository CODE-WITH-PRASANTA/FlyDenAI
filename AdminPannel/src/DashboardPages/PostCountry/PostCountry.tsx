import React, { useState } from "react";
import "./PostCountry.css";

interface Country {
  id: number;
  logo: string;
  countryName: string;
  placeName: string;
}
import { useTheme } from "../../context/ThemeContext";  // ✅ import theme



const PostCountry = () => {
  const { theme } = useTheme();  // ✅ access theme
  const [countryData, setCountryData] = useState({
    placeName: "",
    countryName: "",
    countryLogo: null as File | null,
  });

  const [tableData, setTableData] = useState<Country[]>([
    { id: 1, logo: "https://flagcdn.com/w40/in.png", countryName: "India", placeName: "Bhubaneswar" },
    { id: 2, logo: "https://flagcdn.com/w40/gb.png", countryName: "United Kingdom", placeName: "London" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [previewCountry, setPreviewCountry] = useState<Country | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "countryLogo" && files) {
      setCountryData({ ...countryData, [name]: files[0] });
    } else {
      setCountryData({ ...countryData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      const updatedData = tableData.map(item =>
        item.id === editId
          ? {
              ...item,
              countryName: countryData.countryName,
              placeName: countryData.placeName,
              logo: countryData.countryLogo ? URL.createObjectURL(countryData.countryLogo) : item.logo,
            }
          : item
      );
      setTableData(updatedData);
      setEditId(null);
    } else {
      const newEntry: Country = {
        id: tableData.length + 1,
        logo: countryData.countryLogo ? URL.createObjectURL(countryData.countryLogo) : "",
        countryName: countryData.countryName,
        placeName: countryData.placeName,
      };
      setTableData([...tableData, newEntry]);
    }
    setCountryData({ placeName: "", countryName: "", countryLogo: null });
  };

  const handleEdit = (id: number) => {
    const country = tableData.find(item => item.id === id);
    if (country) {
      setCountryData({ placeName: country.placeName, countryName: country.countryName, countryLogo: null });
      setEditId(id);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      setTableData(tableData.filter(item => item.id !== id));
    }
  };

  const handlePreview = (id: number) => {
    const country = tableData.find(item => item.id === id);
    if (country) {
      setPreviewCountry(country); // Open modal with country data
    }
  };

  const closePreview = () => {
    setPreviewCountry(null);
  };

  const filteredData = tableData.filter(
    item =>
      item.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.placeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
       <div className={`post-country-container ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
    <div className="post-country-container">
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
          {editId !== null ? "💾 Update Country" : "➕ Add Country"}
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
              <tr key={item.id} className="post-country-table-row">
                <td>{index + 1}</td>
                <td>
                  <img src={item.logo} alt="logo" className="post-country-logo-img" />
                </td>
                <td>{item.countryName}</td>
                <td>{item.placeName}</td>
                <td>
                  <button className="post-country-action-btn edit" onClick={() => handleEdit(item.id)}>✏️ Edit</button>
                  <button className="post-country-action-btn delete" onClick={() => handleDelete(item.id)}>🗑️ Delete</button>
                  <button className="post-country-action-btn preview" onClick={() => handlePreview(item.id)}>👁️ Preview</button>
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

      {/* Preview Modal */}
      {previewCountry && (
        <div className="post-country-modal-backdrop" onClick={closePreview}>
          <div className="post-country-modal" onClick={e => e.stopPropagation()}>
            <span className="post-country-modal-close" onClick={closePreview}>×</span>
            <img src={previewCountry.logo} alt="logo" className="post-country-modal-logo" />
            <h2>{previewCountry.countryName}</h2>
            <p>{previewCountry.placeName}</p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default PostCountry;
