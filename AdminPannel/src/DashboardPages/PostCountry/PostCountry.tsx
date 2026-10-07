import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import "./PostCountry.css";
import { useTheme } from "../../context/ThemeContext";
import BASE_URL from "../../Api";

import {
  Globe2,
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  X,
  Upload,
  MapPin,
  Image as ImageIcon,
  RefreshCw,
  CheckCircle2,
  FileText,
  Map,
  Sparkles,
} from "lucide-react";

interface Country {
  _id: string;
  countryName: string;
  placeName: string;
  logoUrl: string;
}

interface CountryForm {
  placeName: string;
  countryName: string;
  countryLogo: File | null;
}

const PostCountry: React.FC = () => {
  const { theme } = useTheme();

  const [countryData, setCountryData] = useState<CountryForm>({
    placeName: "",
    countryName: "",
    countryLogo: null,
  });

  const [tableData, setTableData] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [previewCountry, setPreviewCountry] = useState<Country | null>(null);

  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const API_URL = `${BASE_URL}/countries`;

  // =========================================================
  // IMAGE URL
  // =========================================================

  const getImageUrl = (logoUrl?: string) => {
    if (!logoUrl) return "";

    if (
      logoUrl.startsWith("http://") ||
      logoUrl.startsWith("https://") ||
      logoUrl.startsWith("blob:")
    ) {
      return logoUrl;
    }

    const serverUrl = BASE_URL.replace("/api", "");

    if (logoUrl.startsWith("/")) {
      return `${serverUrl}${logoUrl}`;
    }

    return `${serverUrl}/${logoUrl}`;
  };

  // =========================================================
  // FETCH COUNTRIES
  // =========================================================

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL);

      setTableData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "countryLogo" && files?.[0]) {
      const file = files[0];

      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB.");
        return;
      }

      setCountryData((prev) => ({
        ...prev,
        countryLogo: file,
      }));

      const previewUrl = URL.createObjectURL(file);

      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }

      setLogoPreview(previewUrl);

      return;
    }

    setCountryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // RESET FORM
  // =========================================================

  const resetForm = () => {
    setCountryData({
      placeName: "",
      countryName: "",
      countryLogo: null,
    });

    setEditId(null);

    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }

    setLogoPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!countryData.countryName.trim()) {
      alert("Please enter country name.");
      return;
    }

    if (!countryData.placeName.trim()) {
      alert("Please enter place name.");
      return;
    }

    if (!editId && !countryData.countryLogo) {
      alert("Please select a country logo.");
      return;
    }

    const formData = new FormData();

    formData.append(
      "countryName",
      countryData.countryName.trim()
    );

    formData.append(
      "placeName",
      countryData.placeName.trim()
    );

    if (countryData.countryLogo) {
      formData.append(
        "countryLogo",
        countryData.countryLogo
      );
    }

    try {
      setSubmitLoading(true);

      if (editId) {
        await axios.put(
          `${API_URL}/${editId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Country updated successfully.");
      } else {
        await axios.post(
          API_URL,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Country added successfully.");
      }

      await fetchCountries();

      resetForm();
    } catch (error) {
      console.error("Error submitting country:", error);
      alert(
        editId
          ? "Failed to update country."
          : "Failed to add country."
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (id: string) => {
    const country = tableData.find(
      (item) => item._id === id
    );

    if (!country) return;

    setCountryData({
      placeName: country.placeName || "",
      countryName: country.countryName || "",
      countryLogo: null,
    });

    setEditId(id);

    setLogoPreview(
      country.logoUrl
        ? getImageUrl(country.logoUrl)
        : null
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id: string) => {
    const country = tableData.find(
      (item) => item._id === id
    );

    const confirmed = window.confirm(
      `Are you sure you want to delete ${
        country?.countryName || "this country"
      }?`
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(id);

      await axios.delete(`${API_URL}/${id}`);

      setTableData((prev) =>
        prev.filter((item) => item._id !== id)
      );

      if (previewCountry?._id === id) {
        setPreviewCountry(null);
      }

      if (editId === id) {
        resetForm();
      }

      alert("Country deleted successfully.");
    } catch (error) {
      console.error("Error deleting country:", error);
      alert("Failed to delete country.");
    } finally {
      setDeleteLoading(null);
    }
  };

  // =========================================================
  // PREVIEW
  // =========================================================

  const handlePreview = (id: string) => {
    const country = tableData.find(
      (item) => item._id === id
    );

    if (country) {
      setPreviewCountry(country);
    }
  };

  const closePreview = () => {
    setPreviewCountry(null);
  };

  // =========================================================
  // FILTER
  // =========================================================

  const filteredData = useMemo(() => {
    const search = searchTerm
      .trim()
      .toLowerCase();

    if (!search) {
      return tableData;
    }

    return tableData.filter((item) => {
      return (
        item.countryName
          ?.toLowerCase()
          .includes(search) ||
        item.placeName
          ?.toLowerCase()
          .includes(search)
      );
    });
  }, [tableData, searchTerm]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalCountries = tableData.length;

  const visibleCountries = filteredData.length;

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div
      className={`post-country-page ${
        theme === "dark"
          ? "post-country-dark"
          : "post-country-light"
      }`}
    >
      <div className="post-country-container">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <header className="post-country-header">

          <div className="post-country-header-left">

            <div className="post-country-title-icon">
              <Globe2 size={25} strokeWidth={2.2} />
            </div>

            <div>
              <div className="post-country-heading-row">
                <h1 className="post-country-title">
                  Country Management
                </h1>

                <span className="post-country-live-badge">
                  <span className="post-country-live-dot" />
                  Live
                </span>
              </div>

              <p className="post-country-subtitle">
                Manage countries, destinations and
                country logos from one place.
              </p>
            </div>

          </div>

          <div className="post-country-header-actions">

            <button
              type="button"
              className="post-country-refresh-btn"
              onClick={fetchCountries}
              disabled={loading}
            >
              <RefreshCw
                size={16}
                className={
                  loading
                    ? "post-country-spin"
                    : ""
                }
              />

              Refresh
            </button>

          </div>

        </header>

        {/* ================================================= */}
        {/* STATS */}
        {/* ================================================= */}

        <div className="post-country-stats">

          <div className="post-country-stat-card">

            <div className="post-country-stat-icon pink">
              <Globe2 size={21} />
            </div>

            <div className="post-country-stat-content">
              <span className="post-country-stat-label">
                Total Countries
              </span>

              <strong>
                {totalCountries}
              </strong>
            </div>

          </div>

          <div className="post-country-stat-card">

            <div className="post-country-stat-icon purple">
              <MapPin size={21} />
            </div>

            <div className="post-country-stat-content">
              <span className="post-country-stat-label">
                Visible Results
              </span>

              <strong>
                {visibleCountries}
              </strong>
            </div>

          </div>

          <div className="post-country-stat-card">

            <div className="post-country-stat-icon green">
              <CheckCircle2 size={21} />
            </div>

            <div className="post-country-stat-content">
              <span className="post-country-stat-label">
                Status
              </span>

              <strong className="post-country-active-text">
                Active
              </strong>
            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* FORM CARD */}
        {/* ================================================= */}

        <section className="post-country-form-card">

          <div className="post-country-card-header">

            <div className="post-country-card-title-wrap">

              <div className="post-country-small-icon">
                {editId ? (
                  <Pencil size={18} />
                ) : (
                  <Plus size={19} />
                )}
              </div>

              <div>
                <h2>
                  {editId
                    ? "Edit Country"
                    : "Add New Country"}
                </h2>

                <p>
                  {editId
                    ? "Update the country information below."
                    : "Add a new country and destination."}
                </p>
              </div>

            </div>

            {editId && (
              <button
                type="button"
                className="post-country-cancel-edit"
                onClick={resetForm}
              >
                <X size={15} />
                Cancel Edit
              </button>
            )}

          </div>

          <form
            className="post-country-form"
            onSubmit={handleSubmit}
          >

            {/* COUNTRY NAME */}

            <div className="post-country-form-group">

              <label className="post-country-label">
                <Globe2 size={15} />
                Country Name
                <span>*</span>
              </label>

              <div className="post-country-input-wrap">

                <Globe2
                  size={17}
                  className="post-country-input-icon"
                />

                <input
                  type="text"
                  name="countryName"
                  value={countryData.countryName}
                  onChange={handleChange}
                  placeholder="e.g. United Kingdom"
                  className="post-country-input"
                  required
                />

              </div>

            </div>

            {/* PLACE NAME */}

            <div className="post-country-form-group">

              <label className="post-country-label">
                <MapPin size={15} />
                Place / Destination
                <span>*</span>
              </label>

              <div className="post-country-input-wrap">

                <MapPin
                  size={17}
                  className="post-country-input-icon"
                />

                <input
                  type="text"
                  name="placeName"
                  value={countryData.placeName}
                  onChange={handleChange}
                  placeholder="e.g. London"
                  className="post-country-input"
                  required
                />

              </div>

            </div>

            {/* LOGO UPLOAD */}

            <div className="post-country-form-group">

              <label className="post-country-label">
                <ImageIcon size={15} />
                Country Logo
                {!editId && <span>*</span>}
              </label>

              <div
                className={`post-country-upload-box ${
                  logoPreview
                    ? "has-preview"
                    : ""
                }`}
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >

                {logoPreview ? (
                  <div className="post-country-upload-preview">

                    <img
                      src={logoPreview}
                      alt="Country preview"
                    />

                    <div className="post-country-upload-overlay">
                      <Upload size={18} />
                      <span>
                        Change Logo
                      </span>
                    </div>

                  </div>
                ) : (
                  <>

                    <div className="post-country-upload-icon">
                      <Upload size={21} />
                    </div>

                    <div className="post-country-upload-text">

                      <strong>
                        Upload country logo
                      </strong>

                      <span>
                        PNG, JPG, WEBP · Max 5MB
                      </span>

                    </div>

                  </>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  name="countryLogo"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleChange}
                  className="post-country-file-input"
                />

              </div>

            </div>

            {/* BUTTON */}

            <div className="post-country-form-actions">

              {editId && (
                <button
                  type="button"
                  className="post-country-secondary-btn"
                  onClick={resetForm}
                >
                  <X size={17} />
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className="post-country-submit-btn"
                disabled={submitLoading}
              >

                {submitLoading ? (
                  <>
                    <span className="post-country-button-spinner" />
                    {editId
                      ? "Updating..."
                      : "Adding..."}
                  </>
                ) : (
                  <>
                    {editId ? (
                      <Pencil size={17} />
                    ) : (
                      <Plus size={18} />
                    )}

                    {editId
                      ? "Update Country"
                      : "Add Country"}
                  </>
                )}

              </button>

            </div>

          </form>

        </section>

        {/* ================================================= */}
        {/* LIST CARD */}
        {/* ================================================= */}

        <section className="post-country-list-card">

          <div className="post-country-list-header">

            <div className="post-country-list-heading">

              <div className="post-country-list-icon">
                <FileText size={19} />
              </div>

              <div>
                <h2>
                  Country Directory
                </h2>

                <p>
                  {filteredData.length}{" "}
                  {filteredData.length === 1
                    ? "country"
                    : "countries"}{" "}
                  found
                </p>
              </div>

            </div>

            <div className="post-country-search">

              <Search
                size={18}
                className="post-country-search-icon"
              />

              <input
                type="text"
                placeholder="Search country or place..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="post-country-search-input"
              />

              {searchTerm && (
                <button
                  type="button"
                  className="post-country-search-clear"
                  onClick={() => setSearchTerm("")}
                >
                  <X size={15} />
                </button>
              )}

            </div>

          </div>

          {/* TABLE */}

          <div className="post-country-table-wrapper">

            <table className="post-country-table">

              <thead>

                <tr>
                  <th className="post-country-sl-column">
                    #
                  </th>

                  <th>
                    Country
                  </th>

                  <th>
                    Destination
                  </th>

                  <th>
                    Logo
                  </th>

                  <th className="post-country-action-column">
                    Actions
                  </th>
                </tr>

              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="post-country-loading-cell"
                    >
                      <div className="post-country-loading">

                        <div className="post-country-loader" />

                        <span>
                          Loading countries...
                        </span>

                      </div>
                    </td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map(
                    (item, index) => (
                      <tr key={item._id}>

                        <td>
                          <span className="post-country-index">
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </span>
                        </td>

                        <td>

                          <div className="post-country-name-cell">

                            <div className="post-country-row-logo">

                              {item.logoUrl ? (
                                <img
                                  src={getImageUrl(
                                    item.logoUrl
                                  )}
                                  alt={
                                    item.countryName
                                  }
                                />
                              ) : (
                                <Globe2
                                  size={20}
                                />
                              )}

                            </div>

                            <div>

                              <strong>
                                {
                                  item.countryName
                                }
                              </strong>

                              <span>
                                International
                                Destination
                              </span>

                            </div>

                          </div>

                        </td>

                        <td>

                          <div className="post-country-place-cell">

                            <MapPin
                              size={15}
                            />

                            <span>
                              {
                                item.placeName
                              }
                            </span>

                          </div>

                        </td>

                        <td>

                          <div className="post-country-table-logo">

                            {item.logoUrl ? (
                              <img
                                src={getImageUrl(
                                  item.logoUrl
                                )}
                                alt={
                                  item.countryName
                                }
                              />
                            ) : (
                              <Globe2
                                size={19}
                              />
                            )}

                          </div>

                        </td>

                        <td>

                          <div className="post-country-actions">

                            <button
                              type="button"
                              className="post-country-icon-btn preview"
                              title="Preview"
                              onClick={() =>
                                handlePreview(
                                  item._id
                                )
                              }
                            >
                              <Eye size={16} />
                            </button>

                            <button
                              type="button"
                              className="post-country-icon-btn edit"
                              title="Edit"
                              onClick={() =>
                                handleEdit(
                                  item._id
                                )
                              }
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              type="button"
                              className="post-country-icon-btn delete"
                              title="Delete"
                              disabled={
                                deleteLoading ===
                                item._id
                              }
                              onClick={() =>
                                handleDelete(
                                  item._id
                                )
                              }
                            >
                              {deleteLoading ===
                              item._id ? (
                                <span className="post-country-mini-spinner" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )
                ) : (
                  <tr>

                    <td
                      colSpan={5}
                      className="post-country-empty-cell"
                    >

                      <div className="post-country-empty">

                        <div className="post-country-empty-icon">
                          <Globe2 size={30} />
                        </div>

                        <h3>
                          No countries found
                        </h3>

                        <p>
                          {searchTerm
                            ? "Try changing your search keyword."
                            : "Add your first country to get started."}
                        </p>

                        {searchTerm && (
                          <button
                            type="button"
                            onClick={() =>
                              setSearchTerm("")
                            }
                            className="post-country-empty-btn"
                          >
                            Clear Search
                          </button>
                        )}

                      </div>

                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </section>

      </div>

      {/* ================================================= */}
      {/* PREVIEW MODAL */}
      {/* ================================================= */}

      {previewCountry && (
        <div
          className="post-country-modal-backdrop"
          onClick={closePreview}
        >

          <div
            className="post-country-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="post-country-modal-header">

              <div className="post-country-modal-heading">

                <div className="post-country-modal-heading-icon">
                  <Sparkles size={18} />
                </div>

                <div>
                  <span>
                    Country Preview
                  </span>

                  <h2>
                    Destination Details
                  </h2>
                </div>

              </div>

              <button
                type="button"
                className="post-country-modal-close"
                onClick={closePreview}
              >
                <X size={19} />
              </button>

            </div>

            {/* MODAL IMAGE */}

            <div className="post-country-preview-cover">

              <div className="post-country-preview-glow" />

              {previewCountry.logoUrl ? (
                <img
                  src={getImageUrl(
                    previewCountry.logoUrl
                  )}
                  alt={
                    previewCountry.countryName
                  }
                  className="post-country-preview-logo"
                />
              ) : (
                <div className="post-country-preview-logo-placeholder">
                  <Globe2 size={42} />
                </div>
              )}

              <div className="post-country-preview-badge">
                <CheckCircle2 size={13} />
                Active Country
              </div>

            </div>

            {/* MODAL CONTENT */}

            <div className="post-country-preview-content">

              <span className="post-country-preview-label">
                Country
              </span>

              <h3>
                {previewCountry.countryName}
              </h3>

              <div className="post-country-preview-location">

                <MapPin size={17} />

                <span>
                  {previewCountry.placeName}
                </span>

              </div>

              <div className="post-country-preview-info">

                <div>

                  <span>
                    Destination
                  </span>

                  <strong>
                    {previewCountry.placeName}
                  </strong>

                </div>

                <div>

                  <span>
                    Country
                  </span>

                  <strong>
                    {previewCountry.countryName}
                  </strong>

                </div>

              </div>

            </div>

            {/* MODAL FOOTER */}

            <div className="post-country-preview-footer">

              <button
                type="button"
                className="post-country-preview-close-btn"
                onClick={closePreview}
              >
                Close Preview
              </button>

              <button
                type="button"
                className="post-country-preview-edit-btn"
                onClick={() => {
                  closePreview();
                  handleEdit(
                    previewCountry._id
                  );
                }}
              >
                <Pencil size={16} />
                Edit Country
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default PostCountry;