import React, { useState, ChangeEvent } from "react";
import "./AdvertizingBanner.css";
import { useTheme } from "../../context/ThemeContext";
import {
  Upload,
  X,
  Trash2,
  Radio,
  Image as ImageIcon,
  Megaphone,
  CheckCircle2,
  Eye,
  Sparkles,
  FileText,
  ListChecks,
} from "lucide-react";

interface BannerData {
  id?: number;
  headline: string;
  subline: string;
  points: string[];
  image: string | null;
  isLive?: boolean;
}

const AdvertizingBanner: React.FC = () => {
  const { theme } = useTheme();

  const [bannerData, setBannerData] = useState<BannerData>({
    headline: "",
    subline: "",
    points: ["", "", ""],
    image: null,
  });

  const [uploadedBanners, setUploadedBanners] = useState<BannerData[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setBannerData({
      ...bannerData,
      [name]: value,
    });
  };

  const handlePointChange = (index: number, value: string) => {
    const updatedPoints = [...bannerData.points];

    updatedPoints[index] = value;

    setBannerData({
      ...bannerData,
      points: updatedPoints,
    });
  };

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setBannerData({
        ...bannerData,
        image: imageUrl,
      });
    }
  };

  const handleRemoveImage = () => {
    setBannerData({
      ...bannerData,
      image: null,
    });
  };

  const handlePost = () => {
    if (!bannerData.image || !bannerData.headline) {
      alert("Please fill all required fields");
      return;
    }

    const newBanner: BannerData = {
      ...bannerData,
      id: Date.now(),
      isLive: false,
    };

    setUploadedBanners([
      ...uploadedBanners,
      newBanner,
    ]);

    setBannerData({
      headline: "",
      subline: "",
      points: ["", "", ""],
      image: null,
    });
  };

  const handleDelete = (id: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this banner?"
      )
    ) {
      setUploadedBanners(
        uploadedBanners.filter(
          (banner) => banner.id !== id
        )
      );
    }
  };

  const handleGoLive = (id: number) => {
    setUploadedBanners((prev) =>
      prev.map((banner) =>
        banner.id === id
          ? {
              ...banner,
              isLive: !banner.isLive,
            }
          : banner
      )
    );
  };

  const liveCount = uploadedBanners.filter(
    (banner) => banner.isLive
  ).length;

  const draftCount =
    uploadedBanners.length - liveCount;

  return (
    <div
      className={`Advertizing-Banner-container ${theme}`}
    >
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="Advertizing-Banner-page-header">
        <div className="Advertizing-Banner-page-title-wrap">
          <div className="Advertizing-Banner-page-icon">
            <Megaphone size={24} />
          </div>

          <div>
            <span className="Advertizing-Banner-eyebrow">
              ADVERTISEMENT MANAGEMENT
            </span>

            <h1 className="Advertizing-Banner-page-title">
              Advertising Banners
            </h1>

            <p className="Advertizing-Banner-page-subtitle">
              Create, manage and publish promotional
              banners from one place.
            </p>
          </div>
        </div>

        <div className="Advertizing-Banner-header-badge">
          <Sparkles size={15} />
          <span>
            {uploadedBanners.length} Total Banners
          </span>
        </div>
      </div>

      {/* =====================================================
          STATS
      ====================================================== */}

      <div className="Advertizing-Banner-stats">

        <div className="Advertizing-Banner-stat-card">
          <div className="Advertizing-Banner-stat-icon total">
            <ImageIcon size={20} />
          </div>

          <div className="Advertizing-Banner-stat-info">
            <span>Total Banners</span>
            <strong>{uploadedBanners.length}</strong>
          </div>
        </div>

        <div className="Advertizing-Banner-stat-card">
          <div className="Advertizing-Banner-stat-icon live">
            <Radio size={20} />
          </div>

          <div className="Advertizing-Banner-stat-info">
            <span>Live Banners</span>
            <strong>{liveCount}</strong>
          </div>
        </div>

        <div className="Advertizing-Banner-stat-card">
          <div className="Advertizing-Banner-stat-icon draft">
            <FileText size={20} />
          </div>

          <div className="Advertizing-Banner-stat-info">
            <span>Draft Banners</span>
            <strong>{draftCount}</strong>
          </div>
        </div>

      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="Advertizing-Banner-layout">

        {/* ===================================================
            LEFT - CREATE BANNER
        ==================================================== */}

        <section className="Advertizing-Banner-left">

          <div className="Advertizing-Banner-section-header">
            <div className="Advertizing-Banner-section-icon">
              <Upload size={19} />
            </div>

            <div>
              <h2 className="Advertizing-Banner-heading">
                Create Advertisement
              </h2>

              <p>
                Upload an image and add your promotional
                content.
              </p>
            </div>
          </div>

          {/* IMAGE UPLOAD */}

          <div className="Advertizing-Banner-form-section">

            <div className="Advertizing-Banner-field-header">
              <div>
                <label>
                  Banner Image
                  <span className="required">*</span>
                </label>

                <small>
                  Recommended: wide promotional banner
                </small>
              </div>
            </div>

            <div className="Advertizing-Banner-upload">

              {bannerData.image ? (
                <div className="Advertizing-Banner-preview">

                  <img
                    src={bannerData.image}
                    alt="Advertisement preview"
                  />

                  <div className="Advertizing-Banner-preview-overlay">
                    <span>
                      <Eye size={14} />
                      Preview
                    </span>
                  </div>

                  <button
                    type="button"
                    className="Advertizing-Banner-remove-img"
                    onClick={handleRemoveImage}
                    aria-label="Remove image"
                  >
                    <X size={16} />
                  </button>

                </div>
              ) : (
                <label className="Advertizing-Banner-upload-label">

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="Advertizing-Banner-file"
                  />

                  <div className="Advertizing-Banner-upload-icon">
                    <Upload size={25} />
                  </div>

                  <strong>
                    Upload banner image
                  </strong>

                  <span>
                    Click to browse or choose an image
                  </span>

                  <small>
                    JPG, JPEG, PNG, WEBP
                  </small>

                </label>
              )}

            </div>
          </div>

          {/* HEADLINE */}

          <div className="Advertizing-Banner-field">

            <label>
              Headline
              <span className="required">*</span>
            </label>

            <div className="Advertizing-Banner-input-wrap">
              <Megaphone size={17} />

              <input
                type="text"
                name="headline"
                value={bannerData.headline}
                onChange={handleChange}
                placeholder="Enter banner headline..."
              />
            </div>

          </div>

          {/* SUBLINE */}

          <div className="Advertizing-Banner-field">

            <label>Subline</label>

            <div className="Advertizing-Banner-textarea-wrap">

              <textarea
                name="subline"
                value={bannerData.subline}
                onChange={handleChange}
                placeholder="Write a short description for your advertisement..."
                rows={4}
              />

            </div>

          </div>

          {/* KEY POINTS */}

          <div className="Advertizing-Banner-field">

            <div className="Advertizing-Banner-label-row">

              <label>
                Key Points
              </label>

              <span>
                3 points
              </span>

            </div>

            <div className="Advertizing-Banner-points">

              {bannerData.points.map(
                (point, index) => (
                  <div
                    className="Advertizing-Banner-point-input"
                    key={index}
                  >

                    <span>
                      {index + 1}
                    </span>

                    <input
                      type="text"
                      value={point}
                      onChange={(e) =>
                        handlePointChange(
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Enter key point ${index + 1}`}
                    />

                  </div>
                )
              )}

            </div>

          </div>

          {/* POST BUTTON */}

          <button
            type="button"
            onClick={handlePost}
            className="Advertizing-Banner-post-btn"
          >
            <Upload size={18} />
            <span>Publish Banner</span>
            <Sparkles size={16} />
          </button>

        </section>

        {/* ===================================================
            RIGHT - UPLOADED BANNERS
        ==================================================== */}

        <section className="Advertizing-Banner-right">

          <div className="Advertizing-Banner-section-header">

            <div className="Advertizing-Banner-section-icon purple">
              <ImageIcon size={19} />
            </div>

            <div>
              <h2 className="Advertizing-Banner-heading">
                Uploaded Banners
              </h2>

              <p>
                Manage and control your advertisements.
              </p>
            </div>

          </div>

          {uploadedBanners.length === 0 ? (

            <div className="Advertizing-Banner-empty">

              <div className="Advertizing-Banner-empty-icon">
                <ImageIcon size={32} />
              </div>

              <h3>
                No banners uploaded
              </h3>

              <p>
                Your uploaded advertisements will
                appear here.
              </p>

              <span>
                Create your first banner using the form.
              </span>

            </div>

          ) : (

            <div className="Advertizing-Banner-grid">

              {uploadedBanners.map((banner) => (

                <article
                  key={banner.id}
                  className={`Advertizing-Banner-card ${
                    banner.isLive
                      ? "Advertizing-Banner-live"
                      : ""
                  }`}
                >

                  {/* CARD IMAGE */}

                  <div className="Advertizing-Banner-card-image">

                    {banner.image && (
                      <img
                        src={banner.image}
                        alt={banner.headline}
                      />
                    )}

                    <div className="Advertizing-Banner-card-image-overlay" />

                    <div
                      className={`Advertizing-Banner-status ${
                        banner.isLive
                          ? "live"
                          : "draft"
                      }`}
                    >
                      <span />
                      {banner.isLive
                        ? "LIVE"
                        : "DRAFT"}
                    </div>

                    <div className="Advertizing-Banner-card-number">
                      #{String(
                        uploadedBanners.indexOf(
                          banner
                        ) + 1
                      ).padStart(2, "0")}
                    </div>

                  </div>

                  {/* CARD CONTENT */}

                  <div className="Advertizing-Banner-card-content">

                    <span className="Advertizing-Banner-card-label">
                      ADVERTISEMENT
                    </span>

                    <h3>
                      {banner.headline}
                    </h3>

                    {banner.subline && (
                      <p className="Advertizing-Banner-card-subline">
                        {banner.subline}
                      </p>
                    )}

                    {/* POINTS */}

                    {banner.points.some(
                      (point) => point
                    ) && (
                      <div className="Advertizing-Banner-card-points">

                        {banner.points.map(
                          (point, index) =>
                            point && (
                              <div
                                key={index}
                                className="Advertizing-Banner-card-point"
                              >
                                <CheckCircle2
                                  size={14}
                                />

                                <span>
                                  {point}
                                </span>
                              </div>
                            )
                        )}

                      </div>
                    )}

                    {/* ACTIONS */}

                    <div className="Advertizing-Banner-actions">

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            banner.id!
                          )
                        }
                        className="delete"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleGoLive(
                            banner.id!
                          )
                        }
                        className={`live ${
                          banner.isLive
                            ? "active"
                            : ""
                        }`}
                      >
                        <Radio size={15} />

                        {banner.isLive
                          ? "Take Offline"
                          : "Go Live"}
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </div>
    </div>
  );
};

export default AdvertizingBanner;