var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var transactionSchema = new Schema({
  customer: [],
  deliveries: [],
  containers: [],
  rental_fees: [],
  delivery_fees: [],
  other_fees: [],
  payment_method: [],
  paid: String,
});

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
