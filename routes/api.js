const express = require('express');
const database = require('../models/data-model');
const api = express.Router();

// Saving user input into database then redirecting to check page
api.post('/new', (req, res) => {
    database.create(req.body).then(() => {
        res.redirect('/check')
        res.status(200);
    });
});

// Updating to database by id using new user entry then redirecting to update page
api.post('/update', (req, res) => {
    // id to be updated
    let toUpdate = req.body["id"]
    // Finding data by id and updating to new entry
    database.findByIdAndUpdate(toUpdate, req.body).then(() => {
        res.redirect('/update')
        res.status(200);
    });
});

// Delete from database and reload delete page
api.post('/delete', (req, res) => {
    // Extract ids
    let toDelete = req.body["delete"];
    // Delete many with given IDS
    database.deleteMany(
        {
            _id: {
                $in: toDelete
            }
        },
        function (err) {
            if (err) {
                res.send(err);
                res.status(500);
            } else {
                res.redirect('/delete');
                res.status(200);
            }
        }
    );
});

module.exports = api;