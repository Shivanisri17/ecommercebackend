

'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartdetails = mongoose.Schema({
    
   // userid: String,
    requestid: String,
    transactionstring : Object
});


mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/digitalId', { useMongoClient: true });

mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useMongoClient: true
});



module.exports = mongoose.model('loanpage', cartdetails);