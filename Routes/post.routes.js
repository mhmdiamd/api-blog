import { Router } from 'express';
import { createPost, deletePost, getPost, getPosts, updatePost } from '../Controller/PostController.js';
const route = Router();

route.post('/', createPost);
route.get('/', getPosts);
route.get('/:slug', getPost);
route.put('/:slug', updatePost);
route.delete('/:postId', deletePost);

export default route;
