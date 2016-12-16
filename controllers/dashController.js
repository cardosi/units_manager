var express = require('express');
var router = express.Router();
var moment = require('moment');
var Unit = require('../models/unit.js');
var Customer = require('../models/customer.js');
var Delivery = require('../models/delivery.js');
var Transaction = require('../models/transaction.js');





//INDEX ROUTE//////////////////////////////////////////////////////
router.get('/', function(req, res){
  Unit.find({}, function(err, foundUnits){
    Customer.find({}, function(err, foundCustomers){
      Delivery.find({}, function(err, foundDeliveries){
        res.render('dash.ejs', {
          allUnits: foundUnits,
          allCustomers: foundCustomers,
          moment: moment,
          allDeliveries: foundDeliveries,
        });
      });
    });
  });
});


//ADD DELIVERY ROUTE///////////////////////////////////////////////
router.post('/add', function(req, res){
  console.log('Attempting to add delivery');
  Delivery.create(req.body, function(err, createdDelivery){
    console.log(req.body);
    console.log(createdDelivery);
    Customer.findById(createdDelivery.customer_id, function(err, foundCustomer){
      Unit.findById(createdDelivery.container, function(err, foundUnit){
        createdDelivery.transaction_id = foundCustomer.transaction_id;
        createdDelivery.save(function(err, savedCustomer){
          foundUnit.status = "Pending Delivery";
          foundUnit.price = foundCustomer.price;
          foundUnit.task = foundCustomer.task;
          foundUnit.customer_id = foundCustomer._id;
          foundUnit.transaction_id = foundCustomer.transaction_id;
          foundUnit.save(function(err, savedUnit){
            foundCustomer.deliveries.push(createdDelivery);
            foundCustomer.deliveryToSchedule -= 1;
            foundCustomer.containers.push(foundUnit._id);
            foundCustomer.save(function(err, savedCustomer){
              res.redirect('/dash');
            });
          });
        });
      });
    });
  });
});

//DELIVERY COMPLETE ROUTE/////////////////////////////////////////
router.put('/completed/:id', function(req, res){
  console.log('Attempting to complete delivery');
  Delivery.findById(req.params.id, function(err, foundDelivery){
    Unit.findById(foundDelivery.container, function(err, foundUnit){
      Transaction.findById(foundDelivery.transaction_id, function(err, foundTransaction){
        foundTransaction.deliveries.push(foundDelivery);
        foundTransaction.total += foundDelivery.price;
        foundTransaction.save(function(err, savedTransaction){
          foundUnit.deliveries.push(foundDelivery);
          foundUnit.deliveryScheduled = false;
          foundUnit.address = foundDelivery.address;
          foundUnit.city = foundDelivery.city;
          foundUnit.state = foundDelivery.state;
          foundUnit.zip = foundDelivery.zip;
          foundUnit.placed = foundDelivery.placed;
          foundUnit.deliveredOn = moment().format();
          foundUnit.customerFirst = foundDelivery.firstName;
          foundUnit.customerLast = foundDelivery.lastName;
          foundUnit.status = "Delivered"
          foundUnit.save(function(err, savedUnit){
            foundDelivery.completed = true;
            foundDelivery.save(function(err, savedDelivery){
              console.log("Found Delivery price" + foundDelivery.price);
              console.log(typeof foundDelivery.price);
              res.redirect('/dash');
            });
          });
        });
      });
    });
  });
});

//LAST DELIVERY COMPLETE ROUTE/////////////////////////////////////////
router.put('/ended/:id', function(req, res){
  console.log('Attempting to process last delivery');
  Delivery.findById(req.params.id, function(err, foundDelivery){
    Unit.findById(foundDelivery.container, function(err, foundUnit){
      Transaction.findById(foundDelivery.transaction_id, function(err, foundTransaction){
        foundTransaction.deliveries.push(foundDelivery);
        foundTransaction.total += foundDelivery.price;
        foundTransaction.save(function(err, savedTransaction){
          foundUnit.deliveries = [];
          foundUnit.deliveryScheduled = false;
          foundUnit.address = "150 S. Dobson Rd";
          foundUnit.city = "Mesa";
          foundUnit.state = "AZ";
          foundUnit.zip = "85205";
          foundUnit.placed = "outside";
          foundUnit.deliveredOn = moment().format();
          foundUnit.customerFirst = foundDelivery.firstName;
          foundUnit.customerLast = foundDelivery.lastName;
          foundUnit.status = "Delivered"
          foundUnit.save(function(err, savedUnit){
            foundDelivery.completed = true;
            foundDelivery.save(function(err, savedDelivery){
              console.log("Found Delivery price" + foundDelivery.price);
              console.log(typeof foundDelivery.price);
              res.redirect('/dash');
            });
          });
        });
      });
    });
  });
});
















module.exports = router;
