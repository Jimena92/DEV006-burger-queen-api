const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'canceled', 'delivering', 'delivered'],
    required: true,
  },
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
