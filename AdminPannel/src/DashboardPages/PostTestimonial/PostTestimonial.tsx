import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import axios from "axios";
import "./PostTestimonial.css";
import { useTheme } from "../../context/ThemeContext";
import BASE_URL from "../../Api";

import {
  FaComments,
  FaStar,
  FaRegStar,
  FaCloudUploadAlt,
  FaUser,
  FaCheckCircle,
  FaClock,
  FaTrashAlt,
  FaPaperPlane,
  FaImage,
  FaQuoteLeft,
} from "react-icons/fa";

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

  /* =====================================================
     FETCH TESTIMONIALS
  ===================================================== */

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/testimonials`);

      if (res.data.success) {
        setTestimonials(res.data.data);
      }
    } catch (err) {
      console.error("❌ Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /* =====================================================
     HANDLE INPUT
  ===================================================== */

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "image" && files) {
      setNewTestimonial({
        ...newTestimonial,
        image: files[0],
      });
    } else {
      setNewTestimonial({
        ...newTestimonial,
        [name]: value,
      });
    }
  };

  /* =====================================================
     HANDLE RATING
  ===================================================== */

  const handleRating = (rating: number) => {
    setNewTestimonial({
      ...newTestimonial,
      rating,
    });
  };

  /* =====================================================
     SUBMIT TESTIMONIAL
  ===================================================== */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!newTestimonial.name || !newTestimonial.message) {
      alert("Please fill all required fields!");
      return;
    }

    const formData = new FormData();

    formData.append("name", newTestimonial.name);
    formData.append("rating", String(newTestimonial.rating));
    formData.append("message", newTestimonial.message);

    if (newTestimonial.image) {
      formData.append("image", newTestimonial.image);
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/testimonials`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        alert("✅ Testimonial posted successfully!");

        setNewTestimonial({
          name: "",
          rating: 0,
          message: "",
          image: null,
        });

        fetchTestimonials();
      }
    } catch (err) {
      console.error("❌ Post Error:", err);
      alert("Failed to post testimonial!");
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     TOGGLE PUBLISH
  ===================================================== */

  const togglePublish = async (id?: string) => {
    if (!id) return;

    try {
      const res = await axios.patch(
        `${BASE_URL}/testimonials/${id}/publish`
      );

      if (res.data.success) {
        fetchTestimonials();
      }
    } catch (err) {
      console.error("❌ Toggle Error:", err);
    }
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const deleteTestimonial = async (id?: string) => {
    if (!id) return;

    if (
      !window.confirm(
        "Are you sure you want to delete this testimonial?"
      )
    ) {
      return;
    }

    try {
      const res = await axios.delete(
        `${BASE_URL}/testimonials/${id}`
      );

      if (res.data.success) {
        fetchTestimonials();
      }
    } catch (err) {
      console.error("❌ Delete Error:", err);
    }
  };

  /* =====================================================
     STATISTICS
  ===================================================== */

  const publishedCount = testimonials.filter(
    (testimonial) => testimonial.published
  ).length;

  const draftCount = testimonials.filter(
    (testimonial) => !testimonial.published
  ).length;

  const averageRating =
    testimonials.length > 0
      ? (
          testimonials.reduce(
            (total, testimonial) =>
              total + Number(testimonial.rating || 0),
            0
          ) / testimonials.length
        ).toFixed(1)
      : "0.0";

  /* =====================================================
     IMAGE URL
  ===================================================== */

  const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return "";

    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://")
    ) {
      return imageUrl;
    }

    return `${BASE_URL.replace("/api", "")}${imageUrl}`;
  };

  return (
    <div
      className={`postTestimonial-container ${
        theme === "dark" ? "dark" : "light"
      }`}
    >
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="postTestimonial-pageHeader">
        <div className="postTestimonial-pageHeaderLeft">
          <div className="postTestimonial-pageIcon">
            <FaComments />
          </div>

          <div>
            <span className="postTestimonial-eyebrow">
              TESTIMONIAL MANAGEMENT
            </span>

            <h1>Client Testimonials</h1>

            <p>
              Create, manage and publish customer testimonials.
            </p>
          </div>
        </div>

        <div className="postTestimonial-totalBox">
          <span>Total Reviews</span>
          <strong>{testimonials.length}</strong>
        </div>
      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="postTestimonial-stats">
        <div className="postTestimonial-statCard">
          <div className="postTestimonial-statIcon purple">
            <FaComments />
          </div>

          <div>
            <span>Total Testimonials</span>
            <strong>{testimonials.length}</strong>
            <small>Customer feedback</small>
          </div>
        </div>

        <div className="postTestimonial-statCard">
          <div className="postTestimonial-statIcon green">
            <FaCheckCircle />
          </div>

          <div>
            <span>Published</span>
            <strong>{publishedCount}</strong>
            <small>Live testimonials</small>
          </div>
        </div>

        <div className="postTestimonial-statCard">
          <div className="postTestimonial-statIcon orange">
            <FaClock />
          </div>

          <div>
            <span>Drafts</span>
            <strong>{draftCount}</strong>
            <small>Waiting to publish</small>
          </div>
        </div>

        <div className="postTestimonial-statCard">
          <div className="postTestimonial-statIcon yellow">
            <FaStar />
          </div>

          <div>
            <span>Average Rating</span>
            <strong>{averageRating}</strong>
            <small>Customer satisfaction</small>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="postTestimonial-mainGrid">
        {/* =================================================
            LEFT - CREATE TESTIMONIAL
        ================================================= */}

        <section className="postTestimonial-left">
          <div className="postTestimonial-panelHeader">
            <div className="postTestimonial-panelIcon purple">
              <FaPaperPlane />
            </div>

            <div>
              <h2>Post Testimonial</h2>

              <p>
                Add a new client testimonial to your website.
              </p>
            </div>
          </div>

          <div className="postTestimonial-divider"></div>

          <form
            className="postTestimonial-form"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div className="postTestimonial-formGroup">
              <label className="postTestimonial-label">
                <FaUser />
                Client Name
                <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                className="postTestimonial-input"
                value={newTestimonial.name}
                onChange={handleChange}
                placeholder="Enter client's full name"
                required
              />
            </div>

            {/* Upload */}
            <div className="postTestimonial-formGroup">
              <label className="postTestimonial-label">
                <FaImage />
                Client Photo
              </label>

              <label className="postTestimonial-uploadBox">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />

                <div className="postTestimonial-uploadIcon">
                  <FaCloudUploadAlt />
                </div>

                <div className="postTestimonial-uploadText">
                  <strong>
                    {newTestimonial.image
                      ? newTestimonial.image.name
                      : "Upload client photo"}
                  </strong>

                  <span>
                    PNG, JPG or WEBP • Recommended square image
                  </span>
                </div>

                <div className="postTestimonial-uploadButton">
                  Browse
                </div>
              </label>
            </div>

            {/* Rating */}
            <div className="postTestimonial-formGroup">
              <div className="postTestimonial-ratingHeader">
                <label className="postTestimonial-label">
                  <FaStar />
                  Rating
                </label>

                <span className="postTestimonial-ratingValue">
                  {newTestimonial.rating > 0
                    ? `${newTestimonial.rating}/5`
                    : "Not rated"}
                </span>
              </div>

              <div className="postTestimonial-starRating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`postTestimonial-star ${
                      star <= newTestimonial.rating
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleRating(star)}
                    aria-label={`Give ${star} star rating`}
                  >
                    {star <= newTestimonial.rating ? (
                      <FaStar />
                    ) : (
                      <FaRegStar />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="postTestimonial-formGroup">
              <label className="postTestimonial-label">
                <FaQuoteLeft />
                Testimonial Message
                <span>*</span>
              </label>

              <textarea
                name="message"
                className="postTestimonial-textarea"
                value={newTestimonial.message}
                onChange={handleChange}
                placeholder="Write the client's testimonial..."
                rows={6}
                required
              />

              <div className="postTestimonial-characterHint">
                Share a clear and authentic customer experience.
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="postTestimonial-submitBtn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="postTestimonial-spinner"></span>
                  Posting Testimonial...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Post Testimonial
                </>
              )}
            </button>
          </form>
        </section>

        {/* =================================================
            RIGHT - MANAGE TESTIMONIALS
        ================================================= */}

        <section className="postTestimonial-right">
          <div className="postTestimonial-panelHeader">
            <div className="postTestimonial-panelIcon blue">
              <FaComments />
            </div>

            <div>
              <h2>Manage Testimonials</h2>

              <p>
                Review and control published testimonials.
              </p>
            </div>
          </div>

          <div className="postTestimonial-divider"></div>

          <div className="postTestimonial-tableWrapper">
            {testimonials.length === 0 ? (
              <div className="postTestimonial-noData">
                <div className="postTestimonial-emptyIcon">
                  <FaComments />
                </div>

                <h3>No Testimonials Yet</h3>

                <p>
                  Create your first testimonial using the form.
                </p>
              </div>
            ) : (
              <div className="postTestimonial-tableScroll">
                <table className="postTestimonial-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Client</th>
                      <th>Rating</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {testimonials.map((t, index) => (
                      <tr key={t._id}>
                        {/* Number */}
                        <td>
                          <span className="postTestimonial-number">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </td>

                        {/* Client */}
                        <td>
                          <div className="postTestimonial-client">
                            {t.imageUrl ? (
                              <img
                                src={getImageUrl(t.imageUrl)}
                                alt={t.name}
                                className="postTestimonial-photo"
                              />
                            ) : (
                              <div className="postTestimonial-avatar">
                                {t.name
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>
                            )}

                            <div className="postTestimonial-clientInfo">
                              <strong>{t.name}</strong>
                              <span>Client testimonial</span>
                            </div>
                          </div>
                        </td>

                        {/* Rating */}
                        <td>
                          <div className="postTestimonial-tableRating">
                            <div className="postTestimonial-miniStars">
                              {Array.from(
                                { length: 5 },
                                (_, starIndex) =>
                                  starIndex < t.rating ? (
                                    <FaStar
                                      key={starIndex}
                                    />
                                  ) : (
                                    <FaRegStar
                                      key={starIndex}
                                    />
                                  )
                              )}
                            </div>

                            <span>{t.rating}.0</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td>
                          <span
                            className={`postTestimonial-status ${
                              t.published
                                ? "active"
                                : "inactive"
                            }`}
                          >
                            <span className="postTestimonial-statusDot"></span>

                            {t.published
                              ? "Published"
                              : "Draft"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="postTestimonial-actions">
                            <button
                              type="button"
                              className={`postTestimonial-btn ${
                                t.published
                                  ? "unpublish"
                                  : "publish"
                              }`}
                              onClick={() =>
                                togglePublish(t._id)
                              }
                            >
                              {t.published
                                ? "Unpublish"
                                : "Publish"}
                            </button>

                            <button
                              type="button"
                              className="postTestimonial-btn delete"
                              onClick={() =>
                                deleteTestimonial(t._id)
                              }
                              title="Delete testimonial"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {testimonials.length > 0 && (
            <div className="postTestimonial-tableFooter">
              <span>
                Showing{" "}
                <strong>{testimonials.length}</strong>{" "}
                testimonial
                {testimonials.length !== 1 ? "s" : ""}
              </span>

              <span className="postTestimonial-liveIndicator">
                <span></span>
                Management Active
              </span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PostTestimonial;