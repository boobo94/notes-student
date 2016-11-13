
var express = require('express');

var client = express.Router();

client.route('/')
    .get(function (req, res) {
        res.render('index.html',gigi);
    });

module.exports = client;