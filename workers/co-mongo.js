var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	debug = require("debug")


module.exports.connectToDB = function connectToDB(url) {
	return function(callback) {
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			debug("Connected correctly to server")

			callback(null, db)
		});
	}
}

module.exports.insertRecords = function insertRecords(db, collection, records) {
	return function(callback) {
		// insert some documents 
		db.collection(collection).insertMany(records, function(err, result) {
			callback(err, result)
		})
	}
}

module.exports.findRecords = function findRecords(db, collection, records) {
	return function(callback) {
		// Find some documents 
		db.collection(collection).find(records).toArray(function(err, docs) {
			callback(err, docs);
		});
	}
}

module.exports.editReord = function editReord(db, collection, key, body) {
	return function(callback) {
		// Edit a single document
		db.collection(collection).updateOne(key, { $set: body }, function(err, docs) {
			callback(err, docs);
		});
	}
}

module.exports.deleteRecord = function deleteRecord(db, collection, _id) {
	return function(callback) {
		// Edit a single document
		db.collection(collection).deleteOne({_id: _id}, function(err, docs) {
			callback(err, docs);
		});
	}
}