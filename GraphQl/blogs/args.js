var graphQl = require("graphql")

module.exports = {
    _id: {
        type: graphQl.GraphQLID
    },
    title: {
        type: graphQl.GraphQLString
    },
    content: {
        type: graphQl.GraphQLString
    },
}