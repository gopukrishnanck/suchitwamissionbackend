const mongoose = require('mongoose');
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
const WardSchema = mongoose.Schema({
    ward_number: Number,
    name_el : String,
    name_ml: String,
   

  created_at : {
    type: Date,
    default:Date.now()
  } ,

  
  modified_at : {
    type: Date,
    default:Date.now()
  }

  

},params);


module.exports = mongoose.model('Ward', WardSchema);


module.exports.addWard = function (newWard, callback) {
    newWard.save(callback);
  };


  