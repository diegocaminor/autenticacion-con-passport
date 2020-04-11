const boom = require('@hapi/boom');

// esta función va recibir los scopes permitidos de las rutas, pero lo que va devolver, será un middleware
// ya que necesitamos intervenir el request y el response de cada una de nuestras rutas
function scopesValidationHandler(allowedScopes) {
  return function(req, res, next) {
    if(!req.user || (req.user && !req.user.scopes)) {
      next(boom.unauthorized('Missing scopes'));
    }

    const hasAccess = allowedScopes.map(allowedScope => req.user.scopes.includes(allowedScope))
    .find(allowed => Boolean(allowed));

    if(hasAccess) {
      next();
    } else {
      next(boom.unauthorized('Insufficient scopes'));
    }
  }
}

module.exports = scopesValidationHandler;