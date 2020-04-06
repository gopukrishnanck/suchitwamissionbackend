const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
const userSchema = mongoose.Schema({

    username:String,
    password:String,
    email:String,
    name:String,
    middlename:String,
    lastname:String,
    designation:String,
    gender:String,
    phone:Number,
    role:String,
    district:String,
    lsgitype:String,
    lsgiblock:String,
    lsgi:String,
    img:String,
  createdat: { type:Date,default: Date.now()},
  modifiedat: { type:Date,default: Date.now()}

},params);


module.exports = mongoose.model('userblockteam',userSchema);

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  };



  