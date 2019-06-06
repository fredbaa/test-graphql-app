const graphql = require('graphql');
const axios = require('axios');
const dbUrl = "http://localhost:3000";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull
} = graphql;

const {
  UserType,
  CompanyType
} = require('./types');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve(parentValue, { firstName, age }) {
        return axios.post(`${dbUrl}/users/`, { firstName, age })
                    .then(res => res.data);
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return axios.delete(`${dbUrl}/users/${ id }`)
                    .then(res => res.data);
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parentValue, { id, firstName, age }) {
        return axios.patch(`${dbUrl}/users/${ id }`, { firstName, age })
                    .then(res => res.data);
      }
    }
  }
});

module.exports = mutation;