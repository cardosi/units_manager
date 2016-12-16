var express = require('express');
var router = express.Router();
var Customer = require('../models/customer.js');
var Transaction = require('../models/transaction.js');
var Unit = require('../models/unit.js');

//INDEX ROUTE/////////////////////////////////////////////
router.get('/', function(req, res){
  Customer.find({}, function(err, foundCustomers){
    console.log(foundCustomers);
    res.render('customers/index.ejs', {
      allCustomers: foundCustomers
    });
  });
});

//SEED ROUTE//////////////////////////////////////////////
// router.get('/seed', function(req, res){
//   var data = require('../seeds/customers.js');
//   Customer.create(data, function(err, createdCustomer){
//     Transaction.create({}, function(err, createdTransaction){
//       createdCustomer.transaction_id = createdTransaction._id;
//       console.log(createdCustomer);
//       createdCustomer.save(function(err, savedCustomer){
//         createdTransaction.customer.push(data);
//         createdTransaction.save(function(err, savedTransaction){
//           res.redirect('/customers');
//         });
//       });
//     });
//   });
// });

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
      createdCustomer.transaction_id = createdTransaction._id;
      createdCustomer.save(function(err, savedCustomer){
        createdTransaction.customer.push(req.body);
        createdTransaction.save(function(err, savedTransaction){
          res.redirect('/customers');
          console.log(req.body);
        });
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
    Unit.find(foundCustomer.containers, function(err, allUnits){
      console.log(allUnits[0].customer_id)
      console.log(foundCustomer._id);
      res.render('customers/show.ejs', {
        customer: foundCustomer,
        units: allUnits
      });
    });
  });
});


module.exports = router;
