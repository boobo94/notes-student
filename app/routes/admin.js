
var express = require('express');

var admin = express.Router();

admin.route('/')
    .get(function (req, res) {
        res.send("Sunt pe admin /");
    });

admin.route('/add-student')
    .get(function (req, res) {
        res.send("Sunt pe admin /addStudent");
    });

admin.route('/edit-student')
    .get(function (req, res) {
        res.send("Sunt pe admin /addStudent");
    });

admin.route('/delete-student')
    .get(function (req, res) {
        res.send("Sunt pe admin /addStudent");
    });

module.exports = admin;