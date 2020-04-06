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
const PercentageSchema = mongoose.Schema({
   
  sl_no:Number,
  start_value: Number,
  end_value:Number,
  point:Number,
  created_at : {
    type: Date,
    default:Date.now()
  } , 
  modified_at : {
    type: Date,
    default:Date.now()
  }
},params);


module.exports = mongoose.model('percentage', PercentageSchema);


module.exports.addnewPercentage = function (newPercentage, callback) {
  newPercentage.save(callback);
  };


  