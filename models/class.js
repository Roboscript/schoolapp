const mongoose = require('mongoose');


const classesSchema = mongoose.Schema({
    clss: String,
    classcode: String,
    description: String,
    teachers: String,
    created_at:Date

});

const Classes =module.exports = mongoose.model('Classes', classesSchema);

//Create new class
module.exports.createClass = function(newClass, callback){
      newClass.save(callback);
}
