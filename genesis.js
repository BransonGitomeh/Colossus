var koa = require('koa');
var app = module.exports = koa();

var graphQl = require("graphql")

// console.log(graphQl)

var schema = new graphQl.GraphQLSchema({
	//a single query
	query: new graphQl.GraphQLObjectType({
			name: 'RootQueryType',
			fields: {
				name: {
					type: graphQl.GraphQLString,
					resolve() {
						return 'world';
					}
				},

				//arrange all the types here that have stuff
				user: {
					type: new graphQl.GraphQLObjectType({
						name: 'User',
						description: 'A user',
						fields: () => ({
							_id: {
								type: new graphQl.GraphQLNonNull(graphQl.GraphQLID)
							},
							name: {
								type: graphQl.GraphQLString
							},
							surname: {
								type: graphQl.GraphQLString
							},
							age: {
								type: graphQl.GraphQLInt
							},
							homes: {
								type: new graphQl.GraphQLList(new graphQl.GraphQLObjectType({
									name: 'Home',
									description: 'A profile of a user',
									fields: () => ({
										_id: {
											type: new graphQl.GraphQLNonNull(graphQl.GraphQLID)
										},
										location: {
											type: graphQl.GraphQLString
										}
									})
								}))
							}
						})
					}),
					args: {
						id: {
							type: graphQl.GraphQLID
						}
					},
					resolve() {
						return {
							_id: 34,
							name: "branson",
							surname: "branson",
							homes: [{
								_id: 1,
								location: "nyeri"
							}, {
								_id: 2,
								location: "ruiru"
							}]
						}
					}
				},

				//next queryable thing
				hobby: {
					type: new graphQl.GraphQLObjectType({
						name: 'Hobby',
						description: 'A profile of a user',
						fields: () => ({
							_id: {
								type: new graphQl.GraphQLNonNull(graphQl.GraphQLID)
							},
							home: {
								type: graphQl.GraphQLString
							}
						})
					}),
					args: {
						id: {
							type: graphQl.GraphQLID
						}
					},
					resolve() {
						return {
							home: "nyeri",
						}
					}
				}
			}
		})
		//other queries come after here
});

// console.log(schema)

var query = '{ user { name, homes { location } } }';

graphQl.graphql(schema, query).then(result => {

	// Prints
	// {
	//   data: { hello: "world" }
	// }
	console.log("Query: " + query)
	console.log("Results: " + JSON.stringify(result.data));
});

app.use(function*() {
	this.body = 'Hello World';
});

if (!module.parent) app.listen(3000, function() {
	console.log("listen @ 3000")
});