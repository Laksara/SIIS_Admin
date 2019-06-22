const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Admin = new Schema({
    admin_email :{
        type : String
    },
    admin_name :{
        type: String
    },
    admin_position :{
        type: String
    },
    admin_deleted :{
        type : Boolean
    }
});

module.exports  = mongoose.model('Admin',Admin);