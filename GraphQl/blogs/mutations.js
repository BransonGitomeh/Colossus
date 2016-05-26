var graphQl = require("graphql")

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

const blogType = require("./type")

const mutationList = ["create", "edit", "delete", "addComment"]

const mutationArgs = {
	_id: {
		type: graphQl.GraphQLID
	},
	title: {
		type: new graphQl.GraphQLNonNull(graphQl.GraphQLString)
	},
	content: {
		type: graphQl.GraphQLString
	},
}

var mutations = {}

mutationList.map(function(newMution) {
	mutations[newMution] = {
		args: mutationArgs,
		type: blogType,
		resolve: function(root, args) {
			return new Promise((resolve, reject) => {
				client.act({
					role: 'blogs',
					cmd: newMution,
					args: args
				}, function(err, result) {
					resolve(result.records)
				})
			})
		}

	}
})

module.exports = mutations
