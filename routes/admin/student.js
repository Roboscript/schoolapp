var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var User = require('../../models/user');
var router = express.Router();

//models
var Student = require('../../models/student');
var Teacher = require('../../models/teacher');

//Fees Management
router.get('/fees',ensureAuthentication, function(req, res){

  res.render('./admin/fees');
});

//Get All students
router.get('/admin-student-list',ensureAuthentication,function (req, res) {
    Student.find({}, function(err,student){
        if (err) throw err;
        res.render('./admin/admin-student-list', {
        //layout: false,
        student:student
    });


    });

});

//AJAX
router.get('/admin-student-list-data', function (req, res) {
var id=req.query.id;
  Student.findOne({_id:id}, function(err,data){
      if (err) throw err;
    res.json(data);

  });
});

//AJAX
router.get('/admin-student-list-delete', function (req, res) {

var id=req.query.id;
  Student.deleteOne({_id:id}, function(err,data){
      if (err) {
        Student.find({}, function(err,student){
            if (err) throw err;
            var error_msg ="Error deletin student";
            var alert = "alert alert-danger";
            res.render("/admin/admin-student-list",{
              error_msg:error_msg,
              alert:alert,
              student:student
            });


        });

      }

      Student.find({}, function(err,student){
          if (err) throw err;
          var success_msg="successfully deleted";
          var alert ="alert alert-success";
          res.render('./admin/admin-student-list', {
          //layout: false,
          student:student,
          success_msg:success_msg,
          alert:alert,
          
      });


      });


});
});
//Add student
//Get add student
router.get('/admin-add-student', ensureAuthentication, function(req, res){
  res.render('./admin/admin-add-student');
});
// post add student
router.post('/admin-add-student',ensureAuthentication, function (req, res) {
            var firstname = req.body.firstname;
            var middlename = req.body.middlename;
            var lastname = req.body.lastname;
            var email = req.body.email;
            var password = req.body.password;
            var classs = req.body.class;
            var gender = req.body.gender;
            var contact = req.body.contact;
            var father  = req.body.father;
            var occupation =req.body.occupation;
            var mother = req.body.mother;
            var altemail = req.body.altemail;
            var address = req.body.address;
            var parentreligion = req.body.parentreligion;
            var nationality =req.body.nationality;
            var zip = req.body.zip;
            var regnum = req.body.regnum;
            var lastclass = req.body.lastclass;
            var lastxul = req.body.lastxul;
            var sport = req.body.sport;
            var marks = req.body.marks;
            var section = req.body.section;
            var roll = req.body.roll;
            var state = req.body.state;
            var country = req.body.country;
            var religion = req.body.religion;
            var cell = req.body.cell;
            var cell2 = req.body.cell2;
            var DOB= req.body.DOB;
            var created_at = new Date();


            Student.findOne({regnum}, function (err, student) {
            if (err) { return next(err); }

            if (!student) {
                //  the student does not exist
                var newStudent = new Student({
                    firstname:firstname,
                    middlename:middlename,
                    lastname:lastname,
                    password:password,
                    email:email,
                    classs:classs,
                    gender:gender,
                    contact:contact,
                    occupation:occupation,
                    father:father,
                    mother:mother,
                    altemail:altemail,
                    address:address,
                    parentreligion:parentreligion,
                    nationality:nationality,
                    zip:zip,
                    regnum:regnum,
                    lastclass:lastclass,
                    lastxu:lastxul,
                    sport:sport,
                    marks:marks,
                    section:section,
                    roll:roll,
                    state:state,
                    country:country,
                    religion:religion,
                    cell:cell,
                    cell2:cell2,
                    DOB:DOB,
                    created_at:created_at,
                    role:"student"
                });
                Student.createStudent(newStudent, function(err, student){
                  if(err) throw err;
                });
                   var success_msg= "You have successfully add a student....... ";
                   var alert ="alert alert-success";
                   res.render('./admin/admin-add-student',{
                     success_msg:success_msg,
                     alert:alert
                     //layout:false
                   });
            }

            if (student) {
                //  the student exists
                var error_msg = "Ooops that student was already in the system...... ";
                var alert ="alert alert-danger"
                res.render('./admin/admin-add-student', {
                    error_msg: error_msg,
                    alert:alert
                    //layout:false
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
