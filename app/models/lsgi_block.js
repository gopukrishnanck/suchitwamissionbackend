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
const LsgiBlockSchema = mongoose.Schema({

    name : String,
    code : String,
    assembly_constituency_id:Number,
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
module.exports = mongoose.model('lsgi_block', LsgiBlockSchema);
module.exports.addLsgiBlock = function (newLsgiBlock, callback) {
    newLsgiBlock.save(callback);
  };


  