const { config } = require('../config');

function cacheResponse(res, seconds) {
  // El manejo de cache solo se ejecutará en producción, en desarrollo es molesto
  if (!config.dev) {
    res.set('Cache-control', `public, max-age=${seconds}`);
  }
}

module.exports = cacheResponse;
