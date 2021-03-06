var mongoose  = require('mongoose');
var bcrypt = require('bcryptjs');


//User Schema
var UserSchema = mongoose.Schema({
  firstname:{
    type: String,

  },
  lastname:{
    type: String,

  },
  username:{
    type: String,
    unique: true,
    required: true,
    trim: true

  },
  address:{
       type:String,

  },
  contact:{
       type:String,

  },
  email:{
    type: String,
    unique: true,
    required: true,
    trim: true

  },
  role:{
    type:String,

  },
  password:{
    type: String,
  },
  created_at:{
    type: Date,
    required: true,
  },
  updated_at:{
    type:Date,
    required:true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

var User = module.exports = mongoose.model('User', UserSchema);
//Create new user
module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newUser.password, salt, function(err, hash){
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}
//Get username
module.exports.getUserByUsername = function (username, callback) {
  var query = {username : username };
  User.findOne(query, callback);

}

//Get userId
module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);

}

//Get password and compare
module.exports.comparePassword = function (candidatePassword, hash, callback) {

  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  });
}
