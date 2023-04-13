var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var careercoachingsnapshot = new Schema({
    trust1: String,
    trust2: String,
    trust3: String,
    trust4: String,
    trust5: String,
    ec1: String,
    ec2: String,
    ec3: String,
    ec4: String,
    ec5: String,
    ec6: String,
    ec7: String,
    ec8: String,
    ec9: String,
    ec10: String,
    ec11: String,
    ec12: String,
    ec13: String,
    ec14: String,
    pf1: String,
    pf2: String,
    pf3: String,
    pf4: String,
    pf5: String,
    pf6: String,
    cr1: String,
    cr2: String,
    cr3: String,
    cr4: String,
    cr5: String,
    name: String,
    email:{
      type: String,
      required: true,
      unique: true
  },
    phone: String,
    organization: String,
    newnameurl: String,
    created_at: { type: Date, required: true, default: Date.now }
  
  });


module.exports = mongoose.model('Careercoachingsnapshottable', careercoachingsnapshot);



