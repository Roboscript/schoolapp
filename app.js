var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
var config = require('./config/database');
var mongoose = require('mongoose');
//Db connections
mongoose.connect(config.database);

let db = mongoose.connection;
//Check db connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for db errors
db.on('error', function(err){
  console.log(err);
});

//Routes
var index = require('./routes/index');
var users = require('./routes/users');
//Admin
var admin_dashboard = require('./routes/admin/admin_dashboard');
var studentInfor = require('./routes/admin/teacher');
var teacherInfor = require('./routes/admin/student');
//Student
var student_dashboard = require('./routes/student/student_dashboard');
//Teacher
var teacher_dashboard = require('./routes/teacher/teacher_dashboard');
//Initializing App
var app = express();

//View engine
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));
app.use(cookieParser());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Express session
app.use(session({
  secret: 'secret',
  saveUnitialized: true,
  resave: true
}));

//Passport Initializing
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//Express validator
app.use(expressValidator({
  consoleFormatter: function(param, msg, value){
    var namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root;

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Connect Flash
app.use(flash());

//Global Variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();

});

//Get routes files
app.use('/', index);
app.use('/users', users);
//Under admin
app.use('/admin', admin_dashboard);
app.use('/admin', studentInfor);
app.use('/admin', teacherInfor);

//Under Student
app.use('/student', student_dashboard);
//Under teacher
app.use('/teacher', teacher_dashboard);

//Set port and Start App
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('Server started on port '+app.get('port'));
});
