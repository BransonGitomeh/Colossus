var graphQl = require("graphql")

//the main types
const list = graphQl.GraphQLList;
const object = graphQl.GraphQLObjectType;

//types
const string = graphQl.GraphQLString;
const nonNull = graphQl.GraphQLNonNull
const id = graphQl.GraphQLID
const int = graphQl.GraphQLInt


/**
 * to query for a single user
 */

const userType = new object({
	name: 'user',
	description: 'This is a user',
	fields: () => ({
		_id: {
			type: new nonNull(id)
		},
		firstname: {
			type: string
		},
		surname: {
			type: string
		}
	})
})

module.exports.userType = userType

module.exports.user = {
	type: userType,
	resolve: function(root, args) {
		return {
			_id: 34,
			firstname: "Branson Gitomeh Kuria"
		}
	}
}


var seneca = require('seneca')()
var client = seneca.client({
	host:"localhost",
	port:"4000"
})

client.act({ role:'users', cmd:'ping' }, function (err, result) {
  console.log(result.loggedIn)
})