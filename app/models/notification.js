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
const notificationSchema = mongoose.Schema({

  sl_no:Number,
  title:String,
  content:String,
  date:{ type:Date,default: Date.now()},
  modifiedat: { type:Date,default: Date.now()}

},params);


module.exports = mongoose.model('notification', notificationSchema);


module.exports.addData = function (newdata, callback) {
    newdata.save(callback);
  };


  