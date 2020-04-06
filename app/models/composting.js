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
  if(ret.category_relationship_id){
    ret.relational_category= ret.category_relationship_id;
    delete ret.category_relationship_id;
  }
  else{
    ret.relational_category={
      parent_category:'',
      child_category:''

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
const BuildingTypeSchema = mongoose.Schema({

   is_fee_collected_from_customer:String,
   controllig_authority:String,
   name_of_site:String,
   design_life_years:String,
   type_of_facility:String,
   name_of_facility:String,
   ward:String,
   area_of_land_acres:String,
   technology:String,
   maximum_capacity_tdp:String,
   compost_quantity_tdp:String,
   waste_quantity:String,
   is_operational:String,
   date_of_establishment:String,
   lat:String,
   lng:String,
   photos:[{
     image:String
   }],
 
 surveyed_by:String,
 category_id:{
  ref:'category',
 type :mongoose.Schema.Types.ObjectId
},
category_relationship_id:{
  ref:'sub_category',
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


module.exports = mongoose.model('composting', BuildingTypeSchema);


module.exports.addcom = function (newcom, callback) {
    newcom.save(callback);
  };


  