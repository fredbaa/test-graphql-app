const graphql = require('graphql');
const axios = require('axios');
const dbUrl = "http://localhost:3000";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  // fields wrapped in the fat arrow notation is used here
  // because of closure scopes in javascript. This way, CompanyType and UserType
  // are defined, but only gets executed when used.
  // This fixes circular reference between UserType and CompanyType definition
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

module.exports = { UserType, CompanyType };