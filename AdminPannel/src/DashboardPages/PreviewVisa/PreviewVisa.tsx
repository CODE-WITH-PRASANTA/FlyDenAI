import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MoreVertical,
  Trash2,
  CheckCircle2,
  CalendarDays,
  Clock,
  DollarSign,
  User,
  Globe2,
  X,
  Save,
  Upload,
  FileText,
  List,
  HelpCircle,
  Info,
  ChevronRight,
  Image as ImageIcon,
  ShieldCheck,
} from "lucide-react";

import BASE_URL from "../../Api";
import "./PreviewVisa.css";

const PreviewVisa = () => {
  /* =========================================================
     STATES
  ========================================================= */

  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openMenu, setOpenMenu] = useState(null);

  const [editData, setEditData] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");

  const [showDrawer, setShowDrawer] = useState(false);

  const [activeEditSection, setActiveEditSection] =
    useState("basic");

  const [saving, setSaving] = useState(false);

  /* =========================================================
     FETCH VISAS
  ========================================================= */

  useEffect(() => {
    fetchVisas();
  }, []);

  const fetchVisas = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(`${BASE_URL}/visas`);

      if (data.success) {
        setVisas(data.data || []);
      } else {
        setError("No visa data found");
      }
    } catch (err) {
      console.error("Failed to load visas:", err);
      setError("Failed to load visa data");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     MENU
  ========================================================= */

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  /* =========================================================
     IMAGE URL
  ========================================================= */

  const getImageUrl = (image) => {
    if (!image) return "";

    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("blob:")
    ) {
      return image;
    }

    const serverUrl = BASE_URL.replace(/\/api\/?$/, "");

    const cleanPath = image
      .replace(/\\/g, "/")
      .replace(/^\/+/, "");

    return `${serverUrl}/${cleanPath}`;
  };

  /* =========================================================
     OPEN EDIT
  ========================================================= */

  const handleEditOpen = (visa) => {
    const clonedVisa = JSON.parse(JSON.stringify(visa));

    setEditData(visa);
    setEditForm({
      ...clonedVisa,
      visaTypes: Array.isArray(clonedVisa.visaTypes)
        ? clonedVisa.visaTypes
        : [],
      documents: Array.isArray(clonedVisa.documents)
        ? clonedVisa.documents
        : [],
      faqs: Array.isArray(clonedVisa.faqs)
        ? clonedVisa.faqs
        : [],
      infos: Array.isArray(clonedVisa.infos)
        ? clonedVisa.infos
        : [],
    });

    setBannerFile(null);
    setBannerPreview(
      visa.bannerUrl ? getImageUrl(visa.bannerUrl) : ""
    );

    setActiveEditSection("basic");
    setOpenMenu(null);
    setShowDrawer(true);

    document.body.style.overflow = "hidden";
  };

  /* =========================================================
     CLOSE EDIT
  ========================================================= */

  const closeDrawer = () => {
    setShowDrawer(false);
    setEditData(null);
    setEditForm({});
    setBannerFile(null);
    setBannerPreview("");
    setActiveEditSection("basic");

    document.body.style.overflow = "";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* =========================================================
     GENERAL INPUT
  ========================================================= */

  const handleFieldChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =========================================================
     VISA TYPE UPDATE
  ========================================================= */

  const updateVisaType = (index, field, value) => {
    setEditForm((prev) => {
      const list = [...(prev.visaTypes || [])];

      list[index] = {
        ...list[index],
        [field]: value,
      };

      return {
        ...prev,
        visaTypes: list,
      };
    });
  };

  /* =========================================================
     ADD VISA TYPE
  ========================================================= */

  const addVisaType = () => {
    setEditForm((prev) => ({
      ...prev,
      visaTypes: [
        ...(prev.visaTypes || []),
        {
          name: "New Visa Type",
          fees: "",
          category: "",
          entryType: "",
          processingTime: "",
          stayPeriod: "",
          validity: "",
        },
      ],
    }));
  };

  /* =========================================================
     REMOVE VISA TYPE
  ========================================================= */

  const removeVisaType = (index) => {
    setEditForm((prev) => ({
      ...prev,
      visaTypes: (prev.visaTypes || []).filter(
        (_, i) => i !== index
      ),
    }));
  };

  /* =========================================================
     BANNER IMAGE
  ========================================================= */

  const handleBannerChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    setBannerFile(file);

    const preview = URL.createObjectURL(file);
    setBannerPreview(preview);
  };

  const removeBanner = () => {
    setBannerFile(null);

    if (editData?.bannerUrl) {
      setBannerPreview(getImageUrl(editData.bannerUrl));
    } else {
      setBannerPreview("");
    }
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this visa?")) return;

    try {
      await axios.delete(`${BASE_URL}/visas/${id}`);

      setVisas((prev) =>
        prev.filter((visa) => visa._id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Error deleting visa");
    }
  };

  /* =========================================================
     PUBLISH TOGGLE
  ========================================================= */

  const handlePublishToggle = async (id) => {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/visas/publish/${id}`
      );

      if (data.success) {
        setVisas((prev) =>
          prev.map((visa) =>
            visa._id === id
              ? {
                  ...visa,
                  published: data.data.published,
                }
              : visa
          )
        );
      }
    } catch (err) {
      console.error(err);
      alert("Error updating publish status");
    }
  };

  /* =========================================================
     UPDATE VISA
  ========================================================= */

  const handleUpdate = async () => {
    if (!editData?._id) return;

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append(
        "country",
        editForm.country || ""
      );

      formData.append(
        "processingTime",
        editForm.processingTime || ""
      );

      formData.append(
        "startingPrice",
        editForm.startingPrice || ""
      );

      formData.append(
        "approvalTagline",
        editForm.approvalTagline || ""
      );

      formData.append(
        "expert",
        editForm.expert || ""
      );

      formData.append(
        "description",
        editForm.description || ""
      );

      formData.append(
        "isPopular",
        String(Boolean(editForm.isPopular))
      );

      formData.append(
        "isNormal",
        String(Boolean(editForm.isNormal))
      );

      formData.append(
        "visaTypes",
        JSON.stringify(editForm.visaTypes || [])
      );

      formData.append(
        "documents",
        JSON.stringify(editForm.documents || [])
      );

      formData.append(
        "faqs",
        JSON.stringify(editForm.faqs || [])
      );

      formData.append(
        "infos",
        JSON.stringify(editForm.infos || [])
      );

      if (bannerFile) {
        formData.append("banner", bannerFile);
      }

      const { data } = await axios.patch(
        `${BASE_URL}/visas/${editData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        alert("Visa Updated Successfully!");

        closeDrawer();
        fetchVisas();
      } else {
        alert(data.message || "Failed to update visa");
      }
    } catch (err) {
      console.error("Update error:", err);

      alert(
        err?.response?.data?.message ||
          "Error updating visa"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     FORMAT PRICE
  ========================================================= */

  const formatPrice = (price) => {
    if (
      price === undefined ||
      price === null ||
      price === ""
    ) {
      return "0";
    }

    const numeric = Number(
      String(price).replace(/,/g, "")
    );

    if (Number.isNaN(numeric)) {
      return price;
    }

    return numeric.toLocaleString("en-IN");
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <section className="pv-wrapper">
        <div className="pv-loading">
          <span className="pv-loading-spinner"></span>
          Loading visa data...
        </div>
      </section>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <section className="pv-wrapper">
        <div className="pv-error">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="pv-wrapper">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="pv-header">

        <div className="pv-header-left">

          <h1>
            Visa Management

            <span className="pv-sub">
              Preview
            </span>
          </h1>

          <p>
            Manage, update and publish your visa
            information.
          </p>

        </div>

        <div className="pv-header-right">

          <button
            className="pv-btn"
            onClick={fetchVisas}
          >
            Refresh
          </button>

        </div>

      </div>

      {/* =====================================================
          VISA GRID
      ===================================================== */}

      <div className="pv-grid">

        {visas.map((visa) => (

          <article
            className="pv-card"
            key={visa._id}
          >

            {/* Banner */}

            <div className="pv-card-banner">

              {visa.bannerUrl ? (
                <img
                  src={getImageUrl(
                    visa.bannerUrl
                  )}
                  alt={visa.country}
                />
              ) : (
                <div className="pv-card-no-image">
                  <Globe2 />
                </div>
              )}

              <div
                className={`pv-banner-status ${
                  visa.published
                    ? ""
                    : "unpublished"
                }`}
              >
                <span></span>

                {visa.published
                  ? "Published"
                  : "Draft"}
              </div>

              <div className="pv-menu">

                <button
                  className="pv-menu-btn"
                  onClick={() =>
                    toggleMenu(visa._id)
                  }
                >
                  <MoreVertical />
                </button>

                {openMenu === visa._id && (

                  <div className="pv-dropdown">

                    <button
                      className="pv-dropdown-item pv-edit"
                      onClick={() =>
                        handleEditOpen(visa)
                      }
                    >
                      ✏ Edit
                    </button>

                    <button
                      className="pv-dropdown-item pv-delete"
                      onClick={() =>
                        handleDelete(
                          visa._id
                        )
                      }
                    >
                      <Trash2 className="pv-icon pv-icon-red" />
                      Delete
                    </button>

                    <button
                      className="pv-dropdown-item pv-publish"
                      onClick={() =>
                        handlePublishToggle(
                          visa._id
                        )
                      }
                    >
                      <CheckCircle2
                        className={`pv-icon ${
                          visa.published
                            ? "pv-icon-green"
                            : "pv-icon-gray"
                        }`}
                      />

                      {visa.published
                        ? "Unpublish"
                        : "Publish"}
                    </button>

                  </div>

                )}

              </div>

            </div>

            {/* Card Body */}

            <div className="pv-card-body">

              <div className="pv-card-top">

                <div className="pv-country">

                  {visa.bannerUrl ? (
                    <img
                      src={getImageUrl(
                        visa.bannerUrl
                      )}
                      className="pv-flag"
                      alt=""
                    />
                  ) : (
                    <Globe2 className="pv-ico-globe" />
                  )}

                  <h2 className="pv-country-name">
                    {visa.country}
                  </h2>

                </div>

              </div>

              <div className="pv-approval">

                <span className="pv-approval-dot"></span>

                {visa.approvalTagline ||
                  "Visa assistance available"}

              </div>

              <div className="pv-details">

                <div className="pv-detail">

                  <DollarSign className="pv-ico" />

                  <div>
                    <div className="pv-detail-label">
                      Starting From
                    </div>

                    <div className="pv-detail-value">
                      ₹
                      {formatPrice(
                        visa.startingPrice
                      )}
                    </div>
                  </div>

                </div>

                <div className="pv-detail">

                  <Clock className="pv-ico" />

                  <div>
                    <div className="pv-detail-label">
                      Processing Time
                    </div>

                    <div className="pv-detail-value">
                      {visa.processingTime ||
                        "N/A"}
                    </div>
                  </div>

                </div>

                <div className="pv-detail">

                  <CalendarDays className="pv-ico" />

                  <div>
                    <div className="pv-detail-label">
                      Posted On
                    </div>

                    <div className="pv-detail-value">
                      {visa.createdAt
                        ? new Date(
                            visa.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </div>

                </div>

                <div className="pv-detail">

                  <User className="pv-ico" />

                  <div>
                    <div className="pv-detail-label">
                      Expert
                    </div>

                    <div className="pv-detail-value">
                      {visa.expert || "N/A"}
                    </div>
                  </div>

                </div>

              </div>

              {visa.visaTypes?.length > 0 && (

                <div className="pv-type-wrap">

                  <h3 className="pv-type-title">
                    <Globe2 className="pv-ico" />
                    Visa Type(s)
                  </h3>

                  <div className="pv-type-list">

                    {visa.visaTypes.map(
                      (vt, index) => (

                        <div
                          className="pv-type-card"
                          key={index}
                        >

                          <div className="pv-type-top">

                            <div className="pv-type-name">
                              {vt.name}
                            </div>

                            <div className="pv-type-fees">
                              ₹
                              {formatPrice(
                                vt.fees
                              )}
                            </div>

                          </div>

                          <div className="pv-type-meta">

                            <span className="pv-chip pv-chip-cat">
                              {vt.category ||
                                "General"}
                            </span>

                            <span className="pv-chip pv-chip-entry">
                              {vt.entryType ||
                                "Standard"}
                            </span>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                </div>

              )}

            </div>

          </article>

        ))}

      </div>

      {/* =====================================================
          EDIT VISA MODAL
      ===================================================== */}

      {showDrawer && editData && (

        <div
          className="pv-edit-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeDrawer();
            }
          }}
        >

          <div className="pv-edit-modal">

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="pv-edit-header">

              <div className="pv-edit-heading">

                <div className="pv-edit-heading-icon">
                  <ShieldCheck />
                </div>

                <div>

                  <h2>
                    Edit Visa
                  </h2>

                  <p>
                    Update visa information
                    and settings
                  </p>

                </div>

              </div>

              <button
                className="pv-edit-close"
                onClick={closeDrawer}
                aria-label="Close"
              >
                <X />
              </button>

            </div>

            {/* =================================================
                MODAL BODY
            ================================================= */}

            <div className="pv-edit-body">

              {/* =================================================
                  LEFT NAVIGATION
              ================================================= */}

              <aside className="pv-edit-sidebar">

                <button
                  className={`pv-edit-nav ${
                    activeEditSection ===
                    "basic"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveEditSection(
                      "basic"
                    )
                  }
                >
                  <FileText />
                  <span>
                    Basic Information
                  </span>
                  <ChevronRight />
                </button>

                <button
                  className={`pv-edit-nav ${
                    activeEditSection ===
                    "types"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveEditSection(
                      "types"
                    )
                  }
                >
                  <List />
                  <span>
                    Visa Types
                  </span>
                  <ChevronRight />
                </button>

                <button
                  className={`pv-edit-nav ${
                    activeEditSection ===
                    "documents"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveEditSection(
                      "documents"
                    )
                  }
                >
                  <FileText />
                  <span>
                    Documents
                  </span>
                  <ChevronRight />
                </button>

                <button
                  className={`pv-edit-nav ${
                    activeEditSection ===
                    "faqs"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveEditSection(
                      "faqs"
                    )
                  }
                >
                  <HelpCircle />
                  <span>
                    FAQs
                  </span>
                  <ChevronRight />
                </button>

                <button
                  className={`pv-edit-nav ${
                    activeEditSection ===
                    "infos"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveEditSection(
                      "infos"
                    )
                  }
                >
                  <Info />
                  <span>
                    Additional Info
                  </span>
                  <ChevronRight />
                </button>

              </aside>

              {/* =================================================
                  FORM CONTENT
              ================================================= */}

              <main className="pv-edit-content">

                {/* ===============================================
                    BASIC INFORMATION
                =============================================== */}

                {activeEditSection ===
                  "basic" && (

                  <div className="pv-edit-section-content">

                    <div className="pv-content-title">

                      <div>
                        <h3>
                          Basic Information
                        </h3>

                        <p>
                          Update the main details
                          about this visa
                        </p>
                      </div>

                    </div>

                    {/* Country + Price */}

                    <div className="pv-form-grid">

                      <div className="pv-form-group">

                        <label>
                          Country
                          <span>*</span>
                        </label>

                        <div className="pv-input-icon-wrap">

                          <Globe2 />

                          <input
                            className="pv-input"
                            value={
                              editForm.country ||
                              ""
                            }
                            onChange={(e) =>
                              handleFieldChange(
                                "country",
                                e.target.value
                              )
                            }
                            placeholder="Country"
                          />

                        </div>

                      </div>

                      <div className="pv-form-group">

                        <label>
                          Starting Price
                          <span>*</span>
                        </label>

                        <div className="pv-input-icon-wrap">

                          <DollarSign />

                          <input
                            className="pv-input"
                            value={
                              editForm.startingPrice ||
                              ""
                            }
                            onChange={(e) =>
                              handleFieldChange(
                                "startingPrice",
                                e.target.value
                              )
                            }
                            placeholder="85000"
                          />

                        </div>

                      </div>

                      {/* Processing */}

                      <div className="pv-form-group">

                        <label>
                          Processing Time
                          <span>*</span>
                        </label>

                        <div className="pv-input-icon-wrap">

                          <Clock />

                          <input
                            className="pv-input"
                            value={
                              editForm.processingTime ||
                              ""
                            }
                            onChange={(e) =>
                              handleFieldChange(
                                "processingTime",
                                e.target.value
                              )
                            }
                            placeholder="3 - 6 Weeks"
                          />

                        </div>

                      </div>

                      {/* Approval */}

                      <div className="pv-form-group">

                        <label>
                          Approval Tagline
                          <span>*</span>
                        </label>

                        <div className="pv-input-icon-wrap">

                          <CheckCircle2 />

                          <input
                            className="pv-input"
                            value={
                              editForm.approvalTagline ||
                              ""
                            }
                            onChange={(e) =>
                              handleFieldChange(
                                "approvalTagline",
                                e.target.value
                              )
                            }
                            placeholder="Official approval tagline"
                          />

                        </div>

                      </div>

                      {/* Expert */}

                      <div className="pv-form-group">

                        <label>
                          Expert
                          <span>*</span>
                        </label>

                        <div className="pv-input-icon-wrap">

                          <User />

                          <input
                            className="pv-input"
                            value={
                              editForm.expert ||
                              ""
                            }
                            onChange={(e) =>
                              handleFieldChange(
                                "expert",
                                e.target.value
                              )
                            }
                            placeholder="Expert name"
                          />

                        </div>

                      </div>

                      {/* Popular */}

                      <div className="pv-toggle-group">

                        <div>
                          <strong>
                            Popular Visa
                          </strong>

                          <span>
                            Show in popular
                            section
                          </span>
                        </div>

                        <button
                          type="button"
                          className={`pv-toggle ${
                            editForm.isPopular
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleFieldChange(
                              "isPopular",
                              !editForm.isPopular
                            )
                          }
                        >
                          <span></span>
                        </button>

                      </div>

                      {/* Normal */}

                      <div className="pv-toggle-group">

                        <div>
                          <strong>
                            Normal Visa
                          </strong>

                          <span>
                            Show in normal
                            list
                          </span>
                        </div>

                        <button
                          type="button"
                          className={`pv-toggle ${
                            editForm.isNormal
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleFieldChange(
                              "isNormal",
                              !editForm.isNormal
                            )
                          }
                        >
                          <span></span>
                        </button>

                      </div>

                    </div>

                    {/* Description */}

                    <div className="pv-form-group pv-description-group">

                      <label>
                        Description
                      </label>

                      <textarea
                        className="pv-textarea"
                        rows="5"
                        value={
                          editForm.description ||
                          ""
                        }
                        onChange={(e) =>
                          handleFieldChange(
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Write visa description..."
                      />

                    </div>

                    {/* Banner */}

                    <div className="pv-banner-section">

                      <label className="pv-banner-label">
                        Banner Image
                      </label>

                      <div className="pv-banner-upload">

                        {bannerPreview ? (

                          <div className="pv-banner-preview">

                            <img
                              src={bannerPreview}
                              alt="Visa banner"
                            />

                            <button
                              type="button"
                              className="pv-banner-remove"
                              onClick={
                                removeBanner
                              }
                            >
                              <X />
                            </button>

                          </div>

                        ) : (

                          <div className="pv-banner-placeholder">
                            <ImageIcon />

                            <span>
                              No banner image
                            </span>
                          </div>

                        )}

                        <div className="pv-banner-actions">

                          <label className="pv-change-image">

                            <Upload />

                            {bannerPreview
                              ? "Change Image"
                              : "Choose Image"}

                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/jpg,image/webp"
                              onChange={
                                handleBannerChange
                              }
                            />

                          </label>

                          <p>
                            JPG, PNG or WEBP up
                            to 5MB
                          </p>

                          <small>
                            Recommended size:
                            1200 × 400
                          </small>

                        </div>

                      </div>

                    </div>

                  </div>
                )}

                {/* ===============================================
                    VISA TYPES
                =============================================== */}

                {activeEditSection ===
                  "types" && (

                  <div className="pv-edit-section-content">

                    <div className="pv-content-title">

                      <div>
                        <h3>
                          Visa Types
                        </h3>

                        <p>
                          Manage visa types,
                          fees and processing
                          details.
                        </p>
                      </div>

                      <button
                        type="button"
                        className="pv-add-type"
                        onClick={addVisaType}
                      >
                        + Add Type
                      </button>

                    </div>

                    <div className="pv-visa-type-edit-list">

                      {(
                        editForm.visaTypes ||
                        []
                      ).length === 0 ? (

                        <div className="pv-no-types">
                          No visa types added.
                        </div>

                      ) : (

                        editForm.visaTypes.map(
                          (vt, index) => (

                            <div
                              className="pv-type-edit-box"
                              key={index}
                            >

                              <div className="pv-type-edit-header">

                                <div>

                                  <span className="pv-type-number">
                                    {String(
                                      index + 1
                                    ).padStart(
                                      2,
                                      "0"
                                    )}
                                  </span>

                                  <h4>
                                    {vt.name ||
                                      "Visa Type"}
                                  </h4>

                                </div>

                                <button
                                  type="button"
                                  className="pv-remove-type"
                                  onClick={() =>
                                    removeVisaType(
                                      index
                                    )
                                  }
                                >
                                  <Trash2 />
                                </button>

                              </div>

                              <div className="pv-form-grid">

                                <div className="pv-form-group">

                                  <label>
                                    Visa Name
                                  </label>

                                  <input
                                    className="pv-input pv-plain-input"
                                    value={
                                      vt.name ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      updateVisaType(
                                        index,
                                        "name",
                                        e.target
                                          .value
                                      )
                                    }
                                  />

                                </div>

                                <div className="pv-form-group">

                                  <label>
                                    Fees
                                  </label>

                                  <input
                                    className="pv-input pv-plain-input"
                                    value={
                                      vt.fees ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      updateVisaType(
                                        index,
                                        "fees",
                                        e.target
                                          .value
                                      )
                                    }
                                  />

                                </div>

                                <div className="pv-form-group">

                                  <label>
                                    Processing Time
                                  </label>

                                  <input
                                    className="pv-input pv-plain-input"
                                    value={
                                      vt.processingTime ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      updateVisaType(
                                        index,
                                        "processingTime",
                                        e.target
                                          .value
                                      )
                                    }
                                  />

                                </div>

                                <div className="pv-form-group">

                                  <label>
                                    Stay Period
                                  </label>

                                  <input
                                    className="pv-input pv-plain-input"
                                    value={
                                      vt.stayPeriod ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      updateVisaType(
                                        index,
                                        "stayPeriod",
                                        e.target
                                          .value
                                      )
                                    }
                                  />

                                </div>

                                <div className="pv-form-group">

                                  <label>
                                    Validity
                                  </label>

                                  <input
                                    className="pv-input pv-plain-input"
                                    value={
                                      vt.validity ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      updateVisaType(
                                        index,
                                        "validity",
                                        e.target
                                          .value
                                      )
                                    }
                                  />

                                </div>

                                <div className="pv-form-group">

                                  <label>
                                    Category
                                  </label>

                                  <input
                                    className="pv-input pv-plain-input"
                                    value={
                                      vt.category ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      updateVisaType(
                                        index,
                                        "category",
                                        e.target
                                          .value
                                      )
                                    }
                                  />

                                </div>

                                <div className="pv-form-group">

                                  <label>
                                    Entry Type
                                  </label>

                                  <input
                                    className="pv-input pv-plain-input"
                                    value={
                                      vt.entryType ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      updateVisaType(
                                        index,
                                        "entryType",
                                        e.target
                                          .value
                                      )
                                    }
                                  />

                                </div>

                              </div>

                            </div>

                          )
                        )

                      )}

                    </div>

                  </div>
                )}

                {/* ===============================================
                    DOCUMENTS
                =============================================== */}

                {activeEditSection ===
                  "documents" && (

                  <div className="pv-edit-section-content">

                    <div className="pv-content-title">

                      <div>
                        <h3>
                          Documents
                        </h3>

                        <p>
                          Documents currently
                          associated with this
                          visa.
                        </p>
                      </div>

                    </div>

                    <div className="pv-simple-data-box">

                      {Array.isArray(
                        editForm.documents
                      ) &&
                      editForm.documents.length >
                        0 ? (

                        editForm.documents.map(
                          (document, index) => (

                            <div
                              className="pv-simple-item"
                              key={index}
                            >
                              <FileText />

                              <span>
                                {typeof document ===
                                "string"
                                  ? document
                                  : JSON.stringify(
                                      document
                                    )}
                              </span>
                            </div>

                          )
                        )

                      ) : (

                        <div className="pv-no-data">
                          No documents available
                          for editing.
                        </div>

                      )}

                    </div>

                  </div>
                )}

                {/* ===============================================
                    FAQS
                =============================================== */}

                {activeEditSection ===
                  "faqs" && (

                  <div className="pv-edit-section-content">

                    <div className="pv-content-title">

                      <div>
                        <h3>
                          FAQs
                        </h3>

                        <p>
                          Frequently asked
                          questions attached to
                          this visa.
                        </p>
                      </div>

                    </div>

                    <div className="pv-simple-data-box">

                      {Array.isArray(
                        editForm.faqs
                      ) &&
                      editForm.faqs.length >
                        0 ? (

                        editForm.faqs.map(
                          (faq, index) => (

                            <div
                              className="pv-faq-item"
                              key={index}
                            >

                              <div className="pv-faq-number">
                                {index + 1}
                              </div>

                              <div>

                                <strong>
                                  {faq.question ||
                                    faq.title ||
                                    `FAQ ${
                                      index + 1
                                    }`}
                                </strong>

                                <p>
                                  {faq.answer ||
                                    faq.description ||
                                    ""}
                                </p>

                              </div>

                            </div>

                          )
                        )

                      ) : (

                        <div className="pv-no-data">
                          No FAQs available for
                          editing.
                        </div>

                      )}

                    </div>

                  </div>
                )}

                {/* ===============================================
                    ADDITIONAL INFO
                =============================================== */}

                {activeEditSection ===
                  "infos" && (

                  <div className="pv-edit-section-content">

                    <div className="pv-content-title">

                      <div>
                        <h3>
                          Additional Info
                        </h3>

                        <p>
                          Additional visa
                          information stored
                          for this country.
                        </p>
                      </div>

                    </div>

                    <div className="pv-simple-data-box">

                      {Array.isArray(
                        editForm.infos
                      ) &&
                      editForm.infos.length >
                        0 ? (

                        editForm.infos.map(
                          (info, index) => (

                            <div
                              className="pv-info-item"
                              key={index}
                            >

                              <Info />

                              <span>
                                {typeof info ===
                                "string"
                                  ? info
                                  : JSON.stringify(
                                      info
                                    )}
                              </span>

                            </div>

                          )
                        )

                      ) : (

                        <div className="pv-no-data">
                          No additional
                          information available.
                        </div>

                      )}

                    </div>

                  </div>
                )}

              </main>

            </div>

            {/* =================================================
                MODAL FOOTER
            ================================================= */}

            <div className="pv-edit-footer">

              <button
                type="button"
                className="pv-cancel-btn"
                onClick={closeDrawer}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="button"
                className="pv-save-btn"
                onClick={handleUpdate}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="pv-button-spinner"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save />
                    Update Visa
                  </>
                )}
              </button>

            </div>

          </div>

        </div>

      )}

    </section>
  );
};

export default PreviewVisa;