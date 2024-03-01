import express, { Router } from 'express';
import { getProfileInfo, loginUser, logoutRoute, registerUser } from '../Controllers/AuthController.js';

const router: Router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfileInfo);
router.post('/logout', logoutRoute)

export default router;