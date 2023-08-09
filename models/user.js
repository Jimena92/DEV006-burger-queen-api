const mongoose = require('mongoose');

// 1. Definir el schema

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'waiter', 'chef'],
    required: true,
  },
});

// 2. Definir el modelo

const User = mongoose.model('User', userSchema);

module.exports = User;
