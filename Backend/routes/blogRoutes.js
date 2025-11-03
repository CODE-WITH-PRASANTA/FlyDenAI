const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { upload, convertToWebp } = require('../middleware/upload');

// Create blog (with image)
router.post('/', upload.single('image'), convertToWebp, blogController.createBlog);

// Get all blogs (for admin)
router.get('/', blogController.getBlogs);

// Get only published blogs (for public view)
router.get('/published', blogController.getPublishedBlogs);

// Get single blog
router.get('/:id', blogController.getBlogById);

// Update blog (with optional new image)
router.put('/:id', upload.single('image'), convertToWebp, blogController.updateBlog);

// Toggle publish status
router.patch('/:id/publish', blogController.togglePublish);

// Delete blog
router.delete('/:id', blogController.deleteBlog);

// Get latest N published blogs (e.g. /blogs/published/latest/5)
router.get('/published/latest/:count', blogController.getLatestPublishedBlogs);


module.exports = router;
