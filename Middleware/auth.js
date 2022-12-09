import { errorResponse } from '../Controller/Controller.js';

export const authMiddleware = (req, res, next) => {
  const getToken = req.headers.authorization;
  if (!getToken) {
    return res.status(401).json(errorResponse(401, 'Unauthenticate!'));
  }
  // const accessToken = getToken.split(' ')[1];
  const { refresh_token } = req.cookies;
  if (!refresh_token) {
    return res.status(401).json(errorResponse(401, 'Unauthenticate!'));
  }
  next();
};
