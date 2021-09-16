import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql/type';

export default new GraphQLObjectType({
  name: 'USER',
  fields: () => ({
    _id: {
      type: GraphQLString
    },
    firstname: {
      type: GraphQLString
    },
    lastname: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    }
  })
});
