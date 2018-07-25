var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var User = require('../../models/user');
var router = express.Router();


//models
var Student = require('../../models/student');
var Teacher = require('../../models/teacher');

// get add teacher
router.get('/admin-add-teacher',ensureAuthentication, function (req, res) {
    res.render('./admin/admin-add-teacher', {
        //layout: false
    });
});

// get teacher list
router.get('/admin-teacher-list', ensureAuthentication, function (req, res) {
   Teacher.find({}, function(err,teacher){
        if (err){
            console.log(err);
        }
        console.log(teacher);
        res.render('./admin/admin-teacher-list', {
        //layout: false,
        teacher:teacher
    });


    });

});

//AJAX return techer data to modal
router.get('/admin-teacher-list-data', function (req, res) {
var id=req.query.id;
  Teacher.findOne({_id:id}, function(err,data){
      if (err) throw err;
    res.json(data);

  });
});

//AJAX cornfirm delete teacher
router.get('/admin-teacher-list-delete', function (req, res) {

var id=req.query.id;
  Teacher.deleteOne({_id:id}, function(err,data){
      if (err) {
        Teacher.find({}, function(err,teacher){
            if (err) throw err;
            var error_msg ="Error deletin teacher";
            var alert = "alert alert-danger";
            res.render("/admin/admin-teacher-list",{
              error_msg:error_msg,
              alert:alert,
              teacher:teacher
            });


        });

      }

      Teacher.find({}, function(err,teacher){
          if (err) throw err;
          var success_msg="successfully deleted";
          var alert ="alert alert-success";
          res.render('./admin/admin-teacher-list', {
          //layout: false,
          teacher:teacher,
          success_msg:success_msg,
          alert:alert,

      });


      });


});
});

//Create New teacherInfor
// post add teacher
router.post('/admin-add-teacher',ensureAuthentication, function (req, res) {
    var firstname = req.body.firstname;
    var middlename = req.body.middlename;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var address2 = req.body.address2;
    var gender = req.body.gender;
    var contact = req.body.contact;
    var degree = req.body.degree;
    var university = req.body.university;
    var year = req.body.year;
    var altemail = req.body.altemail;
    var address = req.body.address;
    var cgpa = req.body.cgpa;
    var nationality = req.body.nationality;
    var zip = req.body.zip;
    var degree2 = req.body.degree2;
    var university2 = req.body.university2;
    var year2 = req.body.year2;
    var cgpa2 = req.body.cgpa2;
    var state = req.body.state;
    var country = req.body.country;
    var religion = req.body.religion;
    var cell = req.body.cell;
    var cell2 = req.body.cell2;
    var DOB = req.body.DOB;
    var ec = req.body.ec;
    var password = req.body.password;
    var created_at= new Date();

    Teacher.findOne({
        ec
    }, function (err, teacher) {
        if (err) {
            return next(err);
        }

        if (!teacher) {
            //  the teacher does not exist
            var newTeacher = new Teacher({
                firstname: firstname,
                middlename: middlename,
                lastname: lastname,
                email: email,
                address2: address2,
                gender: gender,
                contact: contact,
                degree: degree,
                university: university,
                degree2: degree2,
                altemail: altemail,
                address: address,
                university2: university2,
                zip: zip,
                year: year,
                year2: year2,
                cgpa: cgpa,
                cgpa2: cgpa2,
                state: state,
                country: country,
                religion: religion,
                cell: cell,
                cell2: cell2,
                DOB: DOB,
                ec:ec,
                role:"teacher",
                password:password,
                created_at:created_at
            });
            Teacher.createTeacher(newTeacher,function (err, teacher) {
                if (err) throw err
                    console.log(err);
                });
                console.log(teacher);
                var alert  ="alert alert-success";
                var success_msg = "You have successfully add a Teacher....... ";
                res.render('./admin/admin-add-teacher', {
                    success_msg: success_msg,
                    alert : alert 
                    //layout: false
                });
            }
        if (teacher) {
            //  the teacher exists
            var alert ="alert alert-danger";
            var confirm = "Ooops that Teacher was already in the system...... ";
            res.render('admin-add-teacher', {
                success_msg: success_msg,
                alert:alert
                //layout: false
            });
        }
       });
    });


//Ensure the user is authentecated
function ensureAuthentication(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else{
    req.flash('error_msg', 'You are not logged in');
    var data="loginmodal";
    var nt  ="onclick";
    res.render('index',{ data:data, nt:nt });
  }
}

module.exports = router;
