var seneca = require('seneca')()

//respond ping to check if service is up
seneca.add({
	role: 'comments',
	cmd: 'ping'
}, function(args, callback) {
	callback(null, {
		loggedIn: "comments ping successfull"
	})
})

//find all available comments
seneca.add({
	role: 'comments',
	cmd: 'all'
}, function(msg, callback) {
	// console.log(msg)
	callback(null, [{
		_id: 1,
		title: "comment1",
		content:"content 1"
	}, {
		_id: 2,
		title: "caroline",
		content:"content 2"
	}])
})

//add a new comment
seneca.add({
	role: 'comments',
	cmd: 'create'
}, function(msg, callback) {
	// console.log(msg.args)
	callback(null, [{
		_id:1,
		title: msg.args.title,
		content:msg.args.content
	}])
})


//add a new comment
seneca.add({
	role: 'comments',
	cmd: 'delete'
}, function(msg, callback) {
	// console.log(msg.args)
	callback(null, [{
		_id:1,
		title: msg.args.title,
		content:msg.args.content
	}])
})

//add a new comment
seneca.add({
	role: 'comments',
	cmd: 'edit'
}, function(msg, callback) {
	// console.log(msg.args)
	callback(null, [{
		_id:1,
		title: msg.args.title,
		content:msg.args.content
	}])
})

//find a single comment
seneca.add({
	role: 'comments',
	cmd: 'single'
}, function(args, callback) {
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