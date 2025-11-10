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
import BASE_URL from "../../Api"; // ✅ your API base URL, e.g. "http://localhost:5000/api"

interface VisaType {
  name: string;
  fees: string;
  category: string;
  entryType: string;
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
  bannerUrl?: string;
  specialImageUrl?: string;
  createdAt: string;
  published: boolean;
}

const PreviewVisa: React.FC = () => {
  const [visas, setVisas] = useState<Visa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // ✅ Fetch all visas on mount
  useEffect(() => {
    fetchVisas();
  }, []);

  const fetchVisas = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/visas`);
      if (data.success) {
        setVisas(data.data);
      } else {
        setError("No visa data found");
      }
    } catch (err) {
      console.error("❌ Error fetching visas:", err);
      setError("Failed to load visa data");
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = (id: string) => setOpenMenu(openMenu === id ? null : id);

  // ✅ Delete visa
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this visa?")) return;
    try {
      await axios.delete(`${BASE_URL}/visas/${id}`);
      setVisas(visas.filter((v) => v._id !== id));
    } catch (err) {
      alert("Error deleting visa");
    } finally {
      setOpenMenu(null);
    }
  };

  // ✅ Publish / Unpublish
  const handlePublishToggle = async (id: string) => {
    try {
      const { data } = await axios.patch(`${BASE_URL}/visas/publish/${id}`);
      if (data.success) {
        setVisas((prev) =>
          prev.map((v) => (v._id === id ? { ...v, published: data.data.published } : v))
        );
      }
    } catch (err) {
      alert("Error updating publish status");
    } finally {
      setOpenMenu(null);
    }
  };

  // ✅ Loading state
  if (loading) {
    return (
      <section className="pv-wrapper">
        <div className="pv-loading">Loading visa data...</div>
      </section>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <section className="pv-wrapper">
        <div className="pv-error">{error}</div>
      </section>
    );
  }

  return (
    <section className="pv-wrapper">
      <div className="pv-header">
        <div className="pv-header-left">
          <h1>
            Visa Management <span className="pv-sub">Preview</span>
          </h1>
        </div>
        <div className="pv-header-right">
          <button className="pv-btn" onClick={fetchVisas}>
            Refresh Data
          </button>
        </div>
      </div>

      <div className="pv-grid">
        {visas.map((visa) => (
          <article className="pv-card" key={visa._id}>
            {/* ✅ top row */}
            <div className="pv-card-top">
              <div className="pv-country">
                {visa.bannerUrl ? (
                  <img
                    src={`${BASE_URL.replace("/api", "")}${visa.bannerUrl}`}
                    alt={`${visa.country} banner`}
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
                  <div className="pv-dropdown" role="menu">
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
                      />{" "}
                      {visa.published ? "Unpublish" : "Publish"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ✅ approval tagline */}
            <div className="pv-approval">
              <span className="pv-approval-dot" /> {visa.approvalTagline}
            </div>

            {/* ✅ details grid */}
            <div className="pv-details">
              <div className="pv-detail">
                <DollarSign className="pv-ico pv-ico-price" />
                <div>
                  <div className="pv-detail-label">Starting From</div>
                  <div className="pv-detail-value">₹{visa.startingPrice}</div>
                </div>
              </div>

              <div className="pv-detail">
                <Clock className="pv-ico pv-ico-time" />
                <div>
                  <div className="pv-detail-label">Processing Time</div>
                  <div className="pv-detail-value">{visa.processingTime}</div>
                </div>
              </div>

              <div className="pv-detail">
                <CalendarDays className="pv-ico pv-ico-date" />
                <div>
                  <div className="pv-detail-label">Posted On</div>
                  <div className="pv-detail-value">
                    {new Date(visa.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="pv-detail">
                <User className="pv-ico pv-ico-user" />
                <div>
                  <div className="pv-detail-label">Expert</div>
                  <div className="pv-detail-value">
                    {visa.expert || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ visa types */}
            {visa.visaTypes.length > 0 && (
              <div className="pv-type-wrap">
                <h3 className="pv-type-title">
                  <Globe2 className="pv-ico pv-ico-globe-small" /> Visa Type(s)
                </h3>

                <div className="pv-type-list">
                  {visa.visaTypes.map((vt, i) => (
                    <div className="pv-type-card" key={i}>
                      <div className="pv-type-top">
                        <div className="pv-type-name">{vt.name}</div>
                        <div className="pv-type-fees">₹{vt.fees}</div>
                      </div>

                      <div className="pv-type-meta">
                        <span className="pv-chip pv-chip-cat">
                          {vt.category}
                        </span>
                        <span className="pv-chip pv-chip-entry">
                          {vt.entryType}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default PreviewVisa;
