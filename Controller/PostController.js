import escapeStringRegexp from 'escape-string-regexp';
import Post from '../Model/Post.js';
import { errorRequired, errorResponse, successResponse } from './Controller.js';

const handleTotalPosts = async (search, posts) => {
  let totalPosts = 0;
  if (!search) {
    const total = await Post.countDocuments();
    totalPosts = total;
  } else {
    for (let i = 1; i < posts.length; i++) {
      totalPosts++;
    }
  }

  return totalPosts;
};

export const handleSearch = async (query) => {
  const { search, category, limit = 10, page = 1, order = -1 } = query;
  // Search query Handler!
  let $regex = {};
  if (search) {
    $regex = escapeStringRegexp(search);
  }
  let posts;
  try {
    if (category) {
      posts = await Post.find(search ? { body: { $regex }, categories: category } : { categories: category })
        .sort({ createdAt: order })
        .limit(limit * 1)
        .skip((page - 1) * limit);
    } else {
      posts = await Post.find(search ? { body: { $regex } } : {})
        .sort({ createdAt: order })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    }

    return posts;
  } catch (err) {
    return errorResponse(500, 'somethin Wrong');
  }
};

// Get Posts
export const getPosts = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;

  try {
    // get Posts data for check search Data!
    const posts = await handleSearch(req.query);
    // Check if posts not Found!
    if (!posts || posts.length == 0) {
      return res.status(404).send(errorResponse(404, 'Posts not Found!'));
    }

    // get total Document!
    const totalPosts = await handleTotalPosts(search, posts);

    successResponse(200);
    res.status(200).json({
      success: true,
      status: 200,
      data: posts,
      totalPages: totalPosts < 10 ? 1 : Math.ceil(totalPosts / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(errorResponse(500, error || 'Some Error while get posts!'));
  }
};

// Create Post
export const createPost = async (req, res) => {
  const data = req.body;
  const uploadPost = new Post(data);
  try {
    const resPost = await uploadPost.save();

    res.status(200).json(successResponse(200, resPost));
  } catch (err) {
    if (err.errors) {
      return res.status(400).send(errorRequired(err.errors));
    }
    res.status(403).json(err);
  }
};

// Get Post
export const getPost = async (req, res) => {
  const postSlug = req.params.slug;

  try {
    const post = await Post.findOne({ slug: postSlug });
    if (!post) {
      return res.status(404).send(errorResponse(404, 'Post not Found!'));
    }

    res.status(200).json(successResponse(200, post));
  } catch (err) {
    res.status(500).send(errorResponse(500, err.errors || 'Post not Found!'));
  }
};

// Update Post
export const updatePost = async (req, res) => {
  const data = req.body;
  const slugPost = req.params.slug;
  try {
    const getPost = await Post.findOne({ slug: slugPost });
    if (!getPost) {
      return res.status(404).send(errorResponse(404, 'Post not found!'));
    }
    const { _id } = getPost;
    const resData = await Post.findByIdAndUpdate(_id, data, { new: true });

    res.status(200).json(successResponse(200, resData));
  } catch (err) {
    res.status(500).send(err.errors);
  }
};
// Delete Post
export const deletePost = async (req, res) => {
  const postId = req.params.postId;
  try {
    const resDelete = await Post.findByIdAndDelete(postId);
    if (!resDelete) {
      console.log(resDelete);
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: 'Delete Success',
    });
  } catch (error) {
    res.status(404).send(errorResponse(404, 'Post not Found!'));
  }
};
