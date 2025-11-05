import React, { useState } from "react";
import "./BlogPreview.css";
import { EyeIcon, Upload, XCircle, Trash2 } from "lucide-react";

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
      prev.map((b) =>
        b.id === id ? { ...b, published: !b.published } : b
      )
    );
  };

  const deleteBlog = (id: number) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="blogPreview-container">
      <h2 className="blogPreview-heading">📖 Blog Preview Dashboard</h2>
      <div className="blogPreview-grid">
        {blogs.map((blog) => (
          <div key={blog.id} className="blogPreview-card">
            <div className="blogPreview-img">
              <img src={blog.imageUrl} alt={blog.title} />
              <div className="blogPreview-status">
                {blog.published ? "Published" : "Draft"}
              </div>
            </div>

            <div className="blogPreview-content">
              <h3>{blog.title}</h3>
              <p className="blogPreview-popular">{blog.popularLine}</p>
              <p className="blogPreview-desc">{blog.desc}</p>

              <div className="blogPreview-meta">
                <span>👤 {blog.author}</span>
                <span>📂 {blog.category}</span>
              </div>

              <div className="blogPreview-tags">
                {blog.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="blogPreview-actions">
              <button
                className={`publish-btn ${
                  blog.published ? "unpublish" : "publish"
                }`}
                onClick={() => togglePublish(blog.id)}
              >
                {blog.published ? (
                  <>
                    <XCircle size={16} /> Unpublish
                  </>
                ) : (
                  <>
                    <Upload size={16} /> Publish
                  </>
                )}
              </button>

              <button className="view-btn">
                <EyeIcon size={16} /> View
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteBlog(blog.id)}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPreview;
