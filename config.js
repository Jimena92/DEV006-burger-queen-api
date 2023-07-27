module.exports = {
  port: process.argv[2] || process.env.PORT || 8080,
  secret: process.env.JWT_SECRET || 'esta-es-la-api-burger-queen',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@localhost',
  adminPassword: process.env.ADMIN_PASSWORD || 'changeme',
  dbUrl: 'mongodb+srv://jimenaflores92:DMJGnif0Eftt9zNi@cluster0.bjow63l.mongodb.net/',
};
