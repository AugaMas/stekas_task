const HttpException = require('./HttpException');

class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(401, 'Wrong authentication token');
  }
}

module.exports = WrongAuthenticationTokenException;
