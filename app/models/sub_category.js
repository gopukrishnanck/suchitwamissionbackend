const mongoose = require('mongoose');
function transform(doc,ret){

  if(ret.category_id){
    ret.category= ret.category_id;
    delete ret.category_id;
  }
  else{
    ret.category={
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
const subSchema = mongoose.Schema({

    category_id:{
      ref:'category',
     type :mongoose.Schema.Types.ObjectId
    },
  sort_order:Number



},params);


module.exports = mongoose.model('sub_category', subSchema);


module.exports.addSub = function (newSub, callback) {
    newSub.save(callback);
  };


  