const graphql = require('graphql');
const axios = require('axios');
const dbUrl = "http://localhost:3000";

const {
  GraphQLObjectType,
  GraphQLID,
} = graphql;

const {
  UserType,
  CompanyType
} = require('./types');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return axios.get(`${dbUrl}/users/${args.id}`)
                    .then(resp => resp.data);
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return axios.get(`${dbUrl}/companies/${args.id}`)
                    .then(resp => resp.data);
      }
    }
  }
});

module.exports = RootQuery;