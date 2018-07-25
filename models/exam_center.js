const mongoose = require('mongoose');
const q = require('q');
const exam_centerSchema = mongoose.Schema({
    name: String,
    id: String,
    description: String,
    date_of_enrolment: String,
    fees_details: [],
    class: String,
    parent_information: []
}, { collection: 'exam_centers' });

const exam_center = mongoose.model('exam_center', exam_centerSchema);


function createexam_center(center) {
    subjects.create(center);
}

function findallcenters() {
    let deffered = q.defer();
    subjects.find((err, centers) => {
        if (err) {
            deffered.abort(err);
        } else {
            deffered.resolve(centers);
        }
    });
    return deffered.promise;

}

exam_center.createexam_center = createexam_center;
exam_center.findallcenters = findallcenters;

module.exports = students;