import React, { useState } from "react";
import { FaTrashAlt, FaUpload, FaGlobe, FaBan } from "react-icons/fa";
import "./MediaUpload.css";

interface MediaItem {
  id: number;
  photo: string;
  published: boolean;
  category?: string;
}

const MediaUpload: React.FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handlePost = () => {
    if (!photo || !category) {
      alert("Please upload photo & select category");
      return;
    }
    const newItem: MediaItem = {
      id: Date.now(),
      photo: URL.createObjectURL(photo),
      published: false,
      category,
    };
    setMediaList((prev) => [...prev, newItem]);
    setPhoto(null);
    setCategory("");
  };

  const handleDelete = (id: number) => {
    setMediaList((prev) => prev.filter((item) => item.id !== id));
  };

  const togglePublish = (id: number) => {
    setMediaList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, published: !item.published } : item
      )
    );
  };

  return (
    <div className="mediaupload-container">
      {/* LEFT SIDE */}
      <div className="mediaupload-left">
        <h2>Upload New Photo</h2>

        <div className="mediaupload-field">
          <label>Upload Photo</label>
          <input type="file" accept="image/*" onChange={handleUpload} />
        </div>

        <div className="mediaupload-field">
          <label>Photo Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Nature">Nature</option>
            <option value="People">People</option>
          </select>
        </div>

        <button className="mediaupload-btn" onClick={handlePost}>
          <FaUpload size={16} /> Post Photo
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="mediaupload-right">
        <div className="mediaupload-right-header">
          <h2>📸 Uploaded Media</h2>
          <p>Manage your uploaded photos. Publish, unpublish, or delete anytime.</p>
        </div>

        <div className="mediaupload-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Sl.no</th>
                <th>Photo</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mediaList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="no-data">
                    No media uploaded yet.
                  </td>
                </tr>
              ) : (
                mediaList.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={item.photo} alt={`upload-${index}`} />
                    </td>
                    <td>{item.category ?? "—"}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          item.published ? "published" : "unpublished"
                        }`}
                      >
                        {item.published ? "Published" : "Unpublished"}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <button
                        className="publish-btn"
                        onClick={() => togglePublish(item.id)}
                      >
                        {item.published ? (
                          <>
                            <FaBan size={14} /> Unpublish
                          </>
                        ) : (
                          <>
                            <FaGlobe size={14} /> Publish
                          </>
                        )}
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaTrashAlt size={14} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;
