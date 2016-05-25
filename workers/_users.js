var seneca = require('seneca')()

seneca.add({ role:'users', cmd:'ping' }, function (args, callback) {
  callback(null, { loggedIn:true })
})

seneca.listen({
	host:"localhost",
	port:"4000",
	pin: 'role:users'
})