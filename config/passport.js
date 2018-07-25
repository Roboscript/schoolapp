var LocalStrategy = require('passport-local').Strategy;
var config = require('../config/database');
var bcrypt = require('bcryptjs');

//models
var User = require('../models/user');
var Student = require('../models/student');
var Teacher = require('../models/teacher');

module.exports = function(passport){
/// serialize and deserialize starts
passport.serializeUser((obj, done) => {
  if (obj instanceof Student) {
    done(null, { id: obj.id, type: 'Student' });
  } else if (obj instanceof Teacher) {
    done(null, { id: obj.id, type: 'Teacher'});
  } else {
    done(null, { id: obj.id, type: 'User' });
  }
});

passport.deserializeUser((obj, done) => {
  if (obj.type === 'Student') {
    //Student
    Student.getStudentById(obj.id,function(err, student){
      done(err, student);
    });
    //Account.get(obj.id).then((account) => done(null, account));
  }else if (obj.type === 'Teacher') {
    //TEACHER
    Teacher.getTeacherById(obj.id,function(err, teacher){
      done(err, teacher);
    });
  } else {
    User.getUserById(obj.id, function(err, user) {
      done(err, user);
    });
    //User.get(obj.id).then((user) => done(null, user));
  }
});

  passport.use(new LocalStrategy(function (username, password, done) {
    //Check student
    Student.getStudentRegnum(username, function(err, student){
      if (err) throw err;
      if(!student){
        //Check teacher
        Teacher.getTeacherEc(username, function(err, teacher){
          if (err) throw err;
          if(!teacher){
            //check admin
             User.getUserByUsername(username, function(err, user){
               if (err) throw err;
               if (!user){
                 console.log("Unkown user");
                 return done(null, false, {message:"Unkown user"});
               }else {
                 User.comparePassword(password, user.password, function(err, isMatch){
                  
                   if(err) throw err;
                   if(isMatch){
                     return done(null, user);
                   } else{
                     return done(null, false, {message: 'Invalid password'});
                   }
                 });
               }

             });
          }else {
            Teacher.comparePassword(password, teacher.password, function(err, isMatch){
              if(err) throw err;
              if(isMatch){
                return done(null, teacher);
              } else{
                return done(null, false, {message: 'Invalid password'});
              }
            });
          }
        });
      } else {
        Student.comparePassword(password, student.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
              return done(null, student);
            } else{
              return done(null, false, {message: 'Invalid password'});
            }
          });
      }
    });
    }
  ));
}
