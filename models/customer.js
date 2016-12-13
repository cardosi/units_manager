var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customerSchema = new Schema({
  firstName: String,
  lastName: String,
  type: String,
  contNeed: Number,
  task: String,
  date: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  containers: String,
  deliveryScheduled: {type: Boolean, default: "false"},
  transactions: String,
  payment_method: String,
  communications: String
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
