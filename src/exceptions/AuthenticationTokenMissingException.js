const HttpException = require('./HttpException');

class AuthenticationTokenMissingException extends HttpException {
  constructor() {
    super(401, 'Authentication token missing');
  }
}

module.exports = AuthenticationTokenMissingException;
