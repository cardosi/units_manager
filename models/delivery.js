var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deliverySchema = new Schema({
  customer_id: String,
  firstName: String,
  lastName: String,
  date: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  container: String,
  containerStatus: String,
  price: String,
});

var Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
