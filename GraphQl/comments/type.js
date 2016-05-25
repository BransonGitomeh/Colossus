var graphQl = require("graphql")

module.exports = new graphQl.GraphQLObjectType({
	name: 'comment',
	description: 'This entity stands for a single comment',
	fields: () => ({
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
	})
})