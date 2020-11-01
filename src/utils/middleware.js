function errorHandler(err, req, res, next) {
  if (err.status) {
    return res.status(err.status).send({ error: err.message });
  }
  next(err);
}

function unknownEndpoint(req, res) {
  res.status(404).send({ error: 'unknown endpoint' });
}

module.exports = { errorHandler, unknownEndpoint };
