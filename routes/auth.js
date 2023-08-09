const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/user');

const { secret } = config; // Aquí obtenemos el secret del archivo config.js

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @code {401} si las credenciales son incorrectas
   * @code {500} si ocurre un error en el servidor
   * @auth No requiere autenticación
   */
  app.post('/auth', async (req, resp, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }

    try {
      // Buscar el usuario por su correo electrónico en la base de datos
      const user = await User.findOne({ email });

      // Si el usuario no existe o la contraseña no coincide, retornar error de autenticación
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return next(401);
      }

      // Si el usuario existe y la contraseña coincide, crear un token de autenticación usando jwt
      const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, secret);

      // Enviar el token en la respuesta
      resp.json({ token });
    } catch (error) {
      console.error('Error de autenticación:', error);
      next(500);
    }
    next();
  });

  return nextMain();
};
