import User from '../Model/User.js';
import { errorResponse, successResponse } from './Controller.js';

// Get Users
export const getUsers = (req, res) => {
  User.find()
    .then((response) => {
      if (!response) {
        return res.status(404).send(errorResponse(404, 'Data not found!'));
      }
      const posts = response.map((data) => {
        const { password, ...others } = data._doc;
        return others;
      });

      res.status(200).json(successResponse(200, posts));
    })
    .catch((err) => {
      res.status(500).json({
        message: err || 'some error while get users data!',
      });
    });
};
// Get User
export const getUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const userRes = await User.findById(userId);
    if (!userRes || userRes.length == 0) {
      return res.status(404).send(errorResponse(404, 'Data not found!'));
    }

    const { password, ...others } = userRes._doc;

    res.status(200).json(successResponse(200, others));
  } catch (err) {
    res.status(404).json(errorResponse(404, 'User not Found'));
  }
};
// Create User was handle by Register in auth Controller!

// Delete User
export const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const delRes = await User.findByIdAndDelete(userId);
    if (!delRes) {
      return res.status(404).json(errorResponse(404, 'User not Found!'));
    }

    res.status(200).json(successResponse(200, {}, 'User has Deleted!'));
  } catch (err) {
    return res.status(500).json({
      message: err || 'Some error while delete data!',
    });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const dataUser = req.body;
  try {
    const updRes = await User.findByIdAndUpdate(userId, dataUser, { new: true });
    const { password, ...others } = updRes._doc;

    res.status(200).json(successResponse(200, others));
  } catch (error) {
    console.log(error);
    res.status(500).send(errorResponse(500, 'Some Error while update User'));
  }
};
