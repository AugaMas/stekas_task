const HttpException = require('./HttpException');

class WrongUserCredentialsException extends HttpException {
  constructor() {
    super(401, 'Invalid username or password');
  }
}

module.exports = WrongUserCredentialsException;
