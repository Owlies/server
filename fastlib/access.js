var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

/*
module.exports.saveBook = function (db, title, author, text, callback) {
    db.collection('text').save({
        title: title,
        author: author,
        text: text
    }, callback);
};
*/

module.exports.findItemInfoByTime = function (db, time, callback) {
    db.collection('iteminfo').findOne({
	mTime: parseInt(time)
    }, function(err, doc){
	if (doc != null)
	    callback(doc);
        else
	    callback(null);
    });
};

module.exports.findAllItems = function (db, callback) {
    var res = db.collection('iteminfo').find();
    res.each(function(err, doc) {
      if (doc != null) {
//         console.dir(doc);
	  callback(doc);
      } else {
          callback(null);
      }
   });
};

module.exports.findItemInfoByTimeCached = function (db, redis, time, callback) {
    var itemid=1;
    redis.get(time, function (err, reply) {
        if (err) 
	    callback(null);
        else if (reply) //ItemInfo exists in cache
            callback(JSON.parse(reply));
        else {
            db.collection('iteminfo').findOne({
                mTime: parseInt(time)
            }, function (err, doc) {
                if (err || !doc) 
		    callback(null);
                else {
                    redis.set(itemid, JSON.stringify(doc), function () {
                        callback(doc);
                    });
                }
            });
        }
    });
};


module.exports.updateItemInfoByTime = function (db, redis, time, newText, callback) {
    db.collection("iteminfo").findAndModify({
        mTime: parseInt(time)
    }, {
        $set: {
            text: newText
        }
    }, function (err, doc) {
        if (err) 
	    callback(err);
        else if (!doc) 
	     callback('Missing book');
        else {
            redis.set(title, JSON.stringify(doc), function (err) {
                if (err) 
		    callback(err);
                else 
		    callback(null);
            });
        }
    });
};


/*
module.exports.findBookByTitleCached = function (db, redis, title, callback) {
    redis.get(title, function (err, reply) {
        if (err) callback(null);
        else if (reply) //Book exists in cache
        callback(JSON.parse(reply));
        else {
            db.collection('text').findOne({
                title: title
            }, function (err, doc) {
                if (err || !doc) callback(null);
                else {
                    redis.set(title, JSON.stringify(doc), function () {
                        callback(doc);
                    });
                }
            });
        }
    });
};

*/
