import User from '../Model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorRequired, errorResponse, successResponse } from './Controller.js';

// Current Refresh Tokens!
export const refreshTokens = [];

const getAccessToken = (user) => {
  return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};
const getRefreshToken = (user) => {
  return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY);
};

export const refresh = async (req, res) => {
  const { refresh_token } = req.cookies;
  const tokenData = jwt.verify(refresh_token, process.env.SECRET_KEY_REFRESH);
  const user = { id: tokenData.id, isAdmin: tokenData.isAdmin };

  // validate refresh okens with current refresh tokens
  if (!refreshTokens.includes(refresh_token)) {
    return res.status(403).send(errorResponse(403, 'token is invalid!'));
  }

  const newAccessToken = getAccessToken(user);
  const newRefreshToken = getRefreshToken(user);

  res.cookie('access_token', newAccessToken, {
    httpOnly: true,
  });
  res.cookie('refresh_token', newRefreshToken, {
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    status: 200,
    data: {
      accessToken: newAccessToken,
      refreshTokens: newAccessToken,
    },
  });
};

export const register = async (req, res) => {
  const dataUser = req.body;
  var salt = bcrypt.genSaltSync(10);
  let bcrpytPassword;
  if (dataUser.password) {
    bcrpytPassword = bcrypt.hashSync(req.body.password, salt);
  }
  const createUser = new User({ ...dataUser, password: bcrpytPassword });
  try {
    const userRes = await createUser.save();
    res.status(200).json(successResponse(200, '', { message: 'Register Success!' }));
  } catch (err) {
    if (err.code == 11000) {
      return res.status(409).send(errorResponse(409, `Username has taked!`));
    }
    if (err.errors) {
      return res.status(400).json(errorRequired(err.errors));
    }
    res.status(403).json(err);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).send(errorResponse(401, 'Unauthorized!'));
    }
    // Compare Password!
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(403).send(errorResponse(403, 'Wrong username or passwod!'));
    }

    // Get accessToken
    const token = getAccessToken(user);
    const refreshToken = getRefreshToken(user);

    // Setup Refresh Token
    refreshTokens.push(refreshToken);

    const data = {
      username: user.username,
      accessToken: token,
      refreshToken: refreshToken,
    };

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
      })

      .status(200)
      .json(successResponse(200, data));
  } catch (err) {
    console.log();
    res.status(500).send('Some error while Login!');
  }
};

export const logout = (req, res) => {
  const cookies = req.cookies;
  if (cookies) {
    for (const cookie in cookies) {
      res.clearCookie(cookie, '', { expires: new Date(), domain: 'locahhost', path: '/' });
    }
  }

  res.status(200).json({
    success: true,
    status: 200,
    message: 'Logout Success!',
  });
};
