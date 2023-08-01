const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  dataEntry: { type: Date, required: true },
});

const productOrderSchema = new mongoose.Schema({
  qty: { type: Number, required: true },
  product: { type: productSchema, required: true },
});

const orderSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  client: { type: String, required: true },
  products: { type: [productOrderSchema], required: true },
  status: {
    type: String,
    enum: ['pending', 'canceled', 'delivering', 'delivered'],
    required: true,
  },
  dateEntry: { type: Date, required: true },
  dateProcessed: { type: Date },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
