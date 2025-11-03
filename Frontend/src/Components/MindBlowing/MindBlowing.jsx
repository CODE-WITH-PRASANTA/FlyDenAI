import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MindBlowing.css";
import BASE_URL from "../../Api";

const MindBlowing = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [popularBlogs, setPopularBlogs] = useState([]);

  // Dummy comments state (frontend only)
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        setError("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchPopularBlogs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/blogs`);
        setPopularBlogs(res.data.slice(0, 4)); // Show only 4 recent blogs
      } catch (err) {
        console.error("Error fetching popular blogs:", err);
      }
    };

    fetchBlog();
    fetchPopularBlogs();
  }, [id]);

  if (loading) return <p className="blog-loading">Loading blog...</p>;
  if (error) return <p className="blog-error">{error}</p>;
  if (!blog) return <p className="blog-error">Blog not found.</p>;

  return (
    <div className="blog-page">
      {/* ===== Main Blog Content ===== */}
      <main className="blog-main">
        <article className="blog-article">
          <h1 className="blog-title">{blog.title}</h1>

          <div className="blog-meta">
            <span>👤 {blog.author || "Admin"}</span>
            <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>

          {blog.imageUrl && (
            <img
              className="blog-image"
              src={`${BASE_URL.replace("/api", "")}/${blog.imageUrl.replace(
                /\\/g,
                "/"
              )}`}
              alt={blog.title}
            />
          )}

          {blog.popularLine && (
            <blockquote className="blog-quote">“{blog.popularLine}”</blockquote>
          )}

          <div
            className="blog-content-html"
            dangerouslySetInnerHTML={{ __html: blog.desc }}
          />

          <section className="blog-tags-social">
            {blog.tags?.length > 0 && (
              <div className="blog-tags">
                <h3>Related Tags</h3>
                {blog.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            )}

            <div className="blog-social">
              <h3>Share this post</h3>
              <div className="social-icons">
                {[faFacebookF, faTwitter, faInstagram, faLinkedinIn, faYoutube].map(
                  (icon, i) => (
                    <a href="#" key={i}>
                      <FontAwesomeIcon icon={icon} />
                    </a>
                  )
                )}
              </div>
            </div>
          </section>

         {/* ===== Comments Section ===== */}
      <section className="blog-comments">
        <h3>Leave a Comment</h3>
        <form
          className="comment-form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log({ name, email, comment, website });
            alert("Thank you for your comment!");
          }}
        >
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Upload Photo */}
          <div className="form-group">
            <label htmlFor="photo">Upload Photo</label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  console.log("Photo uploaded:", file.name);
                }
              }}
            />
          </div>

          {/* Message */}
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              placeholder="Write your message..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Comment
          </button>
        </form>
      </section>

        </article>
      </main>

     {/* ===== Sidebar ===== */}
          <aside className="blog-sidebar">
            <div className="sidebar-section search-box">
              <h4>Search</h4>
              <input type="text" placeholder="Search blog..." />
              <button>🔍</button>
            </div>

            <div className="sidebar-section popular-posts">
              <h4>Popular Feeds</h4>
              {popularBlogs.map((item) => (
                <div key={item._id} className="popular-item">
                  {item.imageUrl && (
                    <img
                      src={`${BASE_URL.replace("/api", "")}/${item.imageUrl.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt={item.title}
                    />
                  )}
                  <div className="popular-info">
                    <h5>{item.title.slice(0, 50)}...</h5>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ Dynamic Popular Tags (from current blog) */}
            <div className="sidebar-section tags">
              <h4>Popular Tags</h4>
              <div>
                {blog.tags && blog.tags.length > 0 ? (
                  blog.tags.map((tag, i) => (
                    <span key={i} className="tag">
                      {tag}
                    </span>
                  ))
                ) : (
                  <p className="no-tags">No tags available</p>
                )}
              </div>
            </div>
          </aside>

    </div>
  );
};

export default MindBlowing;
