var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var Thepohassesment = new Schema({
    q1: String,
    q2: String,
    q3: String,
    q4: String,
    q5: String,
    q6: String,
    q7: String,
    q8: String,
    q9: String,
    q10: String,
    q11: String,
    q12: String,
    q13: String,
    q14: String,
    q15: String,
    name: String,
    email: String,
    phone: String,
    organization: String,
    newnameurl: String
  
  });


module.exports = mongoose.model('thepohassesment', Thepohassesment);



