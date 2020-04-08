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
const SurveyquestionSchema = mongoose.Schema({
  question_en:String,
  question_ml:String,
  sortorder:Number,
  type: String,
  field_name:String,
  is_mandatory:{type:Boolean , default:false},
  is_phone:{type:Boolean , default:false},
  is_email:{type:Boolean , default:false},
  is_percentage_calculations:{type:Boolean , default:false},
  depend_quest:String,
  opt1name:String,
  opt1point:Number,
  opt1DepndQuest:String,
  opt2name:String,
  opt2point:Number,
  opt2DepndQuest:String,
  is_dep:{type:Boolean , default:false},

  createdat: { type:Date,default: Date.now()},
  modifiedat: { type:Date,default: Date.now()}

},params);


module.exports = mongoose.model('Survey questions', SurveyquestionSchema);


module.exports.addData = function (newdata, callback) {
    newdata.save(callback);
  };


  