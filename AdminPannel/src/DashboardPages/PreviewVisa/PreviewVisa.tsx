import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PreviewVisa.css";
import {
  MoreVertical,
  Trash2,
  CheckCircle2,
  CalendarDays,
  Clock,
  DollarSign,
  User,
  Globe2,
} from "lucide-react";
import BASE_URL from "../../Api";

interface VisaType {
  name: string;
  fees: string;
  category: string;
  entryType: string;
  processingTime?: string;
  stayPeriod?: string;
  validity?: string;
}

interface Visa {
  _id: string;
  country: string;
  processingTime: string;
  startingPrice: string;
  approvalTagline: string;
  expert: string;
  isPopular: boolean;
  isNormal: boolean;
  visaTypes: VisaType[];
  documents?: string[];
  faqs?: any[];
  infos?: any[];
  description?: string;
  bannerUrl?: string;
  specialImageUrl?: string;
  createdAt: string;
  published: boolean;
}

const PreviewVisa: React.FC = () => {
  const [visas, setVisas] = useState<Visa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [editData, setEditData] = useState<Visa | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);

  // Fetch all visas
  useEffect(() => {
    fetchVisas();
  }, []);

  const fetchVisas = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/visas`);
      if (data.success) setVisas(data.data);
      else setError("No visa data found");
    } catch (err) {
      setError("Failed to load visa data");
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = (id: string) =>
    setOpenMenu(openMenu === id ? null : id);

  const handleEditOpen = (visa: Visa) => {
    setEditData(visa);
    setEditForm(JSON.parse(JSON.stringify(visa))); // deep copy
    setShowDrawer(true);
  };

  const closeDrawer = () => setShowDrawer(false);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this visa?")) return;
    try {
      await axios.delete(`${BASE_URL}/visas/${id}`);
      setVisas(visas.filter((v) => v._id !== id));
    } catch (err) {
      alert("Error deleting visa");
    }
  };

  const handlePublishToggle = async (id: string) => {
    try {
      const { data } = await axios.patch(`${BASE_URL}/visas/publish/${id}`);
      if (data.success) {
        setVisas((prev) =>
          prev.map((v) =>
            v._id === id ? { ...v, published: data.data.published } : v
          )
        );
      }
    } catch {
      alert("Error updating publish status");
    }
  };

  // --- UPDATE VISA ----
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("country", editForm.country);
      formData.append("processingTime", editForm.processingTime);
      formData.append("startingPrice", editForm.startingPrice);
      formData.append("approvalTagline", editForm.approvalTagline);
      formData.append("expert", editForm.expert || "");
      formData.append("description", editForm.description || "");
      formData.append("isPopular", String(editForm.isPopular));
      formData.append("isNormal", String(editForm.isNormal));

      formData.append("visaTypes", JSON.stringify(editForm.visaTypes));
      formData.append("documents", JSON.stringify(editForm.documents || []));
      formData.append("faqs", JSON.stringify(editForm.faqs || []));
      formData.append("infos", JSON.stringify(editForm.infos || []));

      if (bannerFile) formData.append("banner", bannerFile);

      const { data } = await axios.patch(
        `${BASE_URL}/visas/${editData?._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data.success) {
        alert("Visa Updated Successfully!");
        closeDrawer();
        fetchVisas();
      }
    } catch (err) {
      console.error("Update error", err);
      alert("Error updating visa");
    }
  };

  // Loading
  if (loading)
    return (
      <section className="pv-wrapper">
        <div className="pv-loading">Loading visa data...</div>
      </section>
    );

  // Error
  if (error)
    return (
      <section className="pv-wrapper">
        <div className="pv-error">{error}</div>
      </section>
    );

  return (
    <section className="pv-wrapper">
      {/* HEADER */}
      <div className="pv-header">
        <h1>
          Visa Management <span className="pv-sub">Preview</span>
        </h1>

        <button className="pv-btn" onClick={fetchVisas}>
          Refresh
        </button>
      </div>

      {/* GRID */}
      <div className="pv-grid">
        {visas.map((visa) => (
          <article className="pv-card" key={visa._id}>
            {/* Top Row */}
            <div className="pv-card-top">
              <div className="pv-country">
                {visa.bannerUrl ? (
                  <img
                    src={`${BASE_URL.replace("/api", "")}${visa.bannerUrl}`}
                    className="pv-flag"
                  />
                ) : (
                  <Globe2 className="pv-ico-globe" />
                )}
                <h2 className="pv-country-name">{visa.country}</h2>
              </div>

              <div className="pv-menu">
                <button
                  className="pv-menu-btn"
                  onClick={() => toggleMenu(visa._id)}
                >
                  <MoreVertical />
                </button>

                {openMenu === visa._id && (
                  <div className="pv-dropdown">
                    <button
                      className="pv-dropdown-item pv-edit"
                      onClick={() => handleEditOpen(visa)}
                    >
                      ✏ Edit
                    </button>

                    <button
                      className="pv-dropdown-item pv-delete"
                      onClick={() => handleDelete(visa._id)}
                    >
                      <Trash2 className="pv-icon pv-icon-red" /> Delete
                    </button>

                    <button
                      className="pv-dropdown-item pv-publish"
                      onClick={() => handlePublishToggle(visa._id)}
                    >
                      <CheckCircle2
                        className={`pv-icon ${
                          visa.published ? "pv-icon-green" : "pv-icon-gray"
                        }`}
                      />
                      {visa.published ? "Unpublish" : "Publish"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tagline */}
            <div className="pv-approval">
              <span className="pv-approval-dot" /> {visa.approvalTagline}
            </div>

            {/* Details */}
            <div className="pv-details">
              <div className="pv-detail">
                <DollarSign className="pv-ico" />
                <div>
                  <div className="pv-detail-label">Starting From</div>
                  <div className="pv-detail-value">₹{visa.startingPrice}</div>
                </div>
              </div>

              <div className="pv-detail">
                <Clock className="pv-ico" />
                <div>
                  <div className="pv-detail-label">Processing Time</div>
                  <div className="pv-detail-value">{visa.processingTime}</div>
                </div>
              </div>

              <div className="pv-detail">
                <CalendarDays className="pv-ico" />
                <div>
                  <div className="pv-detail-label">Posted On</div>
                  <div className="pv-detail-value">
                    {new Date(visa.createdAt).toLocaleDateString()}
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

            {/* Visa Types */}
            {visa.visaTypes.length > 0 && (
              <div className="pv-type-wrap">
                <h3 className="pv-type-title">
                  <Globe2 className="pv-ico" /> Visa Type(s)
                </h3>

                <div className="pv-type-list">
                  {visa.visaTypes.map((vt, i) => (
                    <div className="pv-type-card" key={i}>
                      <div className="pv-type-top">
                        <div className="pv-type-name">{vt.name}</div>
                        <div className="pv-type-fees">₹{vt.fees}</div>
                      </div>

                      <div className="pv-type-meta">
                        <span className="pv-chip">{vt.category}</span>
                        <span className="pv-chip">{vt.entryType}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* DRAWER */}
      {showDrawer && editData && (
        <div className="pv-drawer-overlay">
          <div className="pv-drawer">
            <div className="pv-drawer-header">
              <h2>Edit Visa — {editForm.country}</h2>
              <button className="pv-drawer-close" onClick={closeDrawer}>
                ✕
              </button>
            </div>

            {/* MAIN FIELDS */}
            <div className="pv-row">
              <div className="pv-col">
                <label className="pv-label">Starting Price</label>
                <input
                  className="pv-input"
                  value={editForm.startingPrice}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      startingPrice: e.target.value,
                    })
                  }
                />
              </div>

              <div className="pv-col">
                <label className="pv-label">Processing Time</label>
                <input
                  className="pv-input"
                  value={editForm.processingTime}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      processingTime: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="pv-row">
              <div className="pv-col">
                <label className="pv-label">Approval Tagline</label>
                <input
                  className="pv-input"
                  value={editForm.approvalTagline}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      approvalTagline: e.target.value,
                    })
                  }
                />
              </div>

              <div className="pv-col">
                <label className="pv-label">Expert</label>
                <input
                  className="pv-input"
                  value={editForm.expert}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      expert: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="pv-section">
              <label className="pv-label">Banner Image</label>
              <input
                type="file"
                className="pv-input-file"
                onChange={(e) =>
                  setBannerFile(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>

            <h3 className="pv-drawer-subtitle">Edit Visa Types</h3>

            {editForm.visaTypes.map((vt: any, i: number) => (
              <div className="pv-type-edit-box" key={i}>
                <h4 className="pv-type-heading">{vt.name}</h4>

                <div className="pv-row">
                  <div className="pv-col">
                    <label className="pv-label-small">Fees</label>
                    <input
                      className="pv-input"
                      value={vt.fees}
                      onChange={(e) => {
                        const list = [...editForm.visaTypes];
                        list[i].fees = e.target.value;
                        setEditForm({ ...editForm, visaTypes: list });
                      }}
                    />
                  </div>

                  <div className="pv-col">
                    <label className="pv-label-small">Processing Time</label>
                    <input
                      className="pv-input"
                      value={vt.processingTime}
                      onChange={(e) => {
                        const list = [...editForm.visaTypes];
                        list[i].processingTime = e.target.value;
                        setEditForm({ ...editForm, visaTypes: list });
                      }}
                    />
                  </div>
                </div>

                <div className="pv-row">
                  <div className="pv-col">
                    <label className="pv-label-small">Stay Period</label>
                    <input
                      className="pv-input"
                      value={vt.stayPeriod}
                      onChange={(e) => {
                        const list = [...editForm.visaTypes];
                        list[i].stayPeriod = e.target.value;
                        setEditForm({ ...editForm, visaTypes: list });
                      }}
                    />
                  </div>

                  <div className="pv-col">
                    <label className="pv-label-small">Validity</label>
                    <input
                      className="pv-input"
                      value={vt.validity}
                      onChange={(e) => {
                        const list = [...editForm.visaTypes];
                        list[i].validity = e.target.value;
                        setEditForm({ ...editForm, visaTypes: list });
                      }}
                    />
                  </div>
                </div>

                <div className="pv-row">
                  <div className="pv-col">
                    <label className="pv-label-small">Category</label>
                    <input
                      className="pv-input"
                      value={vt.category}
                      onChange={(e) => {
                        const list = [...editForm.visaTypes];
                        list[i].category = e.target.value;
                        setEditForm({ ...editForm, visaTypes: list });
                      }}
                    />
                  </div>

                  <div className="pv-col">
                    <label className="pv-label-small">Entry Type</label>
                    <input
                      className="pv-input"
                      value={vt.entryType}
                      onChange={(e) => {
                        const list = [...editForm.visaTypes];
                        list[i].entryType = e.target.value;
                        setEditForm({ ...editForm, visaTypes: list });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button className="pv-save-btn" onClick={handleUpdate}>
              Save Changes
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PreviewVisa;
