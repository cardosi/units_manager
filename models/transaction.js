var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var delivery = require('../models/delivery.js');
var customer = require('../models/customer.js');
var transactionSchema = new Schema({
  customer_id: String,
  customer: [customer.schema],
  deliveries: [delivery.schema],
  containers: String,
  other_fees: String,
  total: String,
  payment_method: String,
  paid: String,
  due: String
});

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
