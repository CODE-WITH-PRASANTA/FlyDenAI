import React, { useState } from "react";
import "./VisaType.css";
import { useTheme } from "../../context/ThemeContext"; 

interface Consultant {
  name: string;
  about: string;
  image: File | null;
}

interface VisaEntry {
  id: number;
  visaName: string;
  visaDesc: string;
  visaOverview: string;
  visaProcess: string;
  features: string[];
  specialFeatures: string[];
  visaImage: string | null;
  consultant: Consultant;
}

const VisaType = () => {
  const { theme } = useTheme(); // ✅ get theme (dark or light)

  const [visaName, setVisaName] = useState("");
  const [visaDesc, setVisaDesc] = useState("");
  const [visaOverview, setVisaOverview] = useState("");
  const [visaProcess, setVisaProcess] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [specialFeatures, setSpecialFeatures] = useState<string[]>([""]);
  const [visaImage, setVisaImage] = useState<File | null>(null);
  const [consultant, setConsultant] = useState<Consultant>({
    name: "",
    about: "",
    image: null,
  });
  const [postedVisas, setPostedVisas] = useState<VisaEntry[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Features handlers
  const handleAddFeature = () => setFeatures([...features, ""]);
  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const handleAddSpecialFeature = () =>
    setSpecialFeatures([...specialFeatures, ""]);
  const handleSpecialFeatureChange = (index: number, value: string) => {
    const updated = [...specialFeatures];
    updated[index] = value;
    setSpecialFeatures(updated);
  };

  // Submit or Update
  const handleSubmit = () => {
    if (isEditing && editId !== null) {
      const updatedData: VisaEntry = {
        id: editId,
        visaName,
        visaDesc,
        visaOverview,
        visaProcess,
        features,
        specialFeatures,
        visaImage: visaImage ? URL.createObjectURL(visaImage) : null,
        consultant,
      };
      setPostedVisas(
        postedVisas.map((v) => (v.id === editId ? updatedData : v))
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      const newEntry: VisaEntry = {
        id: postedVisas.length + 1,
        visaName,
        visaDesc,
        visaOverview,
        visaProcess,
        features,
        specialFeatures,
        visaImage: visaImage ? URL.createObjectURL(visaImage) : null,
        consultant,
      };
      setPostedVisas([...postedVisas, newEntry]);
    }

    // Reset form
    setVisaName("");
    setVisaDesc("");
    setVisaOverview("");
    setVisaProcess("");
    setFeatures([""]);
    setSpecialFeatures([""]);
    setVisaImage(null);
    setConsultant({ name: "", about: "", image: null });
  };

  // Edit handler
  const handleEdit = (id: number) => {
    const visaToEdit = postedVisas.find((v) => v.id === id);
    if (visaToEdit) {
      setVisaName(visaToEdit.visaName);
      setVisaDesc(visaToEdit.visaDesc);
      setVisaOverview(visaToEdit.visaOverview);
      setVisaProcess(visaToEdit.visaProcess);
      setFeatures(visaToEdit.features);
      setSpecialFeatures(visaToEdit.specialFeatures);
      setVisaImage(null);
      setConsultant(visaToEdit.consultant);
      setIsEditing(true);
      setEditId(id);
    }
  };

  // Delete handler
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this visa entry?")) {
      setPostedVisas(postedVisas.filter((v) => v.id !== id));
    }
  };

  return (
    <div className={`visa-type-wrapper ${theme === "dark" ? "dark" : "light"}`}>
      {/* Left Section - Form */}
      <div className="visa-type-container">
        <h2 className="visa-type-title">
          {isEditing ? "Edit Visa Type" : "Add Visa Type"}
        </h2>

        <div className="visa-type-form">
          {/* Visa Name */}
          <div className="visa-input-group">
            <label>Visa Name</label>
            <input
              type="text"
              value={visaName}
              onChange={(e) => setVisaName(e.target.value)}
              placeholder="Enter Visa Name"
              className={`input-field ${theme === "dark" ? "dark-input" : ""}`}
            />
          </div>

          {/* Visa Description */}
          <div className="visa-input-group">
            <label>Visa Description</label>
            <textarea
              value={visaDesc}
              onChange={(e) => setVisaDesc(e.target.value)}
              placeholder="Enter Visa Description"
              className={`textarea-field ${theme === "dark" ? "dark-input" : ""}`}
            />
          </div>

          {/* Visa Features */}
          <div className="visa-input-group">
            <label>Visa Features</label>
            {features.map((feature, index) => (
              <input
                key={index}
                type="text"
                value={feature}
                placeholder={`Feature ${index + 1}`}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className={`input-field ${theme === "dark" ? "dark-input" : ""}`}
              />
            ))}
            <button type="button" className="add-btn" onClick={handleAddFeature}>
              + Add Feature
            </button>
          </div>

          {/* Visa Image */}
          <div className="visa-input-group">
            <label>Upload Visa Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setVisaImage(e.target.files ? e.target.files[0] : null)
              }
              className={`input-field ${theme === "dark" ? "dark-input" : ""}`}
            />
          </div>

          {/* Visa Overview */}
          <div className="visa-input-group">
            <label>Visa Overview</label>
            <textarea
              value={visaOverview}
              onChange={(e) => setVisaOverview(e.target.value)}
              placeholder="Enter Visa Overview"
              className={`textarea-field ${theme === "dark" ? "dark-input" : ""}`}
            />
          </div>

          {/* Visa Process */}
          <div className="visa-input-group">
            <label>Visa Process</label>
            <textarea
              value={visaProcess}
              onChange={(e) => setVisaProcess(e.target.value)}
              placeholder="Enter Visa Process"
              className={`textarea-field ${theme === "dark" ? "dark-input" : ""}`}
            />
          </div>

          {/* Consultant Details */}
          <div className="consultant-section">
            <h3>Consultant Details</h3>
            <div className="visa-input-group">
              <label>Consultant Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setConsultant({
                    ...consultant,
                    image: e.target.files ? e.target.files[0] : null,
                  })
                }
                className={`input-field ${theme === "dark" ? "dark-input" : ""}`}
              />
            </div>
            <div className="visa-input-group">
              <label>Consultant Name</label>
              <input
                type="text"
                value={consultant.name}
                onChange={(e) =>
                  setConsultant({ ...consultant, name: e.target.value })
                }
                placeholder="Enter Consultant Name"
                className={`input-field ${theme === "dark" ? "dark-input" : ""}`}
              />
            </div>
            <div className="visa-input-group">
              <label>About Consultant</label>
              <textarea
                value={consultant.about}
                onChange={(e) =>
                  setConsultant({ ...consultant, about: e.target.value })
                }
                placeholder="About Consultant"
                className={`textarea-field ${theme === "dark" ? "dark-input" : ""}`}
              />
            </div>
          </div>

          {/* Special Features */}
          <div className="visa-input-group">
            <label>Special Features (Top 3)</label>
            {specialFeatures.map((feature, index) => (
              <input
                key={index}
                type="text"
                value={feature}
                placeholder={`Special Feature ${index + 1}`}
                onChange={(e) => handleSpecialFeatureChange(index, e.target.value)}
                className={`input-field ${theme === "dark" ? "dark-input" : ""}`}
              />
            ))}
            {specialFeatures.length < 3 && (
              <button
                type="button"
                className="add-btn"
                onClick={handleAddSpecialFeature}
              >
                + Add Special Feature
              </button>
            )}
          </div>

          {/* Submit / Update */}
          <button className="submit-btn" onClick={handleSubmit}>
            {isEditing ? "Update Visa Details" : "Submit Visa Details"}
          </button>
        </div>
      </div>

      {/* Right Section - Table */}
      <aside className="visa-aside">
        <h2>Visa Records</h2>
        {postedVisas.length === 0 ? (
          <p className="no-data">No visa data added yet.</p>
        ) : (
          <table className={`visa-table ${theme === "dark" ? "dark-table" : ""}`}>
            <thead>
              <tr>
                <th>SL No</th>
                <th>Visa Image</th>
                <th>Visa Name</th>
                <th>Consultant</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {postedVisas.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    {item.visaImage && (
                      <img src={item.visaImage} alt="Visa" className="table-img" />
                    )}
                  </td>
                  <td>{item.visaName}</td>
                  <td>{item.consultant.name}</td>
                  <td className="action-buttons">
                    <button
                      className="visatype-edit-btn"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="visatype-delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                    <button className="visatype-preview-btn">Preview</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </aside>
    </div>
  );
};

export default VisaType;
