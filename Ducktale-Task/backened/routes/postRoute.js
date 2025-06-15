const express = require('express');
const router = express.Router();
const { protect } = require('../Middleware/authMiddleware');
const { createBlog, getBlogs,getBlogById,  updateBlog, deleteBlog } = require('../Controller/PostController');

router.post('/create', protect, createBlog);
router.get('/', getBlogs);
router.get('/get/:id', getBlogById);
router.put('/update/:id', protect, updateBlog);
router.delete('/delete/:id', protect, deleteBlog);

module.exports = router;