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

/**
 * common fields that are involved in mutations involving this object
 * @type {Object}
 */
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

/**
 * Hold the mutations as they are being created from the list up there
 * @type {Object}
 */
var mutations = {}

/**
 * span through the mutations and create the mutations propperties
 *
 * this was done so you dont have to create each mutations properties solo, 
 * and to avoid naming conflicts around as you map to the mutations seneca service
 * 
 * @param  {Object} newMution)    {	mutations[newMution] [description]
 * @param  {[type]} function(err, result)                 {					resolve(result)				})			})		}	}} [description]
 * @return {[type]}               [description]
 */
mutationList.map(function(newMution) {
	mutations[newMution] = {
		args: mutationArgs,
		type: new graphQl.GraphQLList(blogType),
		resolve: function(root, args) {
			return new Promise((resolve, reject) => {
				client.act({
					role: 'blogs',
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