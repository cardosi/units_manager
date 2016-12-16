var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var delivery = require('../models/delivery.js');
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
  containers: [{type: String}],
  deliveryToSchedule: String,
  deliveries: [delivery.schema],
  transaction_id: String,
  price: Number,
  transactions: String,
  payment_method: String,
  communications: String
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
