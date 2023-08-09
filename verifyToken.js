const jwt = require('jsonwebtoken');

const secret = 'esta-es-la-api-burger-queen'; // Reemplaza con tu secreto
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzE4ZTI5YWRkYmM0YjgxMWIwOWE4YiIsImVtYWlsIjoiYWRtaW5AbG9jYWxob3N0IiwiaWF0IjoxNjkxNDgzNDQ1fQ.n9J2SG0YHJecHkHg2vYmfCVHnVXupz2GeAI_kmAUScE'; // Reemplaza con tu token

try {
  const decodedToken = jwt.verify(token, secret);
  console.log(decodedToken);
} catch (error) {
  console.error('Error al decodificar el token:', error.message);
}
