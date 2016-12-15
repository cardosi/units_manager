var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deliverySchema = new Schema({
  customer_id: String,
  transaction_id: String,
  firstName: String,
  lastName: String,
  date: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  placed: String,
  container: String,
  containerStatus: String,
  price: Number,
  completed: {type: Boolean, default: false}
});

var Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
