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
const LsgiTypeSchema = mongoose.Schema({
  
    name_el:String,
    name_ml:String,
  created_at : {
    type: Date,
    default:Date.now()
  } , 
  modified_at : {
    type: Date,
    default:Date.now()
  }
},params);


module.exports = mongoose.model('lsgi_types', LsgiTypeSchema);


module.exports.addLsgi = function (newLsgi, callback) {
    newLsgi.save(callback);
  };


  