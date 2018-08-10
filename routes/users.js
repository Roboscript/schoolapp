var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var asyn = require('async');
var crypto = require('crypto');
var User = require('../models/user');
var Student =  require('../models/student');
var Teacher = require('../models/teacher');
var bcrypt = require('bcryptjs');



//Get Register view
router.get('/register', function(req, res){
  res.render('register');
});

//Register user
router.post('/register', function(req, res){

  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var password_confirm = req.body.password_confirm;

  //Validation
  req.checkBody('firstname', 'Firstname is required').notEmpty();
  req.checkBody('lastname', 'Lastname is required').notEmpty();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Invalid Email').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password_confirm', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();
//Check and return errors
  if(errors){
    res.render('register', {
      errors: errors
    });
  } else {
    var newUser = new User({
      firstname : firstname,
      lastname : lastname,
      username : username,
      email : email,
      password : password,
      role: "admin"

    });
    User.createUser(newUser, function(err, user){
      if(err) throw err;
    });
    req.flash('success_msg', 'You are now registered and can login');
    res.redirect('index');
  }
});

//Update user profile
router.post("/profileupdate", ensureAuthentication, function(req, res){
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.username;
  var email = req.body.email;
  var contact = req.body.contact;
  var address = req.body.address;

  var query ={_id:req.user.id};
  var newDetails ={ $set: {firstname: firstname, lastname:lastname, username : username, email: email, contact:contact, address:address } };
  User.updateOne(query, newDetails, function(err){
    if (err) throw err;
    var success="alert alert-success";
    var success_msg="Profile updated";
    res.render("./admin/admin-dashboard",{
      success :success,
      success_msg:success_msg
    })
  });

});

//Get Login
router.post('/changepassword',ensureAuthentication, function(req, res){
  var password = req.body.password;
  var new_password = req.body.new_password;
  var password_confirm = req.body.password_confirm;
  var psswrd = (req.user.password);



User.comparePassword(password, psswrd, function(err, isMatch){
  if (err) throw err;
  if (!isMatch){
      var error ="Incorrect password";
      var current_error="alert alert-danger";
      var clas="alert alert-danger"
      var data = "errormodal"
      res.render('./admin/admin-dashboard', {
        errors: error,
        data : data,
        clas : clas,
        current_error:current_error
      });

  }else if(isMatch){
    // validation
    req.checkBody('password_confirm').equals(new_password);
    var errors = req.validationErrors();
    //Check and return errors
    if(errors){
      var err ="Password do not match";
      var new_error="alert alert-danger";
      var clas="alert alert-danger"
      var data = "errormodal"
      res.render('./admin/admin-dashboard', {
        errors: err,
        data : data,
        clas : clas,
        new_error: new_error
      });
    }else{
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(new_password, salt, function(err, hash){
          new_password = hash;
          var query = {_id:req.user.id};
          var changepassword ={$set :{ password : new_password}};
          User.updateOne(query, changepassword, function(err){
            if (err) throw err;
            var success="alert alert-success";
            var success_msg="Password changed";
            res.render("./admin/admin-dashboard",{
              success :success,
              success_msg:success_msg
            })
          });
        /*  new_password.save(function( err, res){
            if (err) throw err;

          });*/
        });
      });
      ///Save new password

    }
  }
});

});

//Log user in
router.post('/login', passport.authenticate('local',{failureRedirect:'/', failureFlash: true }),
   function(req, res){
    if(req.user.role ==="admin"){
       res.redirect('/admin/admin-dashboard');
     } else if( req.user.role === "student"){
       res.redirect('/student/student-dashboard');
     } else  {
       res.redirect('/teacher/teacher-dashboard');
     }
  }
);

//Ensure the user is authentecated
function ensureAuthentication(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else{
    req.flash('error_msg', 'You are not logged in');
    var data="loginmodal";
    var nt = "onclick";
    res.render('index',{ data:data, nt:nt });
  }
}

//Log user out
router.get('/logout', function(req, res){
 req.logout();

 req.flash('success_msg', 'You are logged out');

 res.redirect('/');
});

module.exports = router;
