import React, { useState, ChangeEvent } from "react";
import "./AdvertizingBanner.css";

interface BannerData {
  id?: number;
  headline: string;
  subline: string;
  points: string[];
  image: string | null;
  isLive?: boolean;
}

const AdvertizingBanner: React.FC = () => {
  const [bannerData, setBannerData] = useState<BannerData>({
    headline: "",
    subline: "",
    points: ["", "", ""],
    image: null,
  });

  const [uploadedBanners, setUploadedBanners] = useState<BannerData[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBannerData({ ...bannerData, [name]: value });
  };

  const handlePointChange = (index: number, value: string) => {
    const updatedPoints = [...bannerData.points];
    updatedPoints[index] = value;
    setBannerData({ ...bannerData, points: updatedPoints });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerData({ ...bannerData, image: imageUrl });
    }
  };

  const handlePost = () => {
    if (!bannerData.image || !bannerData.headline) {
      alert("Please fill all required fields");
      return;
    }

    const newBanner = { ...bannerData, id: Date.now(), isLive: false };
    setUploadedBanners([...uploadedBanners, newBanner]);
    setBannerData({ headline: "", subline: "", points: ["", "", ""], image: null });
  };

  const handleDelete = (id: number) => {
    setUploadedBanners(uploadedBanners.filter((b) => b.id !== id));
  };

  const handleGoLive = (id: number) => {
    setUploadedBanners((prev) =>
      prev.map((banner) =>
        banner.id === id ? { ...banner, isLive: !banner.isLive } : banner
      )
    );
  };

  return (
    <div className="Advertizing-Banner-container">
      {/* LEFT SECTION */}
      <div className="Advertizing-Banner-left">
        <h2 className="Advertizing-Banner-heading">🎯 Upload Advertisement Banner</h2>

        <div className="Advertizing-Banner-upload">
          {bannerData.image ? (
            <div className="Advertizing-Banner-preview">
              <img src={bannerData.image} alt="Preview" />
              <button
                className="Advertizing-Banner-remove-img"
                onClick={() => setBannerData({ ...bannerData, image: null })}
              >
                ✖ Remove
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
              <span>📁 Choose Banner Image</span>
            </label>
          )}
        </div>

        <div className="Advertizing-Banner-field">
          <label>Headline</label>
          <input
            type="text"
            name="headline"
            value={bannerData.headline}
            onChange={handleChange}
            placeholder="Enter banner headline..."
          />
        </div>

        <div className="Advertizing-Banner-field">
          <label>Subline</label>
          <textarea
            name="subline"
            value={bannerData.subline}
            onChange={handleChange}
            placeholder="Enter banner subline..."
            rows={3}
          ></textarea>
        </div>

        <div className="Advertizing-Banner-field">
          <label>3 Key Points</label>
          {bannerData.points.map((point, index) => (
            <input
              key={index}
              type="text"
              value={point}
              onChange={(e) => handlePointChange(index, e.target.value)}
              placeholder={`Point ${index + 1}`}
            />
          ))}
        </div>

        <button onClick={handlePost} className="Advertizing-Banner-post-btn">
          🚀 Post Banner
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div className="Advertizing-Banner-right">
        <h2 className="Advertizing-Banner-heading">📢 Uploaded Banners</h2>

        {uploadedBanners.length === 0 ? (
          <p className="Advertizing-Banner-empty">No banners uploaded yet.</p>
        ) : (
          <div className="Advertizing-Banner-grid">
            {uploadedBanners.map((banner) => (
              <div
                key={banner.id}
                className={`Advertizing-Banner-card ${
                  banner.isLive ? "Advertizing-Banner-live" : ""
                }`}
              >
                {banner.image && <img src={banner.image} alt="Banner" />}
                <div className="Advertizing-Banner-card-content">
                  <h3>{banner.headline}</h3>
                  <p>{banner.subline}</p>
                  <ul>
                    {banner.points.map(
                      (p, i) => p && <li key={i}>{p}</li>
                    )}
                  </ul>
                  <div className="Advertizing-Banner-actions">
                    <button onClick={() => handleDelete(banner.id!)} className="delete">
                      🗑 Delete
                    </button>
                    <button
                      onClick={() => handleGoLive(banner.id!)}
                      className={`live ${banner.isLive ? "active" : ""}`}
                    >
                      {banner.isLive ? "🟢 Live" : "Go Live"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertizingBanner;
