const assert = require('assert'); // assert es una librería nativa de nodejs // se encarga de verificar si es verdad o no nuestra comparación en los test
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer');

describe('routes - movies', function() {
  const route = proxyquire('../routes/movies', {
    '../services/movies': MoviesServiceMock // ../services/movies será reemplazado por MoviesServiceMock
  });

  const request = testServer(route);
  describe('GET /movies', function() {
    it('should respond with status 200', function(done) {
      request.get('/api/movies').expect(200, done);
    });

    it('should respond with the list of movies 200', function(done) {
      request.get('/api/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movies listed'
        });

        done();
      });
    });
  });
});
