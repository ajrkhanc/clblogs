var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var influencerassessment = new Schema({
    q1a: String,
    q1b: String,
    q1c: String,
    q1d: String,
    q2a: String,
    q2b: String,
    q2c: String,
    q2d: String,
    q3a: String,
    q3b: String,
    q3c: String,
    q3d: String,
    q4a: String,
    q4b: String,
    q4c: String,
    q4d: String,
    q5a: String,
    q5b: String,
    q5c: String,
    q5d: String,
    q6a: String,
    q6b: String,
    q6c: String,
    q6d: String,
    q7a: String,
    q7b: String,
    q7c: String,
    q7d: String,
    q8a: String,
    q8b: String,
    q8c: String,
    q8d: String,  
    name: String,
    email: String,
    phone: String,
    organization: String,
    newnameurl: String
  
  });


module.exports = mongoose.model('influencerassessmentm', influencerassessment);



