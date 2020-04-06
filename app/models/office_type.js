const mongoose = require('mongoose');
require('./state');

function transform(doc,ret){
  var id = doc._id;
  delete ret._id;
  ret.id = id;
  console.log(id)
}
var params =  {
  toObject: {
    transform: transform
  },
  toJSON: {
    transform: transform
  }
};
  


//User Schema
const OfficeTypeSchema = mongoose.Schema({
    sl_no:Number,
    name:String,
  created_at : {
    type: Date,
    default:Date.now()
  } , 
  modified_at : {
    type: Date,
    default:Date.now()
  }
},params);


module.exports = mongoose.model('office_types', OfficeTypeSchema);


module.exports.addnewOffice = function (newOffice, callback) {
    newOffice.save(callback);
  };


  