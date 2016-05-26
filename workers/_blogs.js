var seneca = require('seneca')()
var debug = require("debug")('http')
var coMongo = require("./co-mongo")
const co = require("co")
var assert = require('assert');



seneca.client({
	host: "localhost",
	port: "4002",
	pin: "role:comments",
	sync: false
})



var url = 'mongodb://localhost:27017/myproject';


co(function* () {
	var db = yield coMongo.connectToDB(url)
	console.log("Connected to the db successfully Blog")

	seneca.add("role: 'blogs',cmd: 'ping'", function (args, callback) {
		callback(null, {
			loggedIn: "Blogs ping successfull and awesome"
		})
	})

	seneca.add("role: 'blogs',cmd: 'single'", function (msg, callback) {
		db.collection("document").findOne(msg.args, function (err, result) {

			//get all the comments that know this blog
			seneca.act({
				role: 'comments',
				cmd: 'all',
				args: {
					title: result.title
				}
			}, function (error, comments) {
				result.comments = comments.records
				callback(err, { records: result })

			})

		})
	})

	seneca.add("role: 'blogs',cmd: 'all'", function (msg, callback) {
		db.collection("document").find({}).toArray(function (err, result) {
			assert.ifError(err)
			callback(err, { records: result })
		})
	})

	seneca.add("role: 'blogs',cmd: 'create'", function (msg, callback) {
		db.collection("document").insertOne(msg.args, function (err, result) {
			console.log("created ")
			console.log(result.ops[0])
			callback(err, { records: result.ops[0] })
		})
	})

	seneca.add("role: 'blogs',cmd: 'delete'", function (msg, callback) {
		db.collection("document").deleteMany(msg.args, function (err, result) {
			console.log(result.result)
			callback(err, { records: result.result })
		})

	})

	//add a new blog
	seneca.add("role: 'blogs',cmd: 'edit'", function (msg, callback) {
		// console.log(msg.args)
		co(function* () {
			var edited = yield coMongo.editReord(db, "document", {
				_id: found[0]._id
			}, updateRecord)

			callback(null, [{
				_id: 1,
				title: msg.args.title,
				content: msg.args.content
			}])
		})
	})
})


seneca.listen({
	host: "localhost",
	port: "4001",
	pin: 'role:blogs'
})
