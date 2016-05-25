var graphQl = require("graphql")

module.exports = new graphQl.GraphQLObjectType({
	name: 'blog',
	description: 'This entity stands for a single blog',
	fields: () => ({
		_id: {
			type: graphQl.GraphQLID
		},
		title: {
			type: new graphQl.GraphQLNonNull(graphQl.GraphQLString)
		},
		content: {
			type: graphQl.GraphQLString
		},
		comments: {
			type: new graphQl.GraphQLList(new graphQl.GraphQLObjectType({
				name: 'comments',
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
			}))
		}
	})
})