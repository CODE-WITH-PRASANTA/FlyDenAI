import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import "./VisaType.css";
import { useTheme } from "../../context/ThemeContext";
import BASE_URL from "../../Api"; // ✅ http://localhost:5000/api

interface Consultant {
  name: string;
  about: string;
  image: File | null;
}

interface VisaEntry {
  _id?: string;
  visaName: string;
  visaDesc: string;
  visaOverview: string;
  visaProcess: string;
  features: string[];
  specialFeatures: string[];
  visaImageUrl?: string;
  consultant: {
    name: string;
    about: string;
    imageUrl?: string;
  };
}

const VisaType: React.FC = () => {
  const { theme } = useTheme();

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
  const [editId, setEditId] = useState<string | null>(null);

  // ✅ Fetch visa data
  useEffect(() => {
    fetchVisaTypes();
  }, []);

  const fetchVisaTypes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/visatypes`);
      if (res.data.success) setPostedVisas(res.data.data);
    } catch (error) {
      console.error("❌ Error fetching visa data:", error);
    }
  };

  // ✅ Submit / Update Visa
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("visaName", visaName);
      formData.append("visaDesc", visaDesc);
      formData.append("visaOverview", visaOverview);
      formData.append("visaProcess", visaProcess);
      formData.append("features", JSON.stringify(features));
      formData.append("specialFeatures", JSON.stringify(specialFeatures));
      formData.append("consultantName", consultant.name);
      formData.append("consultantAbout", consultant.about);
      if (visaImage) formData.append("visaImage", visaImage);
      if (consultant.image) formData.append("consultantImage", consultant.image);

      if (isEditing && editId) {
        const res = await axios.put(`${BASE_URL}/visatypes/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          alert("✅ Visa updated successfully");
          fetchVisaTypes();
          resetForm();
        }
      } else {
        const res = await axios.post(`${BASE_URL}/visatypes`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          alert("✅ Visa added successfully");
          fetchVisaTypes();
          resetForm();
        }
      }
    } catch (error) {
      console.error("❌ Error saving visa:", error);
      alert("Failed to save visa data ❌");
    }
  };

  // ✅ Reset Form
  const resetForm = () => {
    setVisaName("");
    setVisaDesc("");
    setVisaOverview("");
    setVisaProcess("");
    setFeatures([""]);
    setSpecialFeatures([""]);
    setVisaImage(null);
    setConsultant({ name: "", about: "", image: null });
    setIsEditing(false);
    setEditId(null);
  };

  // ✅ Edit Handler
  const handleEdit = (visa: VisaEntry) => {
    setVisaName(visa.visaName);
    setVisaDesc(visa.visaDesc);
    setVisaOverview(visa.visaOverview);
    setVisaProcess(visa.visaProcess);
    setFeatures(visa.features);
    setSpecialFeatures(visa.specialFeatures);
    setConsultant({
      name: visa.consultant.name,
      about: visa.consultant.about,
      image: null,
    });
    setIsEditing(true);
    setEditId(visa._id || null);
  };

  // ✅ Delete Visa
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this visa entry?")) {
      try {
        const res = await axios.delete(`${BASE_URL}/visatypes/${id}`);
        if (res.data.success) {
          alert("🗑️ Visa deleted successfully");
          fetchVisaTypes();
        }
      } catch (error) {
        console.error("❌ Error deleting visa:", error);
      }
    }
  };

  // ✅ Clean Image URL (remove `/api` only for images)
  const getImageUrl = (path: string) => {
    return `${BASE_URL.replace("/api", "")}${path}`;
  };

  return (
    <div className={`visa-type-wrapper ${theme}`}>
      {/* ===== Left Section (Form) ===== */}
      <div className="visa-type-container">
        <h2 className="visa-type-title">
          {isEditing ? "✏️ Edit Visa Type" : "➕ Add Visa Type"}
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
          <div className="visa-input-group-desc full-editor">
            <label>Visa Description</label>
            <Editor
              apiKey="osnm6yw158o1eaimm0d04yws6sueiubjcuj4i4axh4ulv81i"
              value={visaDesc}
              onEditorChange={(newValue) => setVisaDesc(newValue)}
              init={{
                height: 400,
                menubar: true,
                branding: false,
                toolbar_sticky: true,
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table help wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help",
                skin: theme === "dark" ? "oxide-dark" : "oxide",
                content_css: theme === "dark" ? "dark" : "default",
              }}
            />
          </div>

          {/* Features */}
          <div className="visa-input-group">
            <label>Visa Features</label>
            {features.map((f, i) => (
              <input
                key={i}
                type="text"
                value={f}
                placeholder={`Feature ${i + 1}`}
                onChange={(e) => {
                  const updated = [...features];
                  updated[i] = e.target.value;
                  setFeatures(updated);
                }}
                className={`input-field ${theme === "dark" ? "dark-input" : ""}`}
              />
            ))}
            <button
              type="button"
              className="add-btn"
              onClick={() => setFeatures([...features, ""])}
            >
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

          {/* Overview */}
          <div className="visa-input-group">
            <label>Visa Overview</label>
            <textarea
              value={visaOverview}
              onChange={(e) => setVisaOverview(e.target.value)}
              placeholder="Enter Visa Overview"
              className={`textarea-field ${theme === "dark" ? "dark-input" : ""}`}
            />
          </div>

          {/* Process */}
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
            {specialFeatures.map((f, i) => (
              <input
                key={i}
                type="text"
                value={f}
                placeholder={`Special Feature ${i + 1}`}
                onChange={(e) => {
                  const updated = [...specialFeatures];
                  updated[i] = e.target.value;
                  setSpecialFeatures(updated);
                }}
                className={`input-field ${theme === "dark" ? "dark-input" : ""}`}
              />
            ))}
            {specialFeatures.length < 3 && (
              <button
                type="button"
                className="add-btn"
                onClick={() => setSpecialFeatures([...specialFeatures, ""])}
              >
                + Add Special Feature
              </button>
            )}
          </div>

          {/* Submit Button */}
          <button className="submit-btn" onClick={handleSubmit}>
            {isEditing ? "Update Visa Details" : "Submit Visa Details"}
          </button>
        </div>
      </div>

      {/* ===== Right Section (Data Table) ===== */}
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
              {postedVisas.map((visa, index) => (
                <tr key={visa._id}>
                  <td>{index + 1}</td>
                  <td>
                    {visa.visaImageUrl && (
                      <img
                        src={getImageUrl(visa.visaImageUrl)}
                        alt="Visa"
                        className="table-img"
                      />
                    )}
                  </td>
                  <td>{visa.visaName}</td>
                  <td>{visa.consultant?.name}</td>
                  <td className="action-buttons">
                    <button
                      className="visatype-edit-btn"
                      onClick={() => handleEdit(visa)}
                    >
                      Edit
                    </button>
                    <button
                      className="visatype-delete-btn"
                      onClick={() => handleDelete(visa._id!)}
                    >
                      Delete
                    </button>
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
