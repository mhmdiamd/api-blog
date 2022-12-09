import jwt from 'jsonwebtoken';
import { errorResponse } from '../Controller/Controller.js';

// Verifikasi Token
export const verifyToken = (req, res, next) => {
  const { access_token } = req.cookies;
  jwt.verify(access_token, process.env.SECRET_KEY, function (err, user) {
    if (err) {
      return res.status(500).send(errorResponse(500, 'Token is not valid'));
    }

    req.user = user;
    next();
  });
};


// Verifikasi User
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    const { userId } = req.params;
    const userLogin = req.user;

    if (userLogin.id == userId || userLogin.isAdmin) {
      return next();
    }

    res.status(403).json(errorResponse(403, 'You not Allowed!'));
  });
};

// Verifikasi admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      return res.status(401).send(errorResponse(401, 'You are not Allowed!'));
    }

    return next();
  });
};
