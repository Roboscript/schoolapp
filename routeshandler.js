/// All files ar routed here
var express = require('express');
module.exports=function(){
  var routes = require('./routes/index');
  var users = require('./routes/users');
  var admin_dashboard = require('./routes/admin/admin_dashboard');
  var student_dashboard = require('./routes/student/student_dashboard');
  var teacher_dashboard = require('./routes/teacher/teacher_dashboard');
}
