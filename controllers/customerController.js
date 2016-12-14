var express = require('express');
var router = express.Router();
var Customer = require('../models/customer.js');
var Transaction = require('../models/transaction.js');

//INDEX ROUTE/////////////////////////////////////////////
router.get('/', function(req, res){
  Customer.find({}, function(err, foundCustomers){
    console.log(foundCustomers);
    res.render('customers/index.ejs', {
      allCustomers: foundCustomers
    });
  });
});

//NEW ROUTE//////////////////////////////////////////////
router.get('/new', function(req, res){
  Customer.find({}, function(err, allCustomers){
    res.render('customers/new.ejs', {
      customers: allCustomers
    });
  });
});

//CREATE ROUTE///////////////////////////////////////////
router.post('/', function(req, res){
  Customer.create(req.body, function(err, createdCustomer){
    Transaction.create({}, function(err, createdTransaction){
      createdTransaction.customer.push(req.body);
      createdTransaction.save(function(err, savedTransaction){
        res.redirect('/customers');
        console.log(req.body);
      });
    });
  });
});

//EDIT ROUTE/////////////////////////////////////////////
router.get('/:id/edit', function(req, res){
  Customer.findById(req.params.id, function(err, foundCustomer){
    res.render('customers/edit.ejs', {
      customer: foundCustomer
    });
  });
});

//UPDATE ROUTE////////////////////////////////////////////
router.put('/:id', function(req, res){
  console.log('update route accessed');
  Customer.findByIdAndUpdate(req.params.id, req.body, function(err, updatedCustomer){
    res.redirect('/customers/'+req.params.id);
  });
});

//DELETE ROUTE/////////////////////////////////////////////
router.delete('/:id', function(req, res){
  Customer.findByIdAndRemove(req.params.id, function(err, foundCustomer){
    res.redirect('/customers');
  })
})

//SHOW ROUTE//////////////////////////////////////////////
router.get('/:id', function(req, res){
  Customer.findById(req.params.id, function(err, foundCustomer){
    res.render('customers/show.ejs', {
      customer: foundCustomer
    });
  });
});


module.exports = router;
