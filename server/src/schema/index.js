import { GraphQLSchema } from 'graphql/type'
import mutation from './mutations'
import query from './queries'

export default new GraphQLSchema({
    mutation,
    query,
})
