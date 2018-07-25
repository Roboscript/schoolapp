const mongoose = require('mongoose');
const SubjectsSchema = mongoose.Schema({
    name: String,
    category: String,
    description: String,
    subject_code: String,
    sylabus_material: String,
    created_at:Date,
    updated_at:Date,
});

const Subject =module.exports = mongoose.model('Subject', SubjectsSchema);

//Create new subject
module.exports.createSubject = function(newSubject, callback){
      newSubject.save(callback);
}
