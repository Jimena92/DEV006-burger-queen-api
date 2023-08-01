const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

// Función para autenticar al usuario
const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario en la base de datos por correo electrónico
    const user = await User.findOne({ email });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    // Verificar si la contraseña es correcta
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user._id, email: user.email }, config.secret, {
      expiresIn: '1h', // El token expirará después de 1 hora
    });

    // Enviar el token en la respuesta
    res.json({ token });
  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = { authenticateUser };
