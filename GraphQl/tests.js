var graphQl = require("graphql")

var co = require("co")

var schema = require("./schema")

var blogs = 'query RootQueryType { blogs { name } }';
var blog = 'query RootQueryType { blog { name } }';
var newBlog = 'query RootQueryType { user { firstname surname } }';


function resolveQuery(query) {
	return graphQl.graphql(schema, query)
}

//long function implementation
function longWalk(thing, callback) {
	setTimeout(function() {
		callback(null, "thing")
	}, 200)
}

// thunk to wrap the long implementstion
function thunk(thing) {
	return function(callback) {
		console.log("trying")
		longWalk(thing,callback)
	}
}

co(function*() {
	
	var a = Promise.resolve(resolveQuery(blog))
	var c = Promise.resolve(resolveQuery(blogs))
	var d = yield thunk(c);
	var e = Promise.resolve(resolveQuery(newBlog))

	var results = yield [a, c, d, e]
	console.log(results)

}).catch(onerror)

function onerror(err) {
	// log any uncaught errors
	// co will not throw any errors you do not handle!!!
	// HANDLE ALL YOUR ERRORS!!!
	console.error(err.stack);
}