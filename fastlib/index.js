var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');
var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    app = express(),
    mongoUrl = 'mongodb://localhost:29000/towergirl';
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var access = require('./access.js');

MongoClient.connect(mongoUrl, function (err, db) {
    if (err) throw 'Error connecting to database - ' + err;


    app.get('/iteminfo', function (req, res, next) {

	var ans = db.collection('iteminfo').find();
        ans.each(function(err, doc) {
	    if (err || doc != null) {
               res.status(200).send(doc);
            } else {
               res.status(500).send("Server error");
            }
            next();
	});

    });

    app.get('/iteminfo/:time', function (req, res) {
        if (!req.param('time')) 
	    res.status(400).send("Please send a proper id");
        else {
            access.findItemInfoByTime(db, req.param('time'), function (item) {
                if (!item) 
		    res.status(500).send("Server error");
                else 
		    res.status(200).send(item);
            });
        }
    });

    app.get('/iteminfocache/:time', function (req, res) {
        if (!req.param('time')) 
	    res.status(400).send("Please send a proper title");
        else {
            access.findItemInfoByTimeCached(db, redis, req.param('time'), function (item) {
                if (!item) 
		    res.status(500).send("Server error");
                else 
		    res.status(200).send(item);
            });
        }
    });

    app.listen(29370, function () {
        console.log('Listening on port 29370');
    });


});

/*
MongoClient.connect(mongoUrl, function (err, db) {
    if (err) throw 'Error connecting to database - ' + err;

    app.post('/book', function (req, res) {
        if (!req.body.title || !req.body.author) res.status(400).send("Please send a title and an author for the book");
        else if (!req.body.text) res.status(400).send("Please send some text for the book");
        else {
            access.saveBook(db, req.body.title, req.body.author, req.body.text, function (err) {
                if (err) res.status(500).send("Server error");
                else res.status(201).send("Saved");
            });
        }
    });

    app.get('/book/:title', function (req, res) {
        if (!req.param('title')) res.status(400).send("Please send a proper title");
        else {
	    access.findBookByTitleCached(db, redis, req.param('title'), function (book) {
            	if (!text) res.status(500).send("Server error");
            	else res.status(200).send(book);
            });
        }
    });

});
*/
