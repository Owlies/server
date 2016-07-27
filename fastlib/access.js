var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

module.exports.saveItemInfo = function (db, mid, mtime, mfloat, callback) {
    db.collection('iteminfo').save({
        mId: parseInt(mid),
        mTime: parseInt(mtime),
        mFloat: parseFloat(mfloat)
    }, callback);
};

module.exports.saveItemInfoCached = function (db, redis, mid, callback) {
    var itemid="itemid_"+mid;
    redis.get(parseInt(mid), function (err, reply) {
        if (err)
            callback(null);
        else if (reply) //ItemInfo exists in cache
            callback(JSON.parse(reply));
        else {
            db.collection('iteminfo').findOne({
                mId: parseInt(mid)
            }, function (err, doc) {
                if (err || !doc){
                    callback(null);
                }else {
                    redis.set(itemid, JSON.stringify(doc), function () {
                        callback(doc);
                    });
                }
            });
        }
    });
};

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
	  callback(doc);
      } else {
          callback(null);
      }
   });
};

module.exports.findItemInfoByTimeCached = function (db, redis, time, callback) {
    var itemid='itemid_1';
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


