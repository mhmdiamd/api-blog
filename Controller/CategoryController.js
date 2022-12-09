import Post from '../Model/Post.js';
import { successResponse } from './Controller.js';

export const getCategories = async (req, res, next) => {
  try {
    const posts = await Post.find();

    const categories = [];
    posts.forEach((post) => {
      post.categories.forEach((data) => {
        if (!categories.includes(data)) {
          categories.push(data);
        }
      });
    });

    if (!categories || categories.length == 0) {
      return res.status(404).send(errorResponse(404, 'Categories not found!'));
    }

    res.status(200).json(successResponse(200, categories));
  } catch (err) {
    next(err);
  }
};
