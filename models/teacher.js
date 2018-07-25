var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');





// teacherSchema Schema
var teacherSchema = mongoose.Schema({

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    address2: {
        type: String
    },
    password: {
        type: String,
        required:true
    },
    firstname: {
        type: String
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String
    },
    gender: {
        type: String
    },
    contact: {
        type: String
    },

    degree: {
        type: String
    },
    university: {
        type: String
    },
    role: {
        type: String
    },
    year: {
        type: String
    },
    altemail: {
        type: String
    },
    address: {
        type: String
    },
    cgpa: {
        type: String
    },
    ec: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    zip: {
        type: String
    },
    otherdegree: {
        type: String
    },
    university2: {
        type: String
    },
    year2: {
        type: String
    },
    cgpa2: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    religion: {
        type: String
    },
    cell: {

        type: String
    },
    DOB: {

        type: String
    },
    cell2: {

        type: String
    },
    created_at:{
      type: Date,
      required: true,
    },
    updated_at:{
      type:Date,
    }



});

var Teacher = module.exports = mongoose.model('Teacher', teacherSchema);

//Create new Teacher
module.exports.createTeacher = function(newTeacher, callback){
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newTeacher.password, salt, function(err, hash){
      newTeacher.password = hash;
      newTeacher.save(callback);
    });
  });
}

//Get techer ecnum
module.exports.getTeacherEc = function (username, callback) {
  var query = {ec : username };
  Teacher.findOne(query, callback);

}

//Get userId
module.exports.getTeacherById = function (id, callback) {
  Teacher.findById(id, callback);

}

//Get password and compare
module.exports.comparePassword = function (candidatePassword, hash, callback) {

  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  });
}
