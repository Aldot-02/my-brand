import express, { Router } from 'express';
import { deleteUser, getAllUsers, getUser, updateUser } from '../Controllers/UserController.js';

const router: Router = express.Router();

router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getAllUsers);

export default router;