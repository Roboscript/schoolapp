var express = require('express');
var router = express.Router();

//Get routers
var Student = require('../../models/student');
var Teacher = require('../../models/teacher');
var Classes = require ('../../models/class');
var Subject = require ('../../models/subjects');
var Announcement = require ('../../models/announcements');

//Get Login
router.get('/admin-dashboard',ensureAuthentication, function(req, res){
  var firstname = req.user.firstname;
  var lastname = req.user.lastname;
  var username = req.user.username;
  var email = req.user.email;
  var contact = req.user.contact;
  var address = req.user.address;
  res.render('./admin/admin-dashboard',{
    firstname : firstname,
    lastname : lastname,
    username:username,
    email : email,
    contact: contact,
    address : address
  });
});

// get class timetable
router.get('/admin-class-timetable',ensureAuthentication, function (req, res) {
    res.render('./admin/admin-class-timetable', {
        //layout: false
    });
});

// get create timetable
router.get('/admin-create-timetable',ensureAuthentication, function (req, res) {
    res.render('./admin/admin-create-timetable', {
        //layout: false
    });
});

// get add class
router.get('/admin-add-class', ensureAuthentication, function (req, res) {
  Classes.find({}, function(err,classes){
      if (err) throw err
      res.render('./admin/admin-add-class', {
      //layout: false,
      classes:classes
  });
  });
});
// get add class
router.get('/admin-add-classData', ensureAuthentication, function (req, res) {
  Teacher.find({}, function(err,data){
      if (err) throw err
      res.json(data);
  });
});

// post add class
router.post('/admin-add-class', ensureAuthentication, function (req, res) {
  var class_code = req.body.class_code
  var class_country = req.body.country;
Classes.findOne({classcode:class_code }, function(err, classes){
  if (err) throw err;
  if (classes){
    var error_msg ="Class already exits";
    var alert ="alert alert-danger";
    res.render('./admin/admin-add-class',{
      error_msg:error_msg,
      alert : alert,
      classes:classes
    });
  }else{
  var newClass = new Classes({
    clss : req.body.class_name,
    classcode : req.body.class_code,
    teachers : req.body.class_teacher,
    description : req.body.description

  });
  Classes.createClass(newClass, function(err, clss){
    console.log(clss);
    if (err) throw err;
    Classes.find({}, function(err, classes){
      if (err) throw err;
      var success_msg ="Class successfully added";
      var alert ="alert alert-success";
      res.render('./admin/admin-add-class',{
        success_msg:success_msg,
        alert : alert,
        classes :classes
      });
    });

  });
}
});
});

// get add subject
router.get('/admin-add-subject',ensureAuthentication, function (req, res) {
  Subject.find({},function(err, subject){
    if (err) throw err;
    if (subject){
      res.render('./admin/admin-add-subject', {
          //layout: false
          subject:subject
      });
    }
  });

});

//  add subject
router.post('/admin-add-subject',ensureAuthentication, function (req, res) {
  var created_at = new Date();
  var newSubject= new Subject({
    name : req.body.name,
    category : req.body.category,
    description : req.body.description,
    subject_code : req.body.subject_code,
    clss : req.body.clss,
     sylabus_material:req.user.sylabus_material,
    created_at : created_at,

  });
  Subject.findOne({subject_code:req.body.subject_code}, function(err, subject){
    if (err) throw err;
    if (subject) {
      Subject.find({},function(err, subject){
        if (err) throw err;
        if (subject){
          var error_msg ="Subject already exits";
          var alert ="alert alert-danger";
          res.render('./admin/admin-add-subject', {
              //layout: false
              error_msg:error_msg,
              alert: alert,
              subject:subject
          });
        }
      });

    }else{
      Subject.createSubject(newSubject, function(err,subject){
        if (err){
          Subject.find({},function(err, subject){
            if (err) throw err;
            if(subject){
              var error_msg ="Error creating subject";
              var alert ="alert alert-danger";
              res.render('./admin/admin-add-subject', {
                  //layout: false
                  error_msg:error_msg,
                  alert: alert
              });
            }
          });
        }else {
          Subject.find({},function(err, subject){
            if (err) throw err;
            var success_msg ="Subject successfully added";
            var alert ="alert alert-success";
            res.render('./admin/admin-add-subject', {
                //layout: false
                success_msg:success_msg,
                alert: alert,
                subject:subject
            });
          });

        }

      });
    }
  });

});

// get add announcement
router.get('/admin-add-announcement',ensureAuthentication, function (req, res) {
  Announcement.find({}, function(err, announcement){
    if (err) throw err;
    res.render('./admin/admin-add-announcement', {
        //layout: false
        announcement:announcement,
    });
  });

});


//post announcement
router.post('/admin-add-announcement',ensureAuthentication, function (req, res) {
  var created_at = new Date();
  var newAnnouncement= new Announcement({
    type : req.body.type,
    to : req.body.to,
    subject : req.body.subject,
    message : req.body.message,
    creator :req.user.username,
    created_at : created_at,
    description :req.body.message
  });
  Announcement.createAnnouncements(newAnnouncement, function(err,announcement){
    if (err){
      var error_msg ="Error creating announcement";
      var alert ="alert alert-danger";
      res.render('./admin/admin-add-announcement', {
          //layout: false
          error_msg:error_msg,
          alert: alert
      });
    }else {
      Announcement.find({},function(err, announcement){
        var success_msg ="Announcement successfully created";
        var alert ="alert alert-success";
        res.render('./admin/admin-add-announcement', {
            //layout: false
            success_msg:success_msg,
            alert: alert,
            announcement:announcement
        });
      });

    }

  });

});
// get add section
router.get('/admin-add-section',ensureAuthentication, function (req, res) {
    res.render('./admin/admin-add-section', {
        //layout: false
    });
});

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

module.exports = router;
