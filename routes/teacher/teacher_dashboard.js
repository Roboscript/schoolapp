const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

//Get routers
var Assignment = require('../../models/assignment');
var Classes = require('../../models/class');
var Subjects = require('../../models/subjects');

// Set Storage Engine
const storage = multer.diskStorage({
  destination:'./public/uploads/',
  filename:function(req,file,cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage:storage,
  limits:{fileSize:1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file,cb);
  }
}).single('assignment');

// Check file type
function checkFileType(file, cb){
  // Allowed extensions
  const filetypes = /doc|docx|odt|pdf|xls|xlsx|ppt|pptx|txt|ods/;
  // Check Extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check the mime type
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true );
  } else{
      cb('You can only upload documents');
  }
}

// Post Upload
router.post('/teacher-create-assignment', ensureAuthentication, function(req, res){
  
  upload(req,res,(err)=>{
    if(err){
     // console.log(err);
      var alert ="alert alert-danger";
       res.render('./teacher/teacher-create-assignment', {
        msg:err,
        alert : alert
      });
    } else{
      if(req.file == undefined){
        var alert ="alert alert-danger";
        var msg = "No file Selected"
       res.render('./teacher/teacher-create-assignment', {
          msg: msg,
          alert: alert
        });
      } else {
        
        let assignment = new Assignment();
        assignment.class = req.body.class;
        assignment.subject = req.body.subject;
        assignment.submitBy = req.body.submitBy;
        assignment.remarks = req.body.remarks;
        assignment.file = `uploads/${req.file.filename}`;
        assignment.createdAt = Date.now();
        assignment.uploadedBy = req.user.id;

        assignment.save(function(err){
          if(err){
            console.log(err);
            return;
          } else{
            var alert ="alert alert-success";
            var msg = "Assignment uploaded Successfully!!!"
            res.render('./teacher/teacher-create-assignment', {
                msg: msg,
                alert: alert
              });
          }
        });
      }
    }
  });

});

//Get All Assignments
router.get('/teacher-assignment-download',ensureAuthentication,function (req, res) {
  var query = {uploadedBy:req.user.id};
  Assignment.find(query, function(err,assignment){
      if (err) throw err;
      res.render('./teacher/teacher-assignment-download', {
          //layout: false,
          assignment:assignment
      });
  });
});

//Get Login
router.get('/teacher-dashboard',ensureAuthentication, function(req, res){
  res.render('./teacher/teacher-dashboard');
});
router.get('/teacher-add-student-marks',ensureAuthentication, function(req, res){
  res.render('./teacher/teacher-add-student-marks');
});

router.get('/teacher-attendence-report',ensureAuthentication, function(req, res){
  res.render('./teacher/teacher-attendence-report');
});
router.get('/teacher-create-assignment',ensureAuthentication, function(req, res){
  Classes.find({}, function (err, classes) {
      if (err) {
          console.log(err);
      } else {
          const sdata = [];
          for (i = 0; i < classes.length; i++) {
              sdata.push(classes[i].clss);
          }   
          Subjects.find({}, function (err, subjects) {
            if (err) {
                console.log(err);
            } else {
                const sdatas = [];
                for (i = 0; i < subjects.length; i++) {
                    sdatas.push(subjects[i].name);
                }
                res.render('./teacher/teacher-create-assignment', {
                  sdata: sdata,
                  sdatas: sdatas
                });
            }
          });
      }
  });

});
router.get('/teacher-mark-student-attendence',ensureAuthentication, function(req, res){
  res.render('./teacher/teacher-mark-student-attendence');
});
router.get('/teacher-marks-report',ensureAuthentication, function(req, res){
  res.render('./teacher/teacher-marks-report');
});
router.get('/teacher-timetable',ensureAuthentication, function(req, res){
  res.render('./teacher/teacher-timetable');
});
router.get('/teacher-marks-report',ensureAuthentication, function(req, res){
  res.render('./teacher/teacher-marks-report');
});
router.get('/teacher-view-student-attendence',ensureAuthentication, function(req, res){
  res.render('./teacher/teacher-view-student-attendence');
});
router.get('/teacher-view-student-marks',ensureAuthentication, function(req, res){
  res.render('./teacher/teacher-view-student-marks');
});




//Ensure the user is authentecated
function ensureAuthentication(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else{
    req.flash('error_msg', 'You are not logged in');
    var data="loginmodal";
    res.render('index',{ data:data });
  }
}

module.exports = router;
