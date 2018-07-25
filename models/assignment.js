var mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    class:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    submitBy:{
        type: Date,
        required: true,
    },
    remarks:{
        type: String
    },
    file:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    }, 
    uploadedBy:{
        type:String,
        required:true
    }
});

var Assignment = module.exports = mongoose.model('Assignment', articleSchema);