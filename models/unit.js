var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var unitSchema = new Schema({
  contNum: Number,
  brand: String,
  status: String,
  location: String,
  sub_location: String,
  debt: Number,
  monthly_cost: Number,
  current_monthly_revenue: Number,
  monthly_net: Number,
  pay_off_date: String,
  revenue_to_date: Number,
  net_to_date: Number,
  current_customer: String,
  next_delivery: String,
  transaction_history: String,
  delivery_history: String,
  customer_history: String
});

var Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;
