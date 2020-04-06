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
const DepartmentsTypeSchema = mongoose.Schema({
  
    name_el : String,
    name_ml : String,
  //   office:{
  //     sl_no:Number,
  //     name:Number
  //   },
  created_at : {
    type: Date,
    default:Date.now()
  }, 
  modified_at : {
    type: Date,
    default:Date.now()
  }

  

},params);


module.exports = mongoose.model('Departments', DepartmentsTypeSchema);


module.exports.addDepartments= function (newDepartments, callback) {
  newDepartments.save(callback);
  };


  