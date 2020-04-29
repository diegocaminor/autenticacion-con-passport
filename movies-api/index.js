const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const { config } = require('./config/index');

const authApi = require('./routes/auth');
const moviesApi = require('./routes/movies.js');
const userMoviesApi = require('./routes/userMovies.js');

// Analiza los cuerpos de las solicitudes entrantes en un middleware antes que los manejadores de ruta disponibles bajo la propiedad req.body.
const bodyParser = require('body-parser');

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler.js');

// permitir solicitudes cruzadas
app.use(cors());

// body parser
//app.use(express.json()); // este middleware permite a nuestras rutas interpretar los datos en formato json que le enviamos
app.use(bodyParser.json());
app.use(helmet());

// routes
authApi(app);
moviesApi(app);
userMoviesApi(app);

// Catch 404
app.use(notFoundHandler);

// Error middleware
// los middleware son una pieza de software que está entre 2, se le conoce como software glue, es decir ayuda a conectar otras piezas de software
// los middleware de error siempre tienen que ir al final de nuestras rutas, recordemos que ellos también son rutas
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});
