const Blog = require('../models/Blog');
const fs = require('fs-extra');
const path = require('path');

// ✅ Store only relative image path (no need for buildImageUrl)
const buildImagePath = (filename) => {
  return path.join('uploads', filename);
};

// =============================
// Create Blog
// =============================
exports.createBlog = async (req, res) => {
  try {
    const { title, desc, author, category, tags, popularLine } = req.body;

    const blog = new Blog({
      title,
      desc,
      author,
      category,
      popularLine,
      tags: typeof tags === 'string'
        ? tags.split(',').map(t => t.trim()).filter(Boolean)
        : tags,
    });

    if (req.file) {
      blog.imageUrl = buildImagePath(req.file.filename); // ✅ only "uploads/filename.webp"
    }

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// =============================
// Get all blogs with optional filters
// =============================
exports.getBlogs = async (req, res) => {
  try {
    const { category, author, published } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (author) filter.author = author;
    if (published !== undefined) filter.published = published === 'true';

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Fetch blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// =============================
// Get blog by ID
// =============================
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    console.error('Get blog by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// =============================
// Update Blog
// =============================
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const { title, desc, author, category, tags, popularLine } = req.body;

    if (title) blog.title = title;
    if (desc) blog.desc = desc;
    if (author) blog.author = author;
    if (category) blog.category = category;
    if (popularLine) blog.popularLine = popularLine;
    if (tags !== undefined) {
      blog.tags = typeof tags === 'string'
        ? tags.split(',').map(t => t.trim()).filter(Boolean)
        : tags;
    }

    // ✅ Handle image replacement
    if (req.file) {
      if (blog.imageUrl) {
        const prevFilename = path.basename(blog.imageUrl);
        const prevPath = path.join(__dirname, '..', 'uploads', prevFilename);
        if (await fs.pathExists(prevPath)) await fs.remove(prevPath);
      }
      blog.imageUrl = buildImagePath(req.file.filename);
    }

    const updated = await blog.save();
    res.json(updated);
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// =============================
// Toggle publish status
// =============================
exports.togglePublish = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.published = !blog.published;
    await blog.save();

    res.json({ id: blog._id, published: blog.published });
  } catch (error) {
    console.error('Toggle publish error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// =============================
// Delete Blog (with image cleanup)
// =============================
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // ✅ Remove associated image if it exists
    if (blog.imageUrl) {
      try {
        const imageFilename = path.basename(blog.imageUrl); // extract "1762162370342-78881666.webp"
        const imagePath = path.join(__dirname, '..', 'uploads', imageFilename);

        // Check if file exists before deleting
        if (await fs.pathExists(imagePath)) {
          await fs.remove(imagePath);
          console.log(`🧹 Deleted image: ${imagePath}`);
        } else {
          console.log(`⚠️ Image file not found: ${imagePath}`);
        }
      } catch (fileError) {
        console.error('Error deleting image file:', fileError);
      }
    }

    // ✅ Finally delete the blog record from MongoDB
    await blog.deleteOne();

    res.json({ message: '✅ Blog and associated image deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// =============================
// Get only published blogs (for frontend/public)
// =============================
exports.getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Fetch published blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// =============================
// Get latest N published blogs
// =============================
exports.getLatestPublishedBlogs = async (req, res) => {
  try {
    const count = parseInt(req.params.count) || 3; // default: 3 blogs
    const blogs = await Blog.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(count);
    res.json(blogs);
  } catch (error) {
    console.error("Fetch latest published blogs error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
