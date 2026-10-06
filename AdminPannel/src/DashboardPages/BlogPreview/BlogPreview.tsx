import React, { useState } from "react";
import "./BlogPreview.css";
import {
  EyeIcon,
  Upload,
  XCircle,
  Trash2,
  User,
  FolderOpen,
  ArrowUpRight,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface Blog {
  id: number;
  title: string;
  desc: string;
  author: string;
  category: string;
  tags: string[];
  popularLine: string;
  imageUrl: string;
  published: boolean;
}

const BlogPreview: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: 1,
      title: "Mastering React Hooks in 2025",
      desc: "Explore how React hooks revolutionize component state and lifecycle management.",
      author: "John Doe",
      category: "Web Development",
      tags: ["React", "Hooks", "Frontend"],
      popularLine: "React Hooks are the heart of modern React!",
      imageUrl: "https://via.placeholder.com/350x220",
      published: true,
    },
    {
      id: 2,
      title: "Design Thinking for Developers",
      desc: "How to use design thinking principles to craft better user experiences.",
      author: "Sarah Lee",
      category: "Design",
      tags: ["UI/UX", "Creativity", "Teamwork"],
      popularLine: "Design is not just art — it’s how it works!",
      imageUrl: "https://via.placeholder.com/350x220",
      published: false,
    },
    {
      id: 3,
      title: "The Future of AI-Powered Web Apps",
      desc: "Integrating artificial intelligence into modern web experiences.",
      author: "Alex Smith",
      category: "Technology",
      tags: ["AI", "Machine Learning", "Web"],
      popularLine: "AI is not coming — it’s already here!",
      imageUrl: "https://via.placeholder.com/350x220",
      published: true,
    },
  ]);

  const togglePublish = (id: number) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id
          ? { ...blog, published: !blog.published }
          : blog
      )
    );
  };

  const deleteBlog = (id: number) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    }
  };

  const publishedCount = blogs.filter((blog) => blog.published).length;
  const draftCount = blogs.filter((blog) => !blog.published).length;

  return (
    <div className="blogPreview-container">

      {/* =========================
          HEADER
      ========================== */}
      <div className="blogPreview-header">

        <div className="blogPreview-header-left">
          <div className="blogPreview-header-icon">
            <BookOpen size={25} />
          </div>

          <div>
            <span className="blogPreview-eyebrow">
              CONTENT MANAGEMENT
            </span>

            <h1 className="blogPreview-heading">
              Blog Preview
            </h1>

            <p className="blogPreview-subtitle">
              Preview, publish and manage your blog content.
            </p>
          </div>
        </div>

        <div className="blogPreview-header-badge">
          <Sparkles size={16} />
          <span>{blogs.length} Total Blogs</span>
        </div>

      </div>

      {/* =========================
          STATS
      ========================== */}
      <div className="blogPreview-stats">

        <div className="blogPreview-stat-card">
          <div className="blogPreview-stat-icon total">
            <BookOpen size={20} />
          </div>

          <div className="blogPreview-stat-content">
            <span>Total Blogs</span>
            <strong>{blogs.length}</strong>
          </div>
        </div>

        <div className="blogPreview-stat-card">
          <div className="blogPreview-stat-icon published">
            <Upload size={20} />
          </div>

          <div className="blogPreview-stat-content">
            <span>Published</span>
            <strong>{publishedCount}</strong>
          </div>
        </div>

        <div className="blogPreview-stat-card">
          <div className="blogPreview-stat-icon draft">
            <XCircle size={20} />
          </div>

          <div className="blogPreview-stat-content">
            <span>Drafts</span>
            <strong>{draftCount}</strong>
          </div>
        </div>

      </div>

      {/* =========================
          BLOG GRID
      ========================== */}
      {blogs.length > 0 ? (
        <div className="blogPreview-grid">

          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="blogPreview-card"
            >

              {/* IMAGE */}
              <div className="blogPreview-img">

                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                />

                <div className="blogPreview-image-overlay" />

                <div
                  className={`blogPreview-status ${
                    blog.published
                      ? "published"
                      : "draft"
                  }`}
                >
                  <span className="blogPreview-status-dot" />

                  {blog.published
                    ? "Published"
                    : "Draft"}
                </div>

                <div className="blogPreview-category">
                  <FolderOpen size={13} />
                  {blog.category}
                </div>

                <button
                  className="blogPreview-image-view"
                  type="button"
                  aria-label="Preview blog"
                >
                  <EyeIcon size={17} />
                </button>

              </div>

              {/* CONTENT */}
              <div className="blogPreview-content">

                <div className="blogPreview-content-top">

                  <span className="blogPreview-small-label">
                    FEATURED ARTICLE
                  </span>

                  <h3 className="blogPreview-title">
                    {blog.title}
                  </h3>

                </div>

                <div className="blogPreview-popular-box">
                  <Sparkles size={15} />

                  <p className="blogPreview-popular">
                    {blog.popularLine}
                  </p>
                </div>

                <p className="blogPreview-desc">
                  {blog.desc}
                </p>

                {/* META */}
                <div className="blogPreview-meta">

                  <div className="blogPreview-meta-item">
                    <span className="blogPreview-meta-icon">
                      <User size={14} />
                    </span>

                    <div>
                      <small>Author</small>
                      <strong>{blog.author}</strong>
                    </div>
                  </div>

                  <div className="blogPreview-meta-item">
                    <span className="blogPreview-meta-icon">
                      <FolderOpen size={14} />
                    </span>

                    <div>
                      <small>Category</small>
                      <strong>{blog.category}</strong>
                    </div>
                  </div>

                </div>

                {/* TAGS */}
                <div className="blogPreview-tags">

                  {blog.tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="tag"
                    >
                      #{tag}
                    </span>
                  ))}

                </div>

              </div>

              {/* ACTIONS */}
              <div className="blogPreview-actions">

                <button
                  type="button"
                  className={`blogPreview-action-btn publish-btn ${
                    blog.published
                      ? "unpublish"
                      : "publish"
                  }`}
                  onClick={() =>
                    togglePublish(blog.id)
                  }
                >
                  {blog.published ? (
                    <>
                      <XCircle size={16} />
                      <span>Unpublish</span>
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      <span>Publish</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="blogPreview-action-btn view-btn"
                >
                  <EyeIcon size={16} />
                  <span>View</span>

                  <ArrowUpRight
                    size={14}
                    className="blogPreview-arrow"
                  />
                </button>

                <button
                  type="button"
                  className="blogPreview-action-btn delete-btn"
                  onClick={() =>
                    deleteBlog(blog.id)
                  }
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>

              </div>

            </article>
          ))}

        </div>
      ) : (
        <div className="blogPreview-empty">

          <div className="blogPreview-empty-icon">
            <BookOpen size={34} />
          </div>

          <h3>No Blogs Available</h3>

          <p>
            There are currently no blog posts available
            to preview.
          </p>

        </div>
      )}

    </div>
  );
};

export default BlogPreview;