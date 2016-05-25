var graphQl = require("graphql")

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

const commentType = require("./type")

const mutationArgs = {
	_id: {
		type: graphQl.GraphQLID
	},
	blog_id: {
		name: 'title',
		type: graphQl.GraphQLString
	},
	content: {
		name: 'title',
		type: graphQl.GraphQLString
	},
	age: {
		name: 'content',
		type: graphQl.GraphQLString
	}
}

var mutationList = ["create","edit", "delete"]

var mutations = {}

mutationList.map(function(newMution) {
	mutations[newMution] = {
		args: mutationArgs,
		type: new graphQl.GraphQLList(commentType),
		resolve: function(root, args) {
			return new Promise((resolve, reject) => {
				client.act({
					role: 'comments',
					cmd: newMution,
					args: args
				}, function(err, result) {
					resolve(result)
				})
			})
		}

	}
})

module.exports = mutations
