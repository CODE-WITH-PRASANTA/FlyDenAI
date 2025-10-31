import React, { useState, ChangeEvent, FormEvent } from "react";
import "./BlogPosting.css";

interface Blog {
  id: number;
  title: string;
  desc: string;
  author: string;
  category: string;
  tags: string;
  popularLine: string;
  image?: File | null;
  imageUrl?: string;
  published: boolean;
}

const BlogPosting: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [newBlog, setNewBlog] = useState<Omit<Blog, "id" | "published" | "imageUrl">>({
    title: "",
    desc: "",
    author: "",
    category: "",
    tags: "",
    popularLine: "",
    image: null,
  });

  const categories = ["Technology", "Web Development", "Design", "Marketing", "Business"];

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.desc) {
      alert("Please fill all required fields!");
      return;
    }

    const newEntry: Blog = {
      ...newBlog,
      id: Date.now(),
      published: false,
      imageUrl: newBlog.image ? URL.createObjectURL(newBlog.image) : "",
    };

    setBlogs((prev) => [...prev, newEntry]);
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

  const togglePublish = (id: number) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, published: !b.published } : b))
    );
  };

  const deleteBlog = (id: number) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="blogAdmin-container">
      {/* Left Side - Create Blog */}
      <div className="blogAdmin-leftPanel">
        <h2 className="blogAdmin-heading">📝 Create a New Blog</h2>
        <form className="blogAdmin-form" onSubmit={handleSubmit}>
          {/* Blog Title */}
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
            <textarea
              name="desc"
              value={newBlog.desc}
              onChange={handleChange}
              placeholder="Write an engaging description..."
              rows={5}
              required
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
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
         <div className="form-group">
          <label>Tags</label>
          <div className="tags-input-container">
            {newBlog.tags
              .split(",")
              .filter((tag) => tag.trim() !== "")
              .map((tag, index) => (
                <span key={index} className="tag-item">
                  {tag.trim()}
                  <button
                    type="button"
                    className="tag-remove-btn"
                    onClick={() => {
                      const updatedTags = newBlog.tags
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

            {/* Editable input for typing new tags */}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "," || e.key === "Enter") {
                  e.preventDefault();
                  const newTag = tagInput.trim();
                  if (newTag && !newBlog.tags.split(",").includes(newTag)) {
                    setNewBlog({
                      ...newBlog,
                      tags: newBlog.tags
                        ? `${newBlog.tags},${newTag}`
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


          {/* Popular Line */}
          <div className="form-group">
            <label>Popular Line</label>
            <textarea
              name="popularLine"
              value={newBlog.popularLine}
              onChange={handleChange}
              placeholder="Enter catchy one-liner or short intro..."
              rows={3}
              className="popular-textarea"
            />
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="blogAdmin-submitBtn">
            🚀 Publish Blog
          </button>
        </form>
      </div>

      {/* Right Side - Manage Blogs */}
      <div className="blogAdmin-rightPanel">
        <h2 className="blogAdmin-heading">📚 Manage Blogs</h2>
        <div className="blogAdmin-tableWrapper">
          {blogs.length === 0 ? (
            <p className="noData">
              No blogs posted yet. Start writing your first one ✍️
            </p>
          ) : (
            <table className="blogAdmin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>{index + 1}</td>
                 <td>
                    {blog.title.length > 60 ? blog.title.slice(0, 60) + "..." : blog.title}
                  </td>

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
                        className={`action-btn ${
                          blog.published ? "unpublish" : "publish"
                        }`}
                        onClick={() => togglePublish(blog.id)}
                      >
                        {blog.published ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => deleteBlog(blog.id)}
                      >
                        Delete
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
