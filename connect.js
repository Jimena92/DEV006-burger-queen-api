const mongoose = require('mongoose');
const config = require('./config');

// Obtén la URL de conexión desde el archivo de configuración
const { dbUrl } = config;

async function connect() {
  try {
    // Establecer la conexión con MongoDB utilizando Mongoose
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    // Puedes manejar el error como prefieras, por ejemplo, lanzar una excepción
  }
}

module.exports = { connect };
