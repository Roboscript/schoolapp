var express = require('express');
var router = express.Router();

//Get  student_dashboard
router.get('/student-dashboard',ensureAuthentication, function(req, res){
  
  res.render('./student/student-dashboard');
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
