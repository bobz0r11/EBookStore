const express = require('express');
const app = express();
const userRoutes = express.Router();

// Require Business model in our routes module
let userSchema = require('../model/User');

// Defined store route
userRoutes.route('/adduser').post((req, res) => {
    let user = new userSchema(req.body);
    user.save()
        .then(user => {
            res.status(200).json({ 'user': 'user added successfully' });
        }).catch(err => {
            res.status(400).send("unable to save user to database");
        });
});

userRoutes.route('/:username').get((req, res) => {
    let username = req.url.replace("/", "");
    userSchema.find({ 'email': username })
        .then(data => {
            return res.json(data);
        }).catch(err => {
            return res.json(err);
        })
});

module.exports = userRoutes;