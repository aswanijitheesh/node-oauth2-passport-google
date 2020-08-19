const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});
var collectionName = 'users'
module.exports = mongoose.model('UserInfo', UserSchema, collectionName);