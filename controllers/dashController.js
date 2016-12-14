var express = require('express');
var router = express.Router();
var moment = require('moment');
var Unit = require('../models/unit.js');
var Customer = require('../models/customer.js');
var Delivery = require('../models/delivery.js');


//INDEX ROUTE//////////////////////////////////////////////////////
router.get('/', function(req, res){
  Unit.find({}, function(err, foundUnits){
    Customer.find({}, function(err, foundCustomers){
      Delivery.find({}, function(err, foundDeliveries){
        res.render('dash.ejs', {
          allUnits: foundUnits,
          allCustomers: foundCustomers,
          moment: moment,
          allDeliveries: foundDeliveries
        });
      });
    });
  });
});


//ADD DELIVERY ROUTE///////////////////////////////////////////////
router.post('/add', function(req, res){
  console.log('Attempting to add delivery');
  Delivery.create(req.body, function(err, createdDelivery){
    Customer.findById(createdDelivery.customer_id, function(err, foundCustomer){
      Unit.findById(createdDelivery.container, function(err, foundUnit){
        foundUnit.status = "Pending Delivery";
        foundUnit.save(function(err, savedUnit){
          foundCustomer.deliveries.push(createdDelivery);
          foundCustomer.deliveryToSchedule -= 1;
          foundCustomer.save(function(err, savedCustomer){
            res.redirect('/customers/'+ savedCustomer._id);
          });
        });
      });
    });
  });
});
















module.exports = router;
