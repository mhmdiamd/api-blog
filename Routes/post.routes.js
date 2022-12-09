import { Router } from 'express';
import { createPost, deletePost, getPost, getPosts, updatePost } from '../Controller/PostController.js';
import { verifyToken, verifyUser } from '../Middleware/verify.js';
const route = Router();

route.post('/', verifyToken, createPost);
route.get('/', getPosts);
route.get('/:slug', getPost);
route.put('/:slug', verifyUser, updatePost);
route.delete('/:postId', verifyUser, deletePost);

export default route;
