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

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () =>  ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(`${dbUrl}/companies/${parentValue.id}/users`)
                    .then(res => res.data)
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        // parentValue is the user value data (direct parent of this resolve)
        return axios.get(`${dbUrl}/companies/${parentValue.companyId}`)
                    .then(res => res.data) // needs this because of axios returns a 'data' column
      }
    }
  })
});

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