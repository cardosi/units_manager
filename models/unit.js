var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var unitSchema = new Schema({
  number: Number,
  type: String,
  status: String,
  location: String,
  sub_location: String,
  debt: Number,
  monthly_cost: Number,
  current_monthly_revenue: Number,
  monthly_net: Number,
  pay_off_date: Date,
  revenue_to_date: Number,
  net_to_date: Number,
  current_customer: String,
  next_delivery: [],
  transaction_history: [],
  delivery_history: [],
  customer_history: []
});

var Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;
