const mongoose = require('mongoose');

const newProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const NewProduct = mongoose.model('NewProduct', newProductSchema);

module.exports = NewProduct;
