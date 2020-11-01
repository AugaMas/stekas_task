const { jwtSecret } = require('../utils/config');
const jwt = require('jsonwebtoken');
const { getUser } = require('./userServices');
const AuthenticationTokenMissingException = require('../exceptions/AuthenticationTokenMissingException');
const WrongAuthenticationTokenException = require('../exceptions/WrongAuthenticationTokenException');

function createToken(user) {
  const expiresIn = 60 * 60 * 24;
  const dataStoredInToken = { _id: user._id };

  return {
    expiresIn,
    token: jwt.sign(dataStoredInToken, jwtSecret, { expiresIn }),
  };
}

function createCookie(token) {
  return `Authorization=${token.token}; HttpOnly; Max-Age=${token.expiresIn}`;
}

async function authMiddleware(req, res, next) {
  const cookies = req.cookies;
  if (cookies && cookies.Authorization) {
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, jwtSecret);
      const id = verificationResponse._id;

      const user = await getUser(id);
      if (user) {
        req.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

module.exports = {
  createCookie,
  createToken,
  authMiddleware,
};
