import express from 'express';

var client = express.Router();

client.route('/')
    .get(function (req, res) {
        res.render('index.html');
    });

module.exports = client;