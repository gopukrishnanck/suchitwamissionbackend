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
const LsgiSchema = mongoose.Schema({

    name : String,
    block_id : Number,
    lsgi_type_id:Number,
    image_id:Number,
    address: String,
    code:String,
    sort_order : Number,
    default_service_rate:Number,
    default_complaint_rate:Number,
    is_camera_surveillance_required:{
        type:Number,
        default:0
    },
    is_wastemanagement_required:{
        type:Number,
        default:0
    },
    service_assigment_expiry_hours:Number,
    rating_calculation_interval_hours:Number,
    last_rating_calculated_at:{
        type: Date,
    default:Date.now()

    },
    last_complaint_count_points_calculated_at:{
        type: Date,
    default:Date.now()
    },
    last_service_completion_calculated_at:{
        type: Date,
        default:Date.now()
    },
    complaints_count_rating_calculation_interval_hours:Number,
    default_service_point:Number,
    last_complaint_resolution_calculated_at:{
        type: Date,
        default:Date.now()
    },
    header_image_id:Number,
    footer_image_id:Number,
    default_slab_rate:Number,
    subscription_fee_collection_date:{
        type: Date,
        default:Date.now()
    },
    camera_fault_calculation_interval_hours:Number,
    gst_no:String,
    cgst_percentage:String,
    sgst_percentage:String,
    invoice_date:{
        type: Date,
        default:Date.now()

    },
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

  

}, params);


module.exports = mongoose.model('lsgi', LsgiSchema);


module.exports.addLsgi = function (newLsgi, callback) {
    newLsgi.save(callback);
  };


  