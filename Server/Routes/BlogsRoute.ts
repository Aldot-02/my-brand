import express, { Router } from 'express';
import { createBlog, deleteBlog, getBlog, updateBlog } from '../Controllers/BlogsController.js';

const router: Router = express.Router();

router.post('/', createBlog);
router.get('/:id', getBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;