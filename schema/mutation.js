const graphql = require('graphql');
const axios = require('axios');

const dbUrl = "http://localhost:3000";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

  }
});

module.exports = mutation;