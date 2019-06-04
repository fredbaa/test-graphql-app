const graphql = require('graphql');
const axios = require('axios');

const dbUrl = "http://localhost:3000";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`${dbUrl}/users/${args.id}`)
                    .then(resp => resp.data); // needs this because of axios returns a 'data' column
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});