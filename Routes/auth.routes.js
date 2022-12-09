import { Router } from 'express';
import { register, login, logout, refresh } from '../Controller/AuthController.js';
import { authMiddleware } from '../Middleware/auth.js';
const route = Router();
route.post('/register', register);
route.post('/login', login);
route.post('/logout', authMiddleware, logout);
route.post('/refresh', authMiddleware, refresh);

export default route;
