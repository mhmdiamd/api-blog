import { Router } from 'express';
import { getCategories } from '../Controller/CategoryController.js';

const route = Router();

route.get('/', getCategories);

export default route;
