const mongoose = require('mongoose');

const errorSchema = new mongoose.Schema({
  error: {
    type: String,
    required: true,
  },
});

const ErrorModel = mongoose.model('Error', errorSchema);

module.exports = ErrorModel;
