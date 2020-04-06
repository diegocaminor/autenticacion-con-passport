const sinon = require('sinon');

const { moviesMock, filteredMoviesMock } = require('./movies');

const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock); // cuando se llame a movies, resuelve con los mocks de las películas

const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(moviesMock);

const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
};
