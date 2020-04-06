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
const stateSchema = mongoose.Schema({
    sl_no:Number,
    officename:String,
    email:String,
    address:String,
    leadpersonname:String,
    leadpersondesignation:String,
    surveyorname:String,
    blockpanchayathname:String,
    departmentname:String,
    districtname:String,
    lsginame:String,
    lsgitype:String,
    officetypename:String,
    informername:String,
    informerdesignation:String,
    informerphone:Number,
    phone: Number,
    lat: Number,
    lng: Number,
    surveydate:Date,
    totalpoint:Number,
    grade:String,
    created_at: { type:Date,default: Date.now()},
    modified_at: { type:Date,default: Date.now()}
},params);


module.exports = mongoose.model('Surveyresults', stateSchema);


module.exports.addData = function (newData, callback) {
        newData.save(callback);
  };


  