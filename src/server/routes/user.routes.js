const express = require('express');
const app = express();
const userRoutes = express.Router();

// Require Business model in our routes module
let User = require('../model/User');

// Defined store route
userRoutes.route('/adduser').post((req, res) => {
    let user = new User(req.body);
    console.log(req.body);
    user.save()
        .then(user => {
            res.status(200).json({ 'user': 'user added successfully: ' + user });
        })
        .catch(err => {
            res.status(400).send("unable to save user to database");
        });
});

module.exports = userRoutes;