import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import "./BlogPosting.css";
import { useTheme } from "../../context/ThemeContext";
import { FaSun, FaMoon, FaEdit, FaTrash } from "react-icons/fa";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import BASE_URL from "../../Api";

interface Blog {
  _id?: string;
  title: string;
  desc: string;
  author: string;
  category: string;
  tags: string | string[]; 
  popularLine: string;
  image?: File | null;
  imageUrl?: string;
  published?: boolean;
}

const BlogPosting: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [newBlog, setNewBlog] = useState<Omit<Blog, "_id">>({
    title: "",
    desc: "",
    author: "",
    category: "",
    tags: "",
    popularLine: "",
    image: null,
  });

  const categories = [
    "Technology",
    "Web Development",
    "Design",
    "Marketing",
    "Business",
  ];

  // ✅ Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error("Fetch blogs failed:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files) {
      setNewBlog({ ...newBlog, image: files[0] });
    } else {
      setNewBlog({ ...newBlog, [name]: value });
    }
  };

  // ✅ Submit or Update blog
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.desc) {
      alert("Please fill all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("desc", newBlog.desc);
    formData.append("author", newBlog.author);
    formData.append("category", newBlog.category);
    formData.append(
      "tags",
      typeof newBlog.tags === "string" ? newBlog.tags : newBlog.tags.join(",")
    );
    formData.append("popularLine", newBlog.popularLine);
    if (newBlog.image) formData.append("image", newBlog.image);

    try {
      setLoading(true);
      if (editMode && editId) {
        await axios.put(`${BASE_URL}/blogs/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Blog updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/blogs`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Blog created successfully!");
      }

      setNewBlog({
        title: "",
        desc: "",
        author: "",
        category: "",
        tags: "",
        popularLine: "",
        image: null,
      });
      setEditMode(false);
      setEditId(null);
      fetchBlogs();
    } catch (err) {
      console.error("Blog submission failed:", err);
      alert("❌ Failed to submit blog!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit blog
  const handleEdit = (blog: Blog) => {
    setEditMode(true);
    setEditId(blog._id || null);
    setNewBlog({
      title: blog.title,
      desc: blog.desc,
      author: blog.author,
      category: blog.category,
      // ✅ Fix: safely convert array → string
      tags: Array.isArray(blog.tags) ? blog.tags.join(",") : blog.tags || "",
      popularLine: blog.popularLine,
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Cancel edit
  const cancelEdit = () => {
    setEditMode(false);
    setEditId(null);
    setNewBlog({
      title: "",
      desc: "",
      author: "",
      category: "",
      tags: "",
      popularLine: "",
      image: null,
    });
  };

  // ✅ Toggle publish/unpublish
  const togglePublish = async (id?: string) => {
    if (!id) return;
    try {
      const res = await axios.patch(`${BASE_URL}/blogs/${id}/publish`);
      setBlogs((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, published: res.data.published } : b
        )
      );
    } catch (err) {
      console.error("Toggle publish failed:", err);
    }
  };

  // ✅ Delete blog
  const deleteBlog = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${BASE_URL}/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete blog failed:", err);
    }
  };

  return (
    <div className={`blogAdmin-container ${theme}`}>
      {/* Theme Toggle */}
      <div className="theme-toggle-container">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>

      {/* Left Side: Blog Creation / Edit */}
      <div className="blogAdmin-leftPanel">
        <h2 className="blogAdmin-heading">
          {editMode ? "✏️ Edit Blog" : "📝 Create a New Blog"}
        </h2>

        <form className="blogAdmin-form" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label>Blog Title *</label>
            <input
              type="text"
              name="title"
              value={newBlog.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Blog Description *</label>
            <Editor
              apiKey="osnm6yw158o1eaimm0d04yws6sueiubjcuj4i4axh4ulv81i"
              value={newBlog.desc}
              onEditorChange={(newValue) =>
                setNewBlog({ ...newBlog, desc: newValue })
              }
              init={{
                height: 400,
                menubar: true,
                branding: false,
                toolbar_sticky: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help",
                skin: theme === "dark" ? "oxide-dark" : "oxide",
                content_css: theme === "dark" ? "dark" : "default",
              }}
            />
          </div>

          {/* Author */}
          <div className="form-group">
            <label>Author Name</label>
            <input
              type="text"
              name="author"
              value={newBlog.author}
              onChange={handleChange}
              placeholder="Enter author name"
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={newBlog.category}
              onChange={handleChange}
              className="blogAdmin-select"
            >
              <option value="">-- Choose Category --</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="form-group">
            <label>Tags</label>
            <div className="tags-input-container">
              {(typeof newBlog.tags === "string"
                ? newBlog.tags
                : newBlog.tags.join(",")
              )
                .split(",")
                .filter((tag) => tag.trim() !== "")
                .map((tag, index) => (
                  <span key={index} className="tag-item">
                    {tag.trim()}
                    <button
                      type="button"
                      className="tag-remove-btn"
                      onClick={() => {
                        const updatedTags = (
                          typeof newBlog.tags === "string"
                            ? newBlog.tags
                            : newBlog.tags.join(",")
                        )
                          .split(",")
                          .filter((t) => t.trim() !== tag.trim())
                          .join(",");
                        setNewBlog({ ...newBlog, tags: updatedTags });
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "," || e.key === "Enter") {
                    e.preventDefault();
                    const newTag = tagInput.trim();
                    const currentTags =
                      typeof newBlog.tags === "string"
                        ? newBlog.tags
                        : newBlog.tags.join(",");
                    if (newTag && !currentTags.split(",").includes(newTag)) {
                      setNewBlog({
                        ...newBlog,
                        tags: currentTags
                          ? `${currentTags},${newTag}`
                          : newTag,
                      });
                    }
                    setTagInput("");
                  }
                }}
                placeholder="Type a tag and press Enter or comma"
                className="tags-input"
              />
            </div>
          </div>

          {/* Popular line */}
          <div className="form-group">
            <label>Popular Line</label>
            <textarea
              name="popularLine"
              value={newBlog.popularLine}
              onChange={handleChange}
              placeholder="Enter catchy one-liner..."
              rows={3}
              className="popular-textarea"
            />
          </div>

          {/* Image */}
          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

         <div className="form-buttons">
  <button
    type="submit"
    className={`blogAdmin-submitBtn ${editMode ? "update-mode" : ""}`}
    disabled={loading}
  >
    {loading
      ? editMode
        ? "Updating..."
        : "Posting..."
      : editMode
      ? "💾 Update Blog"
      : "🚀 Publish Blog"}
  </button>

  {editMode && (
    <button
      type="button"
      className="cancel-edit-btn"
      onClick={cancelEdit}
    >
      ❌ Cancel Edit
    </button>
  )}
</div>

        </form>
      </div>

      {/* Right Side: Manage Blogs */}
      <div className="blogAdmin-rightPanel">
        <h2 className="blogAdmin-heading">📚 Manage Blogs</h2>
        <div className="blogAdmin-tableWrapper">
          {blogs.length === 0 ? (
            <p className="noData">No blogs yet. Start writing ✍️</p>
          ) : (
            <table className="blogAdmin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={blog._id}>
                    <td>{index + 1}</td>
                    <td>{blog.title}</td>
                    <td>{blog.author || "N/A"}</td>
                    <td>{blog.category || "N/A"}</td>
                    <td>
                      <span
                        className={`status ${
                          blog.published ? "active" : "inactive"
                        }`}
                      >
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </td>
                   <td className="actions">
                        <button
                          className="action-btn edit-btn"
                          onClick={() => handleEdit(blog)}
                          title="Edit Blog"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className={`action-btn ${
                            blog.published ? "unpublish-btn" : "publish-btn"
                          }`}
                          onClick={() => togglePublish(blog._id)}
                        >
                          {blog.published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => deleteBlog(blog._id)}
                          title="Delete Blog"
                        >
                          <FaTrash />
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

export default BlogPosting;
