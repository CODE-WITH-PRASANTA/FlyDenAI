
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
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

const TINYMCE_API_KEY =
  "8hswbe7bfeeneui9eb9gjgsym8ku30nx5gwre9808ajdzniu";

const PreviewVisa = () => {
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

  // Fetch visas
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

  // Image URL helper
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

  // Open edit modal
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

  // Close edit modal
  const closeDrawer = () => {
    if (saving) return;

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

  // General field update
  const handleFieldChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update visa type
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

  // Add visa type
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

  // Remove visa type
  const removeVisaType = (index) => {
    setEditForm((prev) => ({
      ...prev,
      visaTypes: (prev.visaTypes || []).filter(
        (_, i) => i !== index
      ),
    }));
  };

  // Banner upload
  const handleBannerChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      event.target.value = "";
      return;
    }

    if (bannerPreview.startsWith("blob:")) {
      URL.revokeObjectURL(bannerPreview);
    }

    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  // Remove newly selected banner
  const removeBanner = () => {
    if (bannerPreview.startsWith("blob:")) {
      URL.revokeObjectURL(bannerPreview);
    }

    setBannerFile(null);
    setBannerPreview(
      editData?.bannerUrl
        ? getImageUrl(editData.bannerUrl)
        : ""
    );
  };

  // Delete visa
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

  // Publish / unpublish visa
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

  // Save visa
  const handleUpdate = async () => {
    if (!editData?._id || saving) return;

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("country", editForm.country || "");
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
      formData.append("expert", editForm.expert || "");

      // TinyMCE HTML is saved in the existing description field.
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

        setShowDrawer(false);
        setEditData(null);
        setEditForm({});
        setBannerFile(null);
        setBannerPreview("");
        document.body.style.overflow = "";

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

  // Format Indian currency
  const formatPrice = (price) => {
    if (price === undefined || price === null || price === "") {
      return "0";
    }

    const numeric = Number(String(price).replace(/,/g, ""));

    if (Number.isNaN(numeric)) {
      return price;
    }

    return numeric.toLocaleString("en-IN");
  };

  // Reusable text field
  const renderInput = (
    label,
    field,
    placeholder,
    Icon = null
  ) => (
    <div className="pv-form-group" key={field}>
      <label>{label}</label>

      <div
        className={
          Icon ? "pv-input-icon-wrap" : "pv-input-wrap"
        }
      >
        {Icon && <Icon />}

        <input
          className={
            Icon
              ? "pv-input"
              : "pv-input pv-plain-input"
          }
          value={editForm[field] ?? ""}
          onChange={(e) =>
            handleFieldChange(field, e.target.value)
          }
          placeholder={placeholder}
        />
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="pv-wrapper">
        <div className="pv-loading">
          <span className="pv-loading-spinner" />
          Loading visa data...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pv-wrapper">
        <div className="pv-error">{error}</div>

        <button className="pv-btn" onClick={fetchVisas}>
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section className="pv-wrapper">
      {/* Header */}
      <div className="pv-header">
        <div className="pv-header-left">
          <h1>
            Visa Management
            <span className="pv-sub">Preview</span>
          </h1>

          <p>Manage, update and publish your visa information.</p>
        </div>

        <div className="pv-header-right">
          <button className="pv-btn" onClick={fetchVisas}>
            Refresh
          </button>
        </div>
      </div>

      {/* Visa cards */}
      <div className="pv-grid">
        {visas.map((visa) => (
          <article className="pv-card" key={visa._id}>
            <div className="pv-card-banner">
              {visa.bannerUrl ? (
                <img
                  src={getImageUrl(visa.bannerUrl)}
                  alt={visa.country || "Visa banner"}
                />
              ) : (
                <div className="pv-card-no-image">
                  <Globe2 />
                </div>
              )}

              <div
                className={`pv-banner-status ${
                  visa.published ? "" : "unpublished"
                }`}
              >
                <span />
                {visa.published ? "Published" : "Draft"}
              </div>

              <div className="pv-menu">
                <button
                  type="button"
                  className="pv-menu-btn"
                  onClick={() =>
                    setOpenMenu(
                      openMenu === visa._id ? null : visa._id
                    )
                  }
                  aria-label="Visa actions"
                >
                  <MoreVertical />
                </button>

                {openMenu === visa._id && (
                  <div className="pv-dropdown">
                    <button
                      type="button"
                      className="pv-dropdown-item pv-edit"
                      onClick={() => handleEditOpen(visa)}
                    >
                      <FileText />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="pv-dropdown-item pv-delete"
                      onClick={() => handleDelete(visa._id)}
                    >
                      <Trash2 className="pv-icon pv-icon-red" />
                      Delete
                    </button>

                    <button
                      type="button"
                      className="pv-dropdown-item pv-publish"
                      onClick={() =>
                        handlePublishToggle(visa._id)
                      }
                    >
                      <CheckCircle2
                        className={`pv-icon ${
                          visa.published
                            ? "pv-icon-green"
                            : "pv-icon-gray"
                        }`}
                      />
                      {visa.published ? "Unpublish" : "Publish"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pv-card-body">
              <div className="pv-card-top">
                <div className="pv-country">
                  {visa.bannerUrl ? (
                    <img
                      src={getImageUrl(visa.bannerUrl)}
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
                <span className="pv-approval-dot" />
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
                      ₹{formatPrice(visa.startingPrice)}
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
                      {visa.processingTime || "N/A"}
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
                    <div className="pv-detail-label">Expert</div>
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
                    {visa.visaTypes.map((vt, index) => (
                      <div className="pv-type-card" key={index}>
                        <div className="pv-type-top">
                          <div className="pv-type-name">
                            {vt.name}
                          </div>
                          <div className="pv-type-fees">
                            ₹{formatPrice(vt.fees)}
                          </div>
                        </div>

                        <div className="pv-type-meta">
                          <span className="pv-chip pv-chip-cat">
                            {vt.category || "General"}
                          </span>
                          <span className="pv-chip pv-chip-entry">
                            {vt.entryType || "Standard"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Edit Visa modal */}
      {showDrawer && editData && (
        <div
          className="pv-edit-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDrawer();
            }
          }}
        >
          <div className="pv-edit-modal">
            {/* Modal header */}
            <div className="pv-edit-header">
              <div className="pv-edit-heading">
                <div className="pv-edit-heading-icon">
                  <ShieldCheck />
                </div>

                <div>
                  <h2>Edit Visa</h2>
                  <p>Update visa information and settings</p>
                </div>
              </div>

              <button
                type="button"
                className="pv-edit-close"
                onClick={closeDrawer}
                aria-label="Close"
                disabled={saving}
              >
                <X />
              </button>
            </div>

            {/* Modal body */}
            <div className="pv-edit-body">
              {/* Sidebar navigation */}
              <aside className="pv-edit-sidebar">
                {[
                  {
                    id: "basic",
                    label: "Basic Information",
                    Icon: FileText,
                  },
                  {
                    id: "types",
                    label: "Visa Types",
                    Icon: List,
                  },
                  {
                    id: "documents",
                    label: "Documents",
                    Icon: FileText,
                  },
                  {
                    id: "faqs",
                    label: "FAQs",
                    Icon: HelpCircle,
                  },
                  {
                    id: "infos",
                    label: "Additional Info",
                    Icon: Info,
                  },
                ].map(({ id, label, Icon }) => (
                  <button
                    type="button"
                    key={id}
                    className={`pv-edit-nav ${
                      activeEditSection === id ? "active" : ""
                    }`}
                    onClick={() => setActiveEditSection(id)}
                  >
                    <Icon />
                    <span>{label}</span>
                    <ChevronRight />
                  </button>
                ))}
              </aside>

              {/* Form content */}
              <main className="pv-edit-content">
                {/* Basic Information */}
                {activeEditSection === "basic" && (
                  <div className="pv-edit-section-content">
                    <div className="pv-content-title">
                      <div>
                        <h3>Basic Information</h3>
                        <p>
                          Update the main details about this visa.
                        </p>
                      </div>
                    </div>

                    <div className="pv-form-grid">
                      {renderInput(
                        "Country",
                        "country",
                        "Country",
                        Globe2
                      )}

                      {renderInput(
                        "Starting Price",
                        "startingPrice",
                        "85000",
                        DollarSign
                      )}

                      {renderInput(
                        "Processing Time",
                        "processingTime",
                        "3 - 6 Weeks",
                        Clock
                      )}

                      {renderInput(
                        "Approval Tagline",
                        "approvalTagline",
                        "Official approval tagline",
                        CheckCircle2
                      )}

                      {renderInput(
                        "Expert",
                        "expert",
                        "Expert name",
                        User
                      )}
                    </div>

                    <div className="pv-form-grid">
                      <div className="pv-toggle-group">
                        <div>
                          <strong>Popular Visa</strong>
                          <span>Show in popular section</span>
                        </div>

                        <button
                          type="button"
                          className={`pv-toggle ${
                            editForm.isPopular ? "active" : ""
                          }`}
                          onClick={() =>
                            handleFieldChange(
                              "isPopular",
                              !editForm.isPopular
                            )
                          }
                          aria-label="Toggle popular visa"
                        >
                          <span />
                        </button>
                      </div>

                      <div className="pv-toggle-group">
                        <div>
                          <strong>Normal Visa</strong>
                          <span>Show in normal list</span>
                        </div>

                        <button
                          type="button"
                          className={`pv-toggle ${
                            editForm.isNormal ? "active" : ""
                          }`}
                          onClick={() =>
                            handleFieldChange(
                              "isNormal",
                              !editForm.isNormal
                            )
                          }
                          aria-label="Toggle normal visa"
                        >
                          <span />
                        </button>
                      </div>
                    </div>

                    {/* TinyMCE rich-text description editor */}
                    <div className="pv-form-group pv-description-group pv-tinymce-group">
                      <label>Description</label>

                      <div className="pv-tinymce-wrapper">
                        <Editor
                          apiKey={TINYMCE_API_KEY}
                          value={editForm.description || ""}
                          onEditorChange={(content) =>
                            handleFieldChange(
                              "description",
                              content
                            )
                          }
                          init={{
                            height: 300,
                            menubar: true,
                            branding: false,
                            promotion: false,
                            statusbar: true,
                            resize: true,
                            placeholder: "Write visa description...",
                            plugins: [
                              "advlist",
                              "autolink",
                              "lists",
                              "link",
                              "charmap",
                              "searchreplace",
                              "visualblocks",
                              "code",
                              "fullscreen",
                              "insertdatetime",
                              "table",
                              "wordcount",
                              "autoresize",
                            ],
                            toolbar:
                              "undo redo | blocks | " +
                              "bold italic underline strikethrough | " +
                              "forecolor backcolor | " +
                              "alignleft aligncenter alignright alignjustify | " +
                              "bullist numlist | outdent indent | " +
                              "link table | removeformat | code fullscreen",
                            block_formats:
                              "Paragraph=p; Heading 1=h1; Heading 2=h2; " +
                              "Heading 3=h3; Heading 4=h4; Quote=blockquote",
                            content_style:
                              "body { font-family: Inter, Arial, sans-serif; font-size: 14px; line-height: 1.7; color: #292638; padding: 8px; } " +
                              "h1,h2,h3,h4 { color: #292638; font-weight: 700; } " +
                              "a { color: #e93691; }",
                          }}
                        />
                      </div>

                      <small className="pv-description-hint">
                        Format your description with headings,
                        lists, links, colors and text alignment.
                      </small>
                    </div>

                    {/* Banner upload */}
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
                              onClick={removeBanner}
                              aria-label="Remove selected image"
                            >
                              <X />
                            </button>
                          </div>
                        ) : (
                          <div className="pv-banner-placeholder">
                            <ImageIcon />
                            <span>No banner image</span>
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
                              onChange={handleBannerChange}
                            />
                          </label>

                          <p>JPG, PNG or WEBP up to 5MB</p>
                          <small>
                            Recommended size: 1200 × 400
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visa Types */}
                {activeEditSection === "types" && (
                  <div className="pv-edit-section-content">
                    <div className="pv-content-title">
                      <div>
                        <h3>Visa Types</h3>
                        <p>
                          Manage visa types, fees and processing
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
                      {editForm.visaTypes?.length === 0 ? (
                        <div className="pv-no-types">
                          No visa types added.
                        </div>
                      ) : (
                        editForm.visaTypes.map((vt, index) => (
                          <div
                            className="pv-type-edit-box"
                            key={index}
                          >
                            <div className="pv-type-edit-header">
                              <div>
                                <span className="pv-type-number">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <h4>{vt.name || "Visa Type"}</h4>
                              </div>

                              <button
                                type="button"
                                className="pv-remove-type"
                                onClick={() => removeVisaType(index)}
                                aria-label="Remove visa type"
                              >
                                <Trash2 />
                              </button>
                            </div>

                            <div className="pv-form-grid">
                              {[
                                ["Visa Name", "name"],
                                ["Fees", "fees"],
                                ["Processing Time", "processingTime"],
                                ["Stay Period", "stayPeriod"],
                                ["Validity", "validity"],
                                ["Category", "category"],
                                ["Entry Type", "entryType"],
                              ].map(([label, field]) => (
                                <div
                                  className="pv-form-group"
                                  key={field}
                                >
                                  <label>{label}</label>
                                  <input
                                    className="pv-input pv-plain-input"
                                    value={vt[field] ?? ""}
                                    onChange={(e) =>
                                      updateVisaType(
                                        index,
                                        field,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Documents */}
                {activeEditSection === "documents" && (
                  <div className="pv-edit-section-content">
                    <div className="pv-content-title">
                      <div>
                        <h3>Documents</h3>
                        <p>
                          Documents currently associated with this
                          visa.
                        </p>
                      </div>
                    </div>

                    <div className="pv-simple-data-box">
                      {editForm.documents?.length ? (
                        editForm.documents.map((document, index) => (
                          <div
                            className="pv-simple-item"
                            key={index}
                          >
                            <FileText />
                            <span>
                              {typeof document === "string"
                                ? document
                                : JSON.stringify(document)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="pv-no-data">
                          No documents available for editing.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* FAQs */}
                {activeEditSection === "faqs" && (
                  <div className="pv-edit-section-content">
                    <div className="pv-content-title">
                      <div>
                        <h3>FAQs</h3>
                        <p>
                          Frequently asked questions attached to
                          this visa.
                        </p>
                      </div>
                    </div>

                    <div className="pv-simple-data-box">
                      {editForm.faqs?.length ? (
                        editForm.faqs.map((faq, index) => (
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
                                  `FAQ ${index + 1}`}
                              </strong>
                              <p>
                                {faq.answer ||
                                  faq.description ||
                                  ""}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="pv-no-data">
                          No FAQs available for editing.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                {activeEditSection === "infos" && (
                  <div className="pv-edit-section-content">
                    <div className="pv-content-title">
                      <div>
                        <h3>Additional Info</h3>
                        <p>
                          Additional visa information stored for
                          this country.
                        </p>
                      </div>
                    </div>

                    <div className="pv-simple-data-box">
                      {editForm.infos?.length ? (
                        editForm.infos.map((info, index) => (
                          <div
                            className="pv-info-item"
                            key={index}
                          >
                            <Info />
                            <span>
                              {typeof info === "string"
                                ? info
                                : JSON.stringify(info)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="pv-no-data">
                          No additional information available.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </main>
            </div>

            {/* Modal footer */}
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
                    <span className="pv-button-spinner" />
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
