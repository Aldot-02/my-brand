import express, { Router } from 'express';
import { AuthenticatedUser, Logout, Refresh, loginUser, registerUser } from '../Controllers/AuthController.js';

const router: Router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/authenticated', AuthenticatedUser);
router.post('/refresh', Refresh);
router.post('/logout', Logout);

export default router;