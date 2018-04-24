const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hash(password, 10)
}

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compare(password, this.password)
}


module.exports = mongoose.model('User', UserSchema);
