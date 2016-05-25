var graphQl = require("graphql")
const blogType = require("./type")


//contacts to the backend
var seneca = require('seneca')()
var client = seneca.client({
	host: "localhost",
	port: "4001"
})

client.act({
	role: 'blogs',
	cmd: 'ping'
}, function(err, result) {
	console.log(result.loggedIn)
})

module.exports = {
	blog: {
		type: blogType,
		resolve: function(root, args) {
			//will return the graph expressed in the type
			return new Promise((resolve, reject) => {
				client.act({
					role: 'blogs',
					cmd: 'single',
					id: args.id
				}, function(err, result) {
					resolve(result)
				})
			})
		}
	},
	blogs: {
		type: new graphQl.GraphQLList(blogType),
		resolve: function(root, args) {
			return new Promise((resolve, reject) => {
				client.act({
					role: 'blogs',
					cmd: 'all'
				}, function(err, result) {
					resolve(result)
				})
			})
		}
	}
}