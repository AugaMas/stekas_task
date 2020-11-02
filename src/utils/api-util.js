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
    throw new JsonValidationException(result.errors.join(', '));
  }
}

function getPaging(query) {
  const size = Math.min(Math.max(query.size | 0 || 10, 1), 100);
  const page = query.page? (query.page | 0) - 1 : 0 ;
  return { size, page };
}

module.exports = { validateId, validateJSON, getPaging };
