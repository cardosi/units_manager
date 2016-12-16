var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var unitSchema = new Schema({
  contNum: Number,
  empty: {type: Boolean, default: true},
  deliveries: [{type: String}],
  brand: String,
  status: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  placed: String,
  deliveredOn: String,
  customerFirst: String,
  customerLast: String,
  customer_id: String,
  transaction_id: String,
  price: String,
  task: String,
  deliveryScheduled: {type: Boolean, default: false},
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
