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
const controllerSchema = mongoose.Schema({

  sl_no:Number,
  name:String,
  createdat: { type:Date,default: Date.now()},
  modifiedat: { type:Date,default: Date.now()}

},params);


module.exports = mongoose.model('controller',controllerSchema);


module.exports.addData = function (newdata, callback) {
    newdata.save(callback);
  };


  