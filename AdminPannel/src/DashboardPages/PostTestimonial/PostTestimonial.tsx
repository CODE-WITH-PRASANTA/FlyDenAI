import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./PostTestimonial.css";
import { useTheme } from "../../context/ThemeContext";
import BASE_URL from "../../Api";

interface Testimonial {
  _id?: string;
  name: string;
  rating: number;
  message: string;
  imageUrl?: string;
  published: boolean;
}

const PostTestimonial: React.FC = () => {
  const { theme } = useTheme();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    rating: 0,
    message: "",
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all testimonials
  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/testimonials`);
      if (res.data.success) setTestimonials(res.data.data);
    } catch (err) {
      console.error("❌ Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ✅ Handle Input
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files) {
      setNewTestimonial({ ...newTestimonial, image: files[0] });
    } else {
      setNewTestimonial({ ...newTestimonial, [name]: value });
    }
  };

  // ✅ Handle Rating
  const handleRating = (rating: number) => {
    setNewTestimonial({ ...newTestimonial, rating });
  };

  // ✅ Submit Form (POST)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.message) {
      alert("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", newTestimonial.name);
    formData.append("rating", String(newTestimonial.rating));
    formData.append("message", newTestimonial.message);
    if (newTestimonial.image) formData.append("image", newTestimonial.image);

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/testimonials`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("✅ Testimonial posted successfully!");
        setNewTestimonial({ name: "", rating: 0, message: "", image: null });
        fetchTestimonials();
      }
    } catch (err) {
      console.error("❌ Post Error:", err);
      alert("Failed to post testimonial!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Toggle Publish
  const togglePublish = async (id?: string) => {
    if (!id) return;
    try {
      const res = await axios.patch(`${BASE_URL}/testimonials/${id}/publish`);
      if (res.data.success) {
        fetchTestimonials();
      }
    } catch (err) {
      console.error("❌ Toggle Error:", err);
    }
  };

  // ✅ Delete Testimonial
  const deleteTestimonial = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Are you sure to delete this testimonial?")) return;

    try {
      const res = await axios.delete(`${BASE_URL}/testimonials/${id}`);
      if (res.data.success) {
        fetchTestimonials();
      }
    } catch (err) {
      console.error("❌ Delete Error:", err);
    }
  };

  return (
    <div className={`postTestimonial-container ${theme}`}>
      {/* Left Panel */}
      <div className="postTestimonial-left">
        <h2 className="postTestimonial-title">💬 Post a New Testimonial</h2>
        <form className="postTestimonial-form" onSubmit={handleSubmit}>
          <div className="postTestimonial-formGroup">
            <label className="postTestimonial-label">Name *</label>
            <input
              type="text"
              name="name"
              className="postTestimonial-input"
              value={newTestimonial.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="postTestimonial-formGroup">
            <label className="postTestimonial-label">Upload Photo</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="postTestimonial-fileInput"
              onChange={handleChange}
            />
          </div>

          <div className="postTestimonial-formGroup">
            <label className="postTestimonial-label">Rating</label>
            <div className="postTestimonial-starRating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`postTestimonial-star ${
                    star <= newTestimonial.rating ? "active" : ""
                  }`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="postTestimonial-formGroup">
            <label className="postTestimonial-label">Your Message *</label>
            <textarea
              name="message"
              className="postTestimonial-textarea"
              value={newTestimonial.message}
              onChange={handleChange}
              placeholder="Write your testimonial..."
              rows={4}
              required
            />
          </div>

          <button type="submit" className="postTestimonial-submitBtn" disabled={loading}>
            {loading ? "⏳ Posting..." : "🚀 Post Testimonial"}
          </button>
        </form>
      </div>

      {/* Right Panel */}
      <div className="postTestimonial-right">
        <h2 className="postTestimonial-title">📋 Manage Testimonials</h2>
        <div className="postTestimonial-tableWrapper">
          {testimonials.length === 0 ? (
            <p className="postTestimonial-noData">No testimonials yet 💬</p>
          ) : (
            <table className="postTestimonial-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t, index) => (
                  <tr key={t._id}>
                    <td>{index + 1}</td>
                    <td>
                      {t.imageUrl ? (
                        <img
                          src={`${BASE_URL.replace("/api", "")}${t.imageUrl}`}
                          alt={t.name}
                          className="postTestimonial-photo"
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>{t.name}</td>
                    <td>
                      {"★".repeat(t.rating)}
                      {"☆".repeat(5 - t.rating)}
                    </td>
                    <td>
                      <span
                        className={`postTestimonial-status ${
                          t.published ? "active" : "inactive"
                        }`}
                      >
                        {t.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="postTestimonial-actions">
                      <button
                        className={`postTestimonial-btn ${
                          t.published ? "unpublish" : "publish"
                        }`}
                        onClick={() => togglePublish(t._id)}
                      >
                        {t.published ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        className="postTestimonial-btn delete"
                        onClick={() => deleteTestimonial(t._id)}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostTestimonial;
