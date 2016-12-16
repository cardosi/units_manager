var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var delivery = require('../models/delivery.js');
var customer = require('../models/customer.js');
var transactionSchema = new Schema({
  customer_id: String,
  customer: [customer.schema],
  deliveries: [delivery.schema],
  rental_fees: [{type: String}],
  containers: String,
  other_fees: String,
  total: {type: Number, default: 0},
  payment_method: String,
  paid: String,
  due: String
});

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
