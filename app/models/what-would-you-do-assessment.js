var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var whatwouldyoudoassessment = new Schema({
    q1a1: String,
    q1b1: String,
    q2a1: String,
    q2b1: String,
    q3a1: String,
    q3b1: String,
    q4a1: String,
    q4b1: String,
    q5a1: String,
    q5b1: String,
    q6a1: String,
    q6b1: String,
    q7a1: String,
    q7b1: String,
    q8a1: String,
    q8b1: String,
    q9a1: String,
    q9b1: String,
    q10a1: String,
    q10b1: String,
    name: String,
    email: String,
    phone: String,
    organization: String,
    newnameurl: String
  
  });


module.exports = mongoose.model('WhatwouldyoudoassessmenT', whatwouldyoudoassessment);



