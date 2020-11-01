const HttpException = require('./HttpException');

class JsonValidationException extends HttpException {
  constructor(message) {
    super(400, message);
  }
}

module.exports = JsonValidationException;
