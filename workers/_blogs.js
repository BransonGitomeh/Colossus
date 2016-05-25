var seneca = require('seneca')()

//respond ping to check if service is up
seneca.add({
	role: 'blogs',
	cmd: 'ping'
}, function(args, callback) {
	callback(null, {
		loggedIn: "Blogs ping successfull"
	})
})

//find all available blogs
seneca.add({
	role: 'blogs',
	cmd: 'all'
}, function(msg, callback) {
	callback(null, [{
		_id: 1,
		title: "blog1",
		content: "content 1",
		comments: [{
			id: "1",
			content: "this is a whack blog man, shut it down",
			age: "2 days ago"
		}]
	}, {
		_id: 2,
		title: "caroline",
		content: "content 2",
		comments: [{
			id: "1",
			content: "this is a whack blog man, shut it down",
			age: "2 days ago"
		}]
	}])
})

//add a new blog
seneca.add({
	role: 'blogs',
	cmd: 'create'
}, function(msg, callback) {
	// console.log(msg.args)
	callback(null, [{
		_id: 1,
		title: msg.args.title,
		content: msg.args.content
	}])
})


//add a new blog
seneca.add({
	role: 'blogs',
	cmd: 'delete'
}, function(msg, callback) {
	// console.log(msg.args)
	callback(null, [{
		_id: 1,
		title: msg.args.title,
		content: msg.args.content
	}])
})

//add a new blog
seneca.add({
	role: 'blogs',
	cmd: 'edit'
}, function(msg, callback) {
	// console.log(msg.args)
	callback(null, [{
		_id: 1,
		title: msg.args.title,
		content: msg.args.content
	}])
})

//find a single blog
seneca.add({
	role: 'blogs',
	cmd: 'single'
}, function(args, callback) {
	// console.log(args)
	callback(null, {
		_id: 1,
		title: "caroline",
		comments: [{
			id: "1",
			content: "this is a whack blog man, shut it down",
			age: "2 days ago"
		}]
	})
})

seneca.listen({
	host: "localhost",
	port: "4001",
	pin: 'role:blogs'
})

const co = require("co")

var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var url = 'mongodb://localhost:27017/myproject';

function connectToDB() {
	return function(callback) {
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");

			callback(null, db)
		});
	}
}

function insertRecords(db, collection, records) {
	return function(callback) {
		// insert some documents 
		db.collection(collection).insertMany(records, function(err, result) {
			callback(err, result)
		})
	}
}

function findRecords(db, collection, records) {
	return function(callback) {
		// Find some documents 
		db.collection(collection).find(records).toArray(function(err, docs) {
			callback(err, docs);
		});
	}
}

function editReord(db, collection, _id, body) {
	return function(callback) {
		// Edit a single document
		db.collection(collection).updateOne({_id: _id}, { $set: body }, function(err, docs) {
			callback(err, docs);
		});
	}
}

function deleteRecord(db, collection, _id) {
	return function(callback) {
		// Edit a single document
		db.collection(collection).deleteOne({_id: _id}, function(err, docs) {
			callback(err, docs);
		});
	}
}

co(function*() {
	var db = yield connectToDB()

	var records = [{
		name: "Mark",
		age: "20",
		home: "Dubai"
	}, {
		name: "Romney",
		age: "21",
		home: "Istanbul"
	}]

	var number = Math.random()

	var inserted = yield insertRecords(db, "document1" + number, records)
	console.log(inserted.insertedIds)

	var found = yield findRecords(db, "document1" + number, {})
	console.log(found)

	// Update a record
	var updateRecord = {
		name:"Branson"
	}

	console.log("search for " + found[0]._id)
	var edited = yield editReord(db, "document1" + number, found[0]._id, updateRecord)
	
	var found = yield findRecords(db, "document1" + number, {})
	console.log(found)

	// Delete a record
	console.log("Delete " + found[0]._id)
	var edited = yield deleteRecord(db, "document1" + number, found[0]._id)
	
	var found = yield findRecords(db, "document1" + number, {})
	console.log(found)
})