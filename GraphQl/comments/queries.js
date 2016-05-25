var graphQl = require("graphql")
const commentType = require("./type")


//contacts to the backend
var seneca = require('seneca')()
var client = seneca.client({
	host: "localhost",
	port: "4002"
})

client.act({
	role: 'comments',
	cmd: 'ping'
}, function(err, result) {
	console.log(result.loggedIn)
})

module.exports = {
	comment: {
		type: commentType,
		resolve: function(root, args) {
			return new Promise((resolve, reject) => {
				client.act({
					role: 'comments',
					cmd: 'single',
					id: args.id
				}, function(err, result) {
					resolve(result)
				})
			})
		}
	},
	comments: {
		type: new graphQl.GraphQLList(commentType),
		resolve: function(root, args) {
			return new Promise((resolve, reject) => {
				client.act({
					role: 'comments',
					cmd: 'all'
				}, function(err, result) {
					resolve(result)
				})
			})
		}
	}
}