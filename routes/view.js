const express = require('express');
const database = require('../models/data-model');
const router = express.Router();

/* Global Const */
const locale = "en-IE";
const localeDate = {day: "numeric", month: "short", year: "numeric"};

// Home page
router.get('/', function (req, res) {
    res.render('index.ejs', {
        title: 'Phone Daily Usage'
    });
});

// New page
router.get('/new', function (req, res) {
    res.render('new-page.ejs', {
        title: 'New Daily Usage'
    });
});

// Check page
router.get('/check', (req, res) => {
    database.find((err, docs) => {
        if (err) {
            console.log('Failed to load check page: ' + err);
        } else {
            res.render('check-page', {
                tableType: "check",
                usageList: docs,
                title: 'Data Daily Usage',
                locale: locale,
                localeDate: localeDate
            });
        }
    });
});

// Search check page
router.post('/search-check', (req, res) => {
    // Getting name from input
    let searchName = req.body["search-name"]
    // Finding name in database
    database.find({name: searchName}, function (err, data) {
        if (err) {
            console.log('Failed to load search page ' + err)
        } else {
            res.render('search-page', {
                tableType: "check",
                usageList: data,
                title: 'Search by name',
                locale: locale,
                localeDate: localeDate
            });
        }
    });
});

// Search delete page
router.post('/search-update', (req, res) => {
    // Getting name from input
    let searchName = req.body["search-name"]
    // Finding name in database
    database.find({name: searchName}, function (err, data) {
        if (err) {
            console.log('Failed to load search page ' + err)
        } else {
            res.render('search-page', {
                tableType: "update",
                usageList: data,
                title: 'Search by name',
                locale: locale,
                localeDate: localeDate
            });
        }
    });
});

// Search delete page
router.post('/search-delete', (req, res) => {
    // Getting name from input
    let searchName = req.body["search-name"]
    // Finding name in database
    database.find({name: searchName}, function (err, data) {
        if (err) {
            console.log('Failed to load search page ' + err)
        } else {
            res.render('search-page', {
                tableType: "delete",
                usageList: data,
                title: 'Search by name',
                locale: locale,
                localeDate: localeDate
            });
        }
    });
});

// Update page
router.get('/update', (req, res) => {
    database.find((err, docs) => {
        if (err) {
            console.log('Failed to load update page: ' + err);
        } else {
            res.render('update-page', {
                tableType: "update",
                usageList: docs,
                title: 'Update Daily Usage',
                locale: locale,
                localeDate: localeDate
            });
        }
    });
});

// Update-form page
router.post('/update-form', (req, res) => {
    // Extract id to be updated
    let toUpdate = req.body["update"];
    // Finding data to be updated
    database.findById(toUpdate, function (err, data) {
        if (err) {
            console.log('Failed to load update form: ' + err);
        }
        // Render page to update data
        res.render('update-form-page', {
            usageList: data,
            title: 'Update Form Page',
        });
    });
});

// Delete page
router.get('/delete', (req, res) => {
    database.find((err, docs) => {
        if (err) {
            console.log('Failed to load delete page: ' + err);
        } else {
            res.render('delete-page', {
                tableType: "delete",
                usageList: docs,
                title: 'Delete Daily Usage',
                locale: locale,
                localeDate: localeDate
            });
        }
    });
});

// About page
router.get('/about', function (req, res) {
    res.render('about-page.ejs', {
        title: 'About Page'
    });
});

// Help page
router.get('/help', function (req, res) {
    res.render('help-page.ejs', {
        title: 'Help Page'
    });
});

module.exports = router;