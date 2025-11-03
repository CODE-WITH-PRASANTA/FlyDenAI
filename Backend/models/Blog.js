const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    desc: { type: String, required: true }, // HTML from TinyMCE
    author: { type: String, default: 'N/A' },
    category: { type: String, default: '' },
    tags: { type: [String], default: [] },
    popularLine: { type: String, default: '' },
    imageUrl: { type: String, default: '' }, // stored image URL
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', BlogSchema);
