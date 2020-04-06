const boom = require('@hapi/boom');
const { config } = require('../../config');

function withErrorStack(error, stack) {
  if (config.dev) {
    return { ...error, stack }; // el stack es toda la información relacionada al error
  }
  return error;
}

function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

// esta función se crea porque es posible que en algún punto del código
// el error que llegue no sea de tipo boom y queremos que a partir de ahí
// todos los errores tengan la estructura de boom
function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err)); // manera genérica de marcar el error
  }
  next(err);
}

function errorHandler(err, req, res, next) { // eslint-disable-line
  const {
    output: { statusCode, payload }
  } = err;

  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler
};
