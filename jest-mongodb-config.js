// Para usar con MongoDB y jest-mongodb
// https://www.npmjs.com/package/@shelf/jest-mongodb

module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest',
    },
    binary: {
      version: '4.0.3',
      skipMD5: true,
    },
    autoStart: false,
  },
  testTimeout: 30000, // Aquí puedes especificar el tiempo límite en milisegundos 
};
