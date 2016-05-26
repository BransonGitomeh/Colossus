var graphQl = require("graphql")

module.exports = new graphQl.GraphQLSchema({
	query: new graphQl.GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			//blogs
			blog: require("./blogs/queries").blog,
			blogs: require("./blogs/queries").blogs,

			//comments
			comment: require("./comments/queries").comment,
			comments: require("./comments/queries").comments,

			//users
			user: require("./user").user,
		}
	}),
	mutation: new graphQl.GraphQLObjectType({
		name: 'RootMutationType',
		fields: {
			//blogs
			newBlog: require("./blogs/mutations").create,
			editBlog: require("./blogs/mutations").edit,
			deleteBlog: require("./blogs/mutations").delete,
			commentBlog: require("./comments/mutations").create

		}
	})
});