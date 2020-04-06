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
const questionSchema = mongoose.Schema({

  sl_no:Number,
  question_en:String,
  question_ml:String,
  sortorder:Number,
  type: String,
  point: Number,
  minlength:Number,
  maxlength:Number,
  isMandatory:{type:Boolean , default:false},
  isPhone:{type:Boolean , default:false},
  isEmail:{type:Boolean , default:false},
  isPercentagecalculations:{type:Boolean , default:false},
  dependQuest:String,
  errmsg:String,
  opt1name:String,
  opt1point:Number,
  opt1DepndQuest:String,
  opt2name:String,
  opt2point:Number,
  opt2DepndQuest:String,
  isDep:{type:Boolean , default:false},

  createdat: { type:Date,default: Date.now()},
  modifiedat: { type:Date,default: Date.now()}

},params);


module.exports = mongoose.model('questions', questionSchema);


module.exports.addData = function (newdata, callback) {
    newdata.save(callback);
  };


  