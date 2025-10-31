import React, { useState, ChangeEvent, FormEvent } from "react";
import "./PostTestimonial.css";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  message: string;
  image?: File | null;
  imageUrl?: string;
  published: boolean;
}

const PostTestimonial: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newTestimonial, setNewTestimonial] = useState<
    Omit<Testimonial, "id" | "published" | "imageUrl">
  >({
    name: "",
    rating: 0,
    message: "",
    image: null,
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files) {
      setNewTestimonial({ ...newTestimonial, image: files[0] });
    } else {
      setNewTestimonial({ ...newTestimonial, [name]: value });
    }
  };

  // Handle star rating
  const handleRating = (rating: number) => {
    setNewTestimonial({ ...newTestimonial, rating });
  };

  // Handle submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.message) {
      alert("Please fill all fields!");
      return;
    }

    const newEntry: Testimonial = {
      ...newTestimonial,
      id: Date.now(),
      published: false,
      imageUrl: newTestimonial.image ? URL.createObjectURL(newTestimonial.image) : "",
    };

    setTestimonials((prev) => [...prev, newEntry]);
    setNewTestimonial({
      name: "",
      rating: 0,
      message: "",
      image: null,
    });
  };

  // Toggle publish
  const togglePublish = (id: number) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, published: !t.published } : t))
    );
  };

  // Delete testimonial
  const deleteTestimonial = (id: number) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="postTestimonial-container">
      {/* Left Panel */}
      <div className="postTestimonial-left">
        <h2 className="postTestimonial-title">💬 Post a New Testimonial</h2>
        <form className="postTestimonial-form" onSubmit={handleSubmit}>
          {/* Name */}
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

          {/* Upload Photo */}
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

          {/* Star Rating */}
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

          {/* Message */}
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

          {/* Submit */}
          <button type="submit" className="postTestimonial-submitBtn">
            🚀 Post Testimonial
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
                  <tr key={t.id}>
                    <td>{index + 1}</td>
                    <td>
                      {t.imageUrl ? (
                        <img
                          src={t.imageUrl}
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
                        onClick={() => togglePublish(t.id)}
                      >
                        {t.published ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        className="postTestimonial-btn delete"
                        onClick={() => deleteTestimonial(t.id)}
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
