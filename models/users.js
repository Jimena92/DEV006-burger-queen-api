const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // Puedes cambiar el tipo a "Number" si prefieres
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Admin', 'Waiter', 'Chef'],
    required: true,
  },
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
