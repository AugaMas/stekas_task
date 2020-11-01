const { jwtSecret } = require('../utils/config');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { getUser } = require('./userServices');
const AuthenticationTokenMissingException = require('../exceptions/AuthenticationTokenMissingException');
const WrongAuthenticationTokenException = require('../exceptions/WrongAuthenticationTokenException');

function createToken(user) {
  const dataStoredInToken = { _id: user._id };
  const expiresIn = 24 * 60 * 60;
  return jwt.sign(dataStoredInToken, jwtSecret, { expiresIn });
}

function getTokenFrom(request) {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
}

function createCookie(token) {
  return cookie.serialize('Authorization', token.token, {
    maxAge: token.expiresIn,
    path: '/api',
  });
}

async function authMiddleware(req, res, next) {
  const token = getTokenFrom(req);
  if (token) {
    try {
      const verificationResponse = jwt.verify(token, jwtSecret);

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
