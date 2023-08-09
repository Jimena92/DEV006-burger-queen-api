const mongoose = require('mongoose');

const productOrderSchema = new mongoose.Schema({
  qty: {
    type: Number,
    required: true,
  },
  product: {
    id: {
      type: String,
      required: true,
    },
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
    dataEntry: {
      type: Date,
      required: true,
    },
  },
});

const ProductOrder = mongoose.model('ProductOrder', productOrderSchema);

module.exports = ProductOrder;
