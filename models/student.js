var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var studentSchema = mongoose.Schema({

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    classs: {
        type: String
    },
    password: {
        type: String
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
    father: {
        type: String
    },
    mother: {
        type: String
    },
    occupation: {
        type: String
    },
    altemail: {
        type: String
    },
    address: {
        type: String
    },
    parentreligion: {
        type: String
    },
    nationality: {
        type: String
    },
    zip: {
        type: String
    },
    marks: {
        type: String
    },
    regnum: {
        type: String,
        unique: true,
        required: true,

    },
    lastxul: {
        type: String
    },
    section: {
        type: String
    },
    roll: {
        type: String
    },
    role: {
        type: String
    },
    lastclass: {
        type: String
    },
    sport: {
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
var Student = module.exports = mongoose.model('Student', studentSchema);
//Create new Student
module.exports.createStudent = function(newStudent, callback){
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newStudent.password, salt, function(err, hash){
      newStudent.password = hash;
      newStudent.save(callback);
    });
  });
}

//Get student regnum
module.exports.getStudentRegnum = function (username, callback) {
  var query = {regnum : username };
  Student.findOne(query, callback);

}

//Get userId
module.exports.getStudentById = function (id, callback) {
  Student.findById(id, callback);

}

//Get password and compare
module.exports.comparePassword = function (candidatePassword, hash, callback) {

  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  });
}
