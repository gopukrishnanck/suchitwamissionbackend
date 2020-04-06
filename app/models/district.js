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
const DistrictSchema = mongoose.Schema({

    name : String,
    state_id: Number,
    state_name:String,
    // state:[{ type: mongoose.Schema.Types.ObjectId, ref: 'State' }],
    

  sort_order : Number,
  status : {
      type : Number,
      default : 1

  },

  created_at : {
    type: Date,
    default:Date.now()
  } ,

  
  modified_at : {
    type: Date,
    default:Date.now()
  }


},params);


module.exports = mongoose.model('district', DistrictSchema);


module.exports.addDistrict = function (newDistrict, callback) {
    newDistrict.save(callback);
  };


  