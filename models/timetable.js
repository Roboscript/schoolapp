const mongoose = require('mongoose');


const TimetableSchema = mongoose.Schema({
    clss: String,
    classcode: String,
    description: String,
    teachers: String,
    created_at:Date

});

const Timetable =module.exports = mongoose.model('Timetable', TimetableSchema);

//Create new class
module.exports.createClass = function(newClass, callback){
      newClass.save(callback);
}
