const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let User = new Schema({
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
    }

}, {
        collection: 'users'
    });

module.exports = mongoose.model('User', User);