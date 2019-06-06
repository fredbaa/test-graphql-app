const graphql = require('graphql');
const RootQuery = require("./query")
const mutation = require("./mutation")

const {
  GraphQLSchema,
} = graphql;

module.exports = new GraphQLSchema({
  query: RootQuery
});