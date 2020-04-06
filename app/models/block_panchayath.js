const mongoose = require('mongoose');
require('./state');

function transform(doc,ret){
  if(ret.district_id){
    ret.district= ret.district_id;
    delete ret.district_id;
  }
  else{
    ret.district={
      name_el:'',
      name_ml:''

    }
  }



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
const BLOCKTypeSchema = mongoose.Schema({
    
    name_el:String,
    name_ml:String,

    district_id:{
      ref:'district',
     type :mongoose.Schema.Types.ObjectId
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


module.exports = mongoose.model('block', BLOCKTypeSchema);


module.exports.addnewBLOCK = function (newBLOCK, callback) {
    newBLOCK.save(callback);
  };


  