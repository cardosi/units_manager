var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var transactionSchema = new Schema({
  customer: String,
  total: Number,
  deliveries: String,
  containers: String,
  rental_fees: String,
  delivery_fees: String,
  other_fees: String,
  payment_method: String,
  paid: String,
});

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
