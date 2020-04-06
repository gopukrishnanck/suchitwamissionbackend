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
const CatSchema = mongoose.Schema({

    name_el : String,
    name_ml: String,
    image: String,
    image_base:String,
    child_page_layout:String,

  sort_order:Number,
 

  

  

},params);


module.exports = mongoose.model('category', CatSchema);


module.exports.addCat = function (newCat, callback) {
    newCat.save(callback);
  };


  