import express, { Router } from 'express';
import { createBlog, deleteBlog, getAllBlogs, getBlog, likeBlog, updateBlog } from '../Controllers/BlogsController.js';

const router: Router = express.Router();

router.post('/', createBlog);
router.get('/all', getAllBlogs);
router.get('/:id', getBlog);
router.patch('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.patch('/:id/like', likeBlog);

export default router;