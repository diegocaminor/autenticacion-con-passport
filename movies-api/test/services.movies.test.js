const assert = require('assert'); // assert es una librería nativa de nodejs // se encarga de verificar si es verdad o no nuestra comparación en los test
const proxyquire = require('proxyquire');

const { getAllStub, MongoLibMock } = require('../utils/mocks/mongoLib');

const { moviesMock } = require("../utils/mocks/movies");

describe('services - movies', function() {
    const MoviesServices = proxyquire("../services/movies", {
        '../lib/mongo': MongoLibMock // ../lib/mongo será reemplazada por MongoLibMock
    });

    const moviesService = new MoviesServices(); // al instanciarla, se pausa la librería de mongo que mockeamos

    describe("when getMovies method is called", async function() {
        it("should call the getAll MongoLib method", async function() {
            await moviesService.getMovies({});
            assert.strictEqual(getAllStub.called, true)
        })

        it("should return an array of movies", async function(){
            const result = await moviesService.getMovies({});
            const expected = moviesMock;
            assert.deepEqual(result, expected) // deepEqual se usa para comparar objetos que tinene muchos niveles
        })
    })
  });