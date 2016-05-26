var seneca = require('seneca')()
var assert = require("assert")
var coMongo = require("./co-mongo")
const co = require("co")


var url = 'mongodb://localhost:27017/myproject';

co(function* () {
	var db = yield coMongo.connectToDB(url)
	console.log("Connected to the db successfully comments")


	//respond ping to check if service is up
	seneca.add({
		role: 'comments',
		cmd: 'ping'
	}, function (args, callback) {
		callback(null, {
			loggedIn: "comments ping successfull"
		})
	})

	//find all available comments
	seneca.add({
		role: 'comments',
		cmd: 'all'
	}, function (msg, callback) {
		console.log(msg.args)

		db.collection("comments").find(msg.args).toArray(function (err, result) {
			assert.ifError(err)
			console.log(result)
			callback(err, { records: result })
		})
	})

	//add a new comment
	seneca.add({
		role: 'comments',
		cmd: 'create'
	}, function (msg, callback) {
		console.log(msg.args)

		db.collection("comments").insertOne(msg.args, function (err, result) {
			console.log("created ")
			console.log(result.ops[0])
			callback(err, { records: result.ops[0] })
		})

		// callback(null, [{
		// 	_id: 1,
		// 	title: msg.args.title,
		// 	content: msg.args.content
		// }])
	})


	//add a new comment
	seneca.add({
		role: 'comments',
		cmd: 'delete'
	}, function (msg, callback) {
		// console.log(msg.args)
		callback(null, [{
			_id: 1,
			title: msg.args.title,
			content: msg.args.content
		}])
	})

	//add a new comment
	seneca.add({
		role: 'comments',
		cmd: 'edit'
	}, function (msg, callback) {
		// console.log(msg.args)
		callback(null, [{
			_id: 1,
			title: msg.args.title,
			content: msg.args.content
		}])
	})

	//find a single comment
	seneca.add({
		role: 'comments',
		cmd: 'single'
	}, function (args, callback) {
		console.log(args)
		callback(null, {
			_id: 1,
			title: "caroline"
		})
	})

	seneca.listen({
		host: "localhost",
		port: "4002",
		pin: 'role:comments'
	})

})