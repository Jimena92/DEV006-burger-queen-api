/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const User = require('../models/user');
const { getUsers, createUser } = require('../controller/users');

const initAdminUser = async (app, next) => {
  const { adminEmail, adminPassword } = app.get('config');
  if (!adminEmail || !adminPassword) {
    console.log('No se proporcionó adminEmail o adminPassword en la configuración.');
    return next();
  }

  try {
    const adminUserExists = await User.findOne({ email: adminEmail });
    if (!adminUserExists) {
      const adminUser = new User({
        email: adminEmail,
        password: bcrypt.hashSync(adminPassword, 10),
        role: 'admin', // Cambiamos roles por role
      });
      await adminUser.save();
      console.log('Admin user created successfully:', adminUser);
    } else {
      console.log('The user admin already exists', adminUserExists);
    }
    return next();
  } catch (err) {
    next(err);
  }
};

/** @module users */
module.exports = (app, next) => {
  /**
   * @name GET /users
   * @description Lista usuarias
   * @path {GET} /users
   * @query {String} [page=1] Página del listado a consultar
   * @query {String} [limit=10] Cantitad de elementos por página
   * @header {Object} link Parámetros de paginación
   * @header {String} link.first Link a la primera página
   * @header {String} link.prev Link a la página anterior
   * @header {String} link.next Link a la página siguiente
   * @header {String} link.last Link a la última página
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin**
   * @response {Array} users Lista de usuarias
   * @response {String} users[]._id ID de la usuaria
   * @response {Object} users[].email Objeto con la información del correo electrónico de la usuaria
   * @response {String} users[].email.address Dirección de correo electrónico de la usuaria
   * @response {Object} users[].roles Objeto con los roles de la usuaria
   * @response {Boolean} users[].roles.admin Valor booleano que indica si la usuaria es admin
   * @code {200} Si la autenticación es correcta y se obtiene la lista de usuarias correctamente.
   * @code {401} Si no hay cabecera de autenticación o si la usuaria no es administradora.
   * @code {500} Si ocurre un error en el servidor.
   */
  app.get('/users', requireAdmin, getUsers);

  /**
   * @name POST /users
   * @description Crea una usuaria
   * @path {POST} /users
   * @body {String} email Correo electrónico de la usuaria a crear.
   * @body {String} password Contraseña de la usuaria a crear.
   * @body {Object} [roles] Objeto con los roles de la usuaria (opcional).
   * @body {Boolean} [roles.admin] Valor booleano que indica si la usuaria es admin (opcional).
   * @auth Requiere `token` de autenticación y que la usuaria sea **admin**
   * @response {Object} user Objeto con la información de la usuaria creada.
   * @response {String} user._id ID de la usuaria creada.
   * @response {Object} user.email Objeto con la info del correo electrónico de la usuaria creada.
   * @response {String} user.email.address Dirección de correo electrónico de la usuaria creada.
   * @response {Object} user.roles Objeto con los roles de la usuaria creada.
   * @response {Boolean} user.roles.admin Valor booleano que indica si la usuaria es administradora.
   * @code {200} Si la autenticación es correcta y se crea la usuaria correctamente.
   * @code {400} Si no se proveen `email` o `password` o ninguno de los dos.
   * @code {401} Si no hay cabecera de autenticación o si la usuaria no es administradora.
   * @code {403} Si ya existe una usuaria con el mismo correo electrónico.
   * @code {500} Si ocurre un error en el servidor.
   */

  app.post('/users', requireAdmin, createUser);

  /**
   * @name GET /users/:uid
   * @description Obtiene información de una usuaria
   * @path {GET} /users/:uid
   * @params {String} :uid ID o dirección de correo electrónico de la usuaria a consultar.
   * @auth Requiere `token` de auth y que la usuaria sea **admin** o la misma usuaria a consultar.
   * @response {Object} user Objeto con la información de la usuaria consultada.
   * @response {String} user._id ID de la usuaria consultada.
   * @response {Object} user.email Objeto con la información del correo de la usuaria consultada.
   * @response {String} user.email.address Dirección de correo electrónico de la usuaria consultada.
   * @response {Object} user.roles Objeto con los roles de la usuaria consultada.
   * @response {Boolean} user.roles.admin Valor booleano que indica si la usuaria es administradora.
   * @code {200} Si la autenticación es correcta y se obtiene la info de la usuaria correctamente.
   * @code {401} Si no hay cabecera de autenticación.
   * @code {403} Si no es ni admin o la misma usuaria.
   * @code {404} Si la usuaria solicitada no existe.
   * @code {500} Si ocurre un error en el servidor.
   */

  app.get('/users/:uid', requireAuth, (req, resp) => {
    /* Implementación para obtener información de una usuaria */
  });

  /**
   * @name PUT /users
   * @description Modifica una usuaria
   * @params {String} :uid ID o dirección de correo electrónico de la usuaria a modificar.
   * @path {PUT} /users
   * @body {String} email Correo electrónico de la usuaria a modificar.
   * @body {String} password Contraseña de la usuaria a modificar.
   * @body {Object} [roles] Objeto con los roles de la usuaria a modificar (opcional).
   * @body {Boolean} [roles.admin] Valor booleano que indica si la usuaria es admin (opcional).
   * @auth Requiere `token` de auth que la user sea **admin** o la misma user a modificar.
   * @response {Object} user Objeto con la información de la usuaria modificada.
   * @response {String} user._id ID de la usuaria modificada.
   * @response {Object} user.email Objeto con la información del correo de la usuaria modificada.
   * @response {String} user.email.address Dirección de correo electrónico de la usuaria modificada.
   * @response {Object} user.roles Objeto con los roles de la usuaria modificada.
   * @response {Boolean} user.roles.admin Valor booleano que indica si la usuaria es administradora.
   * @code {200} Si la autenticación es correcta y se modifica la usuaria correctamente.
   * @code {400} Si no se proveen `email` o `password` o ninguno de los dos.
   * @code {401} Si no hay cabecera de autenticación.
   * @code {403} Si no es ni admin o la misma usuaria.
   * @code {403} Si una usuaria no admin intenta modificar sus `roles`.
   * @code {404} Si la usuaria solicitada no existe.
   * @code {500} Si ocurre un error en el servidor.
   */

  app.put('/users/:uid', requireAuth, (req, resp, next) => {
    /* Implementación para modificar una usuaria */
  });

  /**
   * @name DELETE /users
   * @description Elimina una usuaria
   * @params {String} :uid ID o dirección de correo electrónico de la usuaria a eliminar.
   * @path {DELETE} /users
   * @auth Requiere `token` de autenticación y que la user sea **admin** o la misma user a eliminar.
   * @response {Object} user Objeto con la información de la usuaria eliminada.
   * @response {String} user._id ID de la usuaria eliminada.
   * @response {Object} user.email Objeto con la info del correo de la usuaria eliminada.
   * @response {String} user.email.address Dirección de correo electrónico de la usuaria eliminada.
   * @response {Object} user.roles Objeto con los roles de la usuaria eliminada.
   * @response {Boolean} user.roles.admin Valor booleano que indica si la usuaria es administradora.
   * @code {200} Si la autenticación es correcta y se elimina la usuaria correctamente.
   * @code {401} Si no hay cabecera de autenticación.
   * @code {403} Si no es ni admin o la misma usuaria.
   * @code {404} Si la usuaria solicitada no existe.
   * @code {500} Si ocurre un error en el servidor.
   */

  app.delete('/users/:uid', requireAuth, (req, resp, next) => {
    // Implementación para eliminar una usuaria
  });

  initAdminUser(app, next);
};
