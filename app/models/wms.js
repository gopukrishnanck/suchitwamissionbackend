const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//User Schema
const WmsSchema = mongoose.Schema({

    name: String,

    email: String,

    username: String,

    password: String,

    phone: Number,
    address: String,

    is_residential_customer: Number,

    img: String,
    doc: String,
    vid: String
});


const UserWms = module.exports = mongoose.model('UserWms', WmsSchema);

module.exports.addUserdata = function (newUser, callback) {
    newUser.save(callback);
}
module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  };

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    UserWms.findOne(query, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};

module.exports.getUserById = function (id, callback) {
    UserWms.findById(id, callback);
  };
  