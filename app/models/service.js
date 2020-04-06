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
const ServiceSchema = mongoose.Schema({

    name :   String,
    image_id: Number,
    waste_collection_method: String,
    waste_category_id:Number,
    ask_waste_quality:{
        type:Number,
        default:0},
    ask_waste_quantity:{
        type:Number,
        default:0},
    sort_order:Number,
    type:Number,
    is_public:{
        type:Number,
        default:0
    },
    is_special_service:{
        type:Number,
        default:0
    },
    is_package:{
        type:Number,
        default:0
    },

    name_ml:String,
    is_quantity_entering_enabled:{
        type:Number,
        default:0
    },
    is_non_residential:{
        type:Number,
        default:0
    },
    customer_type:Number,
    is_residential:{
        type:Number,
        default:0},
    is_cityzen:{
        type:Number,
        default:0
    },
    service_id:Number,
  sort_order:Number,
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


module.exports = mongoose.model('Service', ServiceSchema);


module.exports.addservice = function (newService, callback) {
    newService.save(callback);
  };


  