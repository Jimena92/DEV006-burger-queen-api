const express = require('express');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');

const { port, secret } = config;
const app = express();

app.set('config', config);
app.set('pkg', pkg);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Importar la conexión a la base de datos desde connect.js
const connectDB = require('./connect');
connectDB.connect()
  .then(() => {
    // Registrar rutas después de la conexión exitosa
    routes(app, (err) => {
      if (err) {
        throw err;
      }

      app.use(errorHandler);

      // Levantar el servidor
      app.listen(port, () => {
        console.info(`App listening on port ${port}`);
      });
    });
  })
  .catch((error) => {
    console.error('Error al conectar con MongoDB:', error);
  });
