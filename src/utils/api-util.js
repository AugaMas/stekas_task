const Validator = require('jsonschema').Validator;
const JsonValidationException = require('../exceptions/JsonValidationException');

const validator = new Validator();

function validateId(id) {
  if (!/^[0-9a-f]{24}$/.test(id)) {
    throw new JsonValidationException(`${id} it is not mongo id`);
  }
}

function validateJSON(object, schema) {
  const result = validator.validate(object, schema);
  if (result.errors.length > 0) {
    throw new JsonValidationException(validationResult.errors.join(', '));
  }
}

module.exports = { validateId, validateJSON };
