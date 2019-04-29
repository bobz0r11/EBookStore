const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let userSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    address: {
        type: String
    },
    state: {
        type: String
    },
    zipCode: {
        type: Number
    },
    phoneNumber: {
        type: Number
    },
    accountStatus: {
        type: String
    }

}, {
        collection: 'users'
    });

module.exports = mongoose.model('userSchema', userSchema);