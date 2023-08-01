const jwt = require('jsonwebtoken');

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return next(403);
    }

    // TODO: Verificar identidad del usuario usando `decodedToken.id`
    // Aquí puedes guardar el ID del usuario en `req.userId` para su uso posterior.
    req.userId = decodedToken.id;
    next();
  });
};

module.exports.isAuthenticated = (req) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return false;
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return false;
  }

  try {
    jwt.verify(token, secret); // Verificar token sin secret ya que no estamos generando uno aquí.
    return true;
  } catch (error) {
    return false;
  }
};

module.exports.isAdmin = (req) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return false;
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return false;
  }

  try {
    const decodedToken = jwt.verify(token, secret);

    // Verificar si el token tiene el rol de administrador
    return decodedToken.roles && decodedToken.roles.admin === true;
  } catch (error) {
    return false;
  }
};

module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);
