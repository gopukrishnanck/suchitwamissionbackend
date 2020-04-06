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
const gradeSchema = mongoose.Schema({
   
  name:String,
  start_value: Number,
  end_value:Number,
  grade:String,

},params);


module.exports = mongoose.model('grade', gradeSchema);


module.exports.addnewgrade = function (newgrade, callback) {
    newgrade.save(callback);
  };


  