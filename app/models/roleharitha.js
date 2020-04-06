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
const roleSchema = mongoose.Schema({

  sl_no:Number,
  name:String,
  parentroles:{
        permissions: [
             {
                  name:String,
                  id:Number,
                  is_enabled:Boolean
             }
         ]
  },
  permissions:[
    {
       title:String,
       permissions: [
           {
                name:String,
                id:Number,
                is_enabled:Boolean
           }
       ]
    }
 ],
 assignAssociationtorole:{
    permissions: [
         {
              name:String,
              id:Number,
              is_enabled:Boolean
         }
     ]
  },
  createdat: { type:Date,default: Date.now()},
  modifiedat: { type:Date,default: Date.now()}

},params);


const UserWms = module.exports = mongoose.model('role',roleSchema);


module.exports.addData = function (newdata, callback) {
    newdata.save(callback);
  };

  module.exports.getRoleByName = function (name, callback) {
    const query = { name: name }
    UserWms.findOne(query, callback);
};
  