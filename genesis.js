const koa = require('koa');
const co = require('co');
const app = module.exports = koa();
var router = require('koa-router')();

//allow bodies in posts
const body = require('koa-better-body')
	//allow routes
app.use(body()).use(router.routes()).use(router.allowedMethods());

var schema = require("./GraphQl/schema")

var graphQl = require("graphql")


// x-response-time

app.use(function*(next) {
	var start = new Date;
	yield next;
	var ms = new Date - start;
	this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function*(next) {
	var start = new Date;
	yield next;
	var ms = new Date - start;
	console.log('%s %s - %s', this.method, this.url, ms);
});

// response routes

router.get("/", function*(next) {
	this.body = 'Hello World';
})

router.post("/Graph", function*(next) {
	var results = yield Promise.resolve(graphQl.graphql(schema, this.body.query))
	console.log(results)
	this.body = results;
})

const port = 3002;
if (!module.parent) app.listen(port, function() {
	console.log("listen @ " + port)
});