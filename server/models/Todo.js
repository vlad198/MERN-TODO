const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    name : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('todo',todoSchema);