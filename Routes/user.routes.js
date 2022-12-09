import { Router } from 'express';
import { authMiddleware } from '../Middleware/auth.js';
import { deleteUser, getUser, getUsers, updateUser } from '../Controller/UserController.js';
import { verifyAdmin, verifyToken, verifyUser } from '../Middleware/verify.js';
const route = Router();

route.get('/', authMiddleware, getUsers);
route.get('/:userId', authMiddleware, getUser);
route.delete('/:userId', authMiddleware, verifyUser, deleteUser);
route.put('/:userId', authMiddleware, verifyUser, updateUser);

export default route;
