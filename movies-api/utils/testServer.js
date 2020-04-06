// la función de este server es levantar un server para pruebas
// para no levantar todo lo que tiene nuestro server, solo queremos
// uno pequeño para realizar las pruebas
const express = require('express');
const supertest = require('supertest');

function testServer(route) {
  const app = express();
  route(app);
  return supertest(app);
}

module.exports = testServer;
