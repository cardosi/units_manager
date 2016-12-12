var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deliverySchema = new Schema({
  scheduled: Date,
  status: String,
  type: String,
  customer: [],
  container: [],
  start_location: String,
  end_location: String,
  distance: String,
  price: String,
  transaction_id: String
});

var Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
