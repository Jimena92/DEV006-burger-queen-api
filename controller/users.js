const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = {
  getUsers: async (req, resp, next) => {
    try {
      const users = await User.find(); // Obtén todos los usuarios sin paginación

      resp.json(users); // Envía la lista completa de usuarios en la respuesta
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
      next(500);
    }
  },

  createUser: async (req, resp, next) => {
    const { email, password, role } = req.body;
    console.log('Entró a create user');

    try {
      // Verificar si ya existe un usuario con el mismo email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next({ statusCode: 403, message: 'Ya existe un usuario con ese email' });
      }

      // Crear un nuevo usuario usando el modelo User
      const newUser = new User({
        email,
        password: bcrypt.hashSync(password, 10),
        role,
      });

      // Guardar el nuevo usuario en la base de datos
      await newUser.save();

      // Enviar el nuevo usuario como respuesta
      resp.status(201).json(newUser);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      return next({ statusCode: 500, message: 'Error al crear usuario' });
    }
  },
};
