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
const settingsSchema = mongoose.Schema({
    sl_no:Number,
    title : String,
    description :String,
    phone:Number,
    email:String,
  created_at : {
    type: Date,
    default:Date.now()
  } ,

},params);


module.exports = mongoose.model('settingss', settingsSchema);


module.exports.addSetting = function (newSetting, callback) {
    newSetting.save(callback);
  };


  