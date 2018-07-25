const mongoose = require('mongoose');


const announcementSchema = mongoose.Schema({
    type: String,
    to: String,
    creator: String,
    description: String,
    subject: String,
    created_at : Date

});

const Announcements =module.exports = mongoose.model('Announcements', announcementSchema);

//Create new class
module.exports.createAnnouncements = function(newAnnouncement, callback){
      newAnnouncement.save(callback);
}
