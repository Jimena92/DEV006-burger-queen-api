const User = require('../models/user');

module.exports = {
  getUsers: async (req, resp, next) => {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    try {
      // Obtenemos la colección de usuarios usando el método `paginate` de mongoose-paginate-v2
      const users = await User.paginate({}, options);

      // Enviamos la respuesta con la colección de usuarios
      resp.json(users);
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
      next(500);
    }
  },

  createUser: async (req, resp, next) => {
    const { email, password, roles } = req.body;

    try {
      // Verificar si ya existe un usuario con el mismo email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(403, 'Ya existe un usuario con ese email');
      }

      // Crear un nuevo usuario usando el modelo User
      const newUser = new User({
        email,
        password: bcrypt.hashSync(password, 10),
        roles,
      });

      // Guardar el nuevo usuario en la base de datos
      await newUser.save();

      // Enviar el nuevo usuario como respuesta
      resp.status(201).json(newUser);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      next(500, 'Error al crear usuario');
    }
  },
};
