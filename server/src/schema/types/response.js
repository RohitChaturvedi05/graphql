import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql/type'

export default new GraphQLObjectType({
    name: 'RESPONSE',
    fields: () => ({
        count: {
            type: GraphQLInt,
        },
        id: {
            type: GraphQLString,
        },
        message: {
            type: GraphQLString,
        },
    }),
})
