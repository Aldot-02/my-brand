import express, { Router } from 'express';
import { createBlog, deleteBlog, getBlog, likeBlog, updateBlog } from '../Controllers/BlogsController.js';

const router: Router = express.Router();

router.post('/', createBlog);
router.get('/:id', getBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.put('/:id/like', likeBlog);

export default router;