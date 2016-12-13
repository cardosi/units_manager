var express = require('express');
var router = express.Router();
var Transaction = require('../models/transaction.js');

//INDEX ROUTE/////////////////////////////////////////////
router.get('/', function(req, res){
  Transaction.find({}, function(err, foundTransactions){
    console.log(foundTransactions);
    res.render('transactions/index.ejs', {
      allTransactions: foundTransactions
    });
  });
});

//NEW ROUTE//////////////////////////////////////////////
router.get('/new', function(req, res){
  Transaction.find({}, function(err, allTransactions){
    res.render('transactions/new.ejs', {
      transactions: allTransactions
    });
  });
});

//CREATE ROUTE///////////////////////////////////////////
router.post('/', function(req, res){
  Transaction.create(req.body, function(err, createdTransaction){
    res.redirect('/transactions');
    console.log(req.body);
  });
});

//EDIT ROUTE/////////////////////////////////////////////
router.get('/:id/edit', function(req, res){
  Transaction.findById(req.params.id, function(err, foundTransaction){
    res.render('transactions/edit.ejs', {
      transaction: foundTransaction
    });
  });
});

//UPDATE ROUTE////////////////////////////////////////////
router.put('/:id', function(req, res){
  console.log('update route accessed');
  Transaction.findByIdAndUpdate(req.params.id, req.body, function(err, updatedTransaction){
    res.redirect('/transactions/'+req.params.id);
  });
});

//DELETE ROUTE/////////////////////////////////////////////
router.delete('/:id', function(req, res){
  Transaction.findByIdAndRemove(req.params.id, function(err, foundTransactions){
    res.redirect('/transactions');
  })
})

//SHOW ROUTE//////////////////////////////////////////////
router.get('/:id', function(req, res){
  Transaction.findById(req.params.id, function(err, foundTransaction){
    res.render('transactions/show.ejs', {
      transaction: foundTransaction
    });
  });
});


module.exports = router;
