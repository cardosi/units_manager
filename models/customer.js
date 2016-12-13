var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customerSchema = new Schema({
  type: String,
  name: String,
  business: String,
  phone: Number,
  email: String,
  address: String,
  containers: String,
  deliveries: String,
  transactions: String,
  payment_method: String,
  communications: String
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
